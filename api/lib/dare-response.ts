export type DareMediaKey = "piano" | "workshop" | "design-project";

export type DareResponse = {
  answer: string;
  followUps: [string, string, string];
  mediaKey: DareMediaKey | null;
};

const approvedMedia = new Set<DareMediaKey>(["piano", "workshop", "design-project"]);

export function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function uniqueQuestions(value: unknown): [string, string, string] | null {
  if (!Array.isArray(value) || value.length !== 3) return null;
  const questions = value.map((item) => typeof item === "string" ? item.trim() : "");
  if (questions.some((item) => item.length < 4 || item.length > 120)) return null;
  if (new Set(questions.map((item) => item.toLowerCase())).size !== 3) return null;
  return questions as [string, string, string];
}

export function parseDareResponse(value: unknown): DareResponse | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const answerValue = record.answer ?? record.response;
  const followUpsValue = record.followUps ?? record.followUpQuestions;
  const answer = typeof answerValue === "string" ? answerValue.trim() : "";
  const followUps = uniqueQuestions(followUpsValue);
  const mediaKey = record.mediaKey === null || record.mediaKey === undefined
    ? null
    : typeof record.mediaKey === "string" && approvedMedia.has(record.mediaKey as DareMediaKey)
      ? record.mediaKey as DareMediaKey
      : undefined;
  if (!answer || wordCount(answer) > 60 || !followUps || mediaKey === undefined) return null;
  return { answer, followUps, mediaKey };
}

export function extractJson(value: string) {
  const cleaned = value.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end <= start) throw new Error("Model returned invalid JSON");
    return JSON.parse(cleaned.slice(start, end + 1));
  }
}
