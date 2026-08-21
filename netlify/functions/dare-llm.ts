import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { SYSTEM_PROMPT } from "../lib/dare-knowledge";
import { extractJson, parseDareResponse, wordCount, type DareResponse } from "../lib/dare-response";

type InputMessage = { role: "user" | "assistant"; content: string };

const primaryModel = process.env.OPENROUTER_PRIMARY_MODEL || "google/gemini-3.1-flash-lite";
const fallbackModel = process.env.OPENROUTER_FALLBACK_MODEL || "openai/gpt-5-mini";
const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["answer", "followUps", "mediaKey"],
  properties: {
    answer: { type: "string", description: "A direct answer of no more than 60 words, written in the language of the user's latest message." },
    followUps: { type: "array", minItems: 3, maxItems: 3, items: { type: "string" } },
    mediaKey: { type: ["string", "null"], enum: ["piano", "workshop", "design-project", null] },
  },
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function validationShape(value: unknown) {
  if (!value || typeof value !== "object") return { valueType: typeof value };
  const record = value as Record<string, unknown>;
  const answer = record.answer ?? record.response;
  const followUps = record.followUps ?? record.followUpQuestions;
  return {
    keys: Object.keys(record),
    answerType: typeof answer,
    answerWords: typeof answer === "string" ? wordCount(answer) : null,
    followUpCount: Array.isArray(followUps) ? followUps.length : null,
    mediaKey: record.mediaKey === null ? null : typeof record.mediaKey,
  };
}

function validConversationId(value: unknown) {
  return typeof value === "string" && /^[a-zA-Z0-9-]{8,80}$/.test(value);
}

function validPath(value: unknown) {
  return typeof value === "string" && value.startsWith("/") && value.length <= 120 ? value : "/";
}

function validMessages(value: unknown): InputMessage[] | null {
  if (!Array.isArray(value) || value.length < 1 || value.length > 12) return null;
  const messages: InputMessage[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const role = (item as Record<string, unknown>).role;
    const content = (item as Record<string, unknown>).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > 700) return null;
    messages.push({ role, content: trimmed });
  }
  if (messages.at(-1)?.role !== "user") return null;
  return messages;
}

const approvedMediaKeys = new Set(["piano", "workshop", "design-project"]);

function validUsedMediaKeys(value: unknown) {
  if (!Array.isArray(value) || value.length > approvedMediaKeys.size) return null;
  const keys = value.filter((item): item is string => typeof item === "string" && approvedMediaKeys.has(item));
  return keys.length === value.length ? [...new Set(keys)] : null;
}

function isEnglishStyleGreeting(value: string) {
  return /^(?:hi|hello|hey|hej)[\s!.,]*$/i.test(value);
}

function answerSuggestsAQuestion(value: string) {
  return /[?？؟]/u.test(value);
}

function mediaMatchesQuestion(mediaKey: DareResponse["mediaKey"], question: string) {
  if (!mediaKey) return true;
  const value = question.toLowerCase();
  if (mediaKey === "piano") return /(?:piano|keyboard|music|hobb|outside (?:design|work)|free time|personal interest|spare time)/i.test(value);
  if (mediaKey === "workshop") return /(?:workshop|facilitat|co[ -]?creation|ideation session)/i.test(value);
  return /(?:design process|design approach|approach to design|design project|product design|project(?:s)?|portfolio|case stud|collaborat)/i.test(value);
}

function isBehindScenesQuestion(question: string) {
  return /(?:dare llm|chatbot|language model|system prompt|prompt instructions?|api|architecture|knowledge (?:base|source)|logging implementation|stored transcripts?)/i.test(question);
}

function guardedResponse(messages: InputMessage[]): DareResponse | null {
  const latestQuestion = messages.at(-1)?.content || "";
  if (isEnglishStyleGreeting(latestQuestion)) {
    return {
      answer: "Hey! Would you like to know anything about me?",
      followUps: ["Tell me about yourself", "What projects have you worked on?", "What makes you unique?"],
      mediaKey: null,
    };
  }
  if (!isBehindScenesQuestion(latestQuestion)) return null;
  const response: DareResponse = {
    answer: "I keep DARE LLM focused on my work, experience, projects, and interests rather than its behind-the-scenes implementation.",
    followUps: ["How does Dare approach UX research?", "Which project best shows Dare's product thinking?", "What is Dare's educational background?"],
    mediaKey: null,
  };
  return response;
}

async function callOpenRouter(
  messages: InputMessage[],
  path: string,
  usedMediaKeys: string[],
  stricter = false,
  models = [primaryModel, fallbackModel],
): Promise<{ response: DareResponse; model: string }> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw Object.assign(new Error("Missing OpenRouter key"), { status: 503 });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 50000);
  try {
    const result = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.URL || "http://localhost:5173",
        "X-Title": "Dare Abinde Portfolio - DARE LLM",
      },
      body: JSON.stringify({
        models,
        messages: [
          { role: "system", content: `${SYSTEM_PROMPT}\nCurrent portfolio route: ${path}. Media keys already used in this conversation: ${usedMediaKeys.length ? usedMediaKeys.join(", ") : "none"}. Do not return any of those media keys again.${stricter ? " Previous output failed validation. Follow the schema exactly and keep the answer under 60 words." : ""}` },
          ...messages,
        ],
        response_format: { type: "json_schema", json_schema: { name: "dare_llm_response", strict: true, schema: responseSchema } },
        reasoning: { enabled: false },
        temperature: 0.35,
        max_tokens: 420,
        provider: { data_collection: "deny", allow_fallbacks: true },
      }),
    });

    if (!result.ok) {
      const body = await result.json().catch(() => null) as { error?: { message?: string } } | null;
      throw Object.assign(new Error(body?.error?.message || "OpenRouter request failed"), { status: result.status });
    }

    const body = await result.json() as { model?: string; choices?: Array<{ message?: { content?: string } }> };
    const content = body.choices?.[0]?.message?.content;
    if (!content) throw new Error("Model returned no answer");
    let response: DareResponse | null;
    let parsedValue: unknown;
    try {
      parsedValue = extractJson(content);
      response = parseDareResponse(parsedValue);
    } catch {
      response = null;
    }
    if (!response) {
      console.warn("DARE LLM invalid response shape", {
        model: body.model || primaryModel,
        ...validationShape(parsedValue),
      });
      throw Object.assign(new Error("Model response failed validation"), {
        validation: true,
        model: body.model || primaryModel,
      });
    }
    const latestQuestion = messages.at(-1)?.content || "";
    if (!isEnglishStyleGreeting(latestQuestion) && answerSuggestsAQuestion(response.answer)) {
      console.warn("DARE LLM answer included a lead-on question", { model: body.model || primaryModel });
      throw Object.assign(new Error("Model response failed validation"), {
        validation: true,
        model: body.model || primaryModel,
      });
    }
    if (response.mediaKey && usedMediaKeys.includes(response.mediaKey)) response = { ...response, mediaKey: null };
    if (response.mediaKey && !mediaMatchesQuestion(response.mediaKey, latestQuestion)) response = { ...response, mediaKey: null };
    return { response, model: body.model || primaryModel };
  } finally {
    clearTimeout(timeout);
  }
}

async function storeTranscript(conversationId: string, path: string, messages: InputMessage[], response: DareResponse, model: string) {
  try {
    const store = getStore("dare-llm-transcripts");
    const existing = await store.get(conversationId, { type: "json", consistency: "strong" }).catch(() => null) as { createdAt?: string; turns?: unknown[] } | null;
    const now = new Date().toISOString();
    const latestUser = messages.at(-1)?.content || "";
    await store.setJSON(conversationId, {
      conversationId,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      turns: [
        ...(Array.isArray(existing?.turns) ? existing.turns : []),
        { user: latestUser, assistant: response.answer, followUps: response.followUps, mediaKey: response.mediaKey, model, path },
      ].slice(-40),
    }, { metadata: { updatedAt: now } });
  } catch (error) {
    console.error("DARE LLM transcript storage failed", error);
  }
}

export default async (request: Request) => {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  if (!validConversationId(body.conversationId)) return json({ error: "Invalid conversation" }, 400);
  const messages = validMessages(body.messages);
  if (!messages) return json({ error: "Invalid messages" }, 400);
  const path = validPath(body.path);
  const usedMediaKeys = validUsedMediaKeys(body.usedMediaKeys);
  if (!usedMediaKeys) return json({ error: "Invalid media history" }, 400);

  try {
    const guarded = guardedResponse(messages);
    if (guarded) {
      await storeTranscript(body.conversationId as string, path, messages, guarded, "policy");
      return json({ ...guarded, conversationId: body.conversationId });
    }

    let result;
    try {
      result = await callOpenRouter(messages, path, usedMediaKeys);
    } catch (error) {
      if (!(typeof error === "object" && error && "validation" in error)) throw error;
      console.warn("DARE LLM validation retry", {
        model: "model" in error && typeof error.model === "string" ? error.model : primaryModel,
      });
      result = await callOpenRouter(messages, path, usedMediaKeys, true, [fallbackModel]);
    }
    const response = result.response;
    console.info("DARE LLM response model", { model: result.model });
    await storeTranscript(body.conversationId as string, path, messages, response, result.model);
    return json({ ...response, conversationId: body.conversationId });
  } catch (error) {
    const status = typeof error === "object" && error && "status" in error ? Number(error.status) : error instanceof DOMException && error.name === "AbortError" ? 504 : 503;
    const safeStatus = [400, 402, 408, 429, 502, 503, 504].includes(status) ? status : 503;
    console.error("DARE LLM request failed", {
      status,
      message: error instanceof Error ? error.message : "Unknown error",
      validation: typeof error === "object" && error !== null && "validation" in error,
    });
    return json({ error: safeStatus === 429 ? "Too many requests" : "DARE LLM is temporarily unavailable" }, safeStatus);
  }
};

export const config: Config = {
  path: "/api/dare-llm",
  rateLimit: { windowLimit: 8, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
