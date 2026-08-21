import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import pianoPhoto from "../../assets/final-portfolio/about/piano.png";
import workshopPhoto from "../../assets/final-portfolio/about/workshop.png";
import designProjectPhoto from "../../assets/final-portfolio/about/design-project.png";
import resetIcon from "../../assets/final-portfolio/ui/reset.svg";

type MediaKey = "piano" | "workshop" | "design-project";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  followUps?: string[];
  mediaKey?: MediaKey | null;
};

type StoredConversation = {
  conversationId: string;
  messages: ChatMessage[];
};

type DareLlmResponse = {
  answer: string;
  followUps: string[];
  mediaKey: MediaKey | null;
  conversationId: string;
};

const storageKey = "dare-llm-session-v1";
const emptyHeadingStorageKey = "dare-llm-empty-heading-v1";
const promptSetStorageKey = "dare-llm-prompt-set-v1";
const emptyStateHeadings = [
  "Hey, ask away.",
  "Ask me anything.",
  "Curious about my work?",
  "What would you like to know?",
];
const promptPool = [
  "Tell me about yourself",
  "What's your background in design?",
  "What are you looking for in opportunities?",
  "What skills do you bring as a designer with psychology training?",
  "What projects have you worked on?",
  "What makes you unique?",
];

const media: Record<MediaKey, { src: string; alt: string; caption: string }> = {
  piano: { src: pianoPhoto, alt: "Dare playing the piano", caption: "PLAYING THE PIANO" },
  workshop: { src: workshopPhoto, alt: "Dare leading a design workshop", caption: "LEADING A DESIGN WORKSHOP" },
  "design-project": { src: designProjectPhoto, alt: "Dare discussing a design project", caption: "DISCUSSING A DESIGN PROJECT" },
};

const approvedEmail = "dareabinde04@gmail.com";

function renderAnswer(value: string) {
  return value.split(new RegExp(`(${approvedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")).map((part, index) =>
    part.toLowerCase() === approvedEmail
      ? <a href={`mailto:${approvedEmail}`} key={`${part}-${index}`}>{part}</a>
      : part,
  );
}

function makeId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadConversation(): StoredConversation {
  try {
    const value = window.sessionStorage.getItem(storageKey);
    if (!value) throw new Error("No stored conversation");
    const parsed = JSON.parse(value) as StoredConversation;
    if (!parsed.conversationId || !Array.isArray(parsed.messages)) throw new Error("Invalid stored conversation");
    return parsed;
  } catch {
    return { conversationId: makeId(), messages: [] };
  }
}

function nextEmptyStateHeading() {
  try {
    const previousIndex = Number(window.localStorage.getItem(emptyHeadingStorageKey));
    const nextIndex = Number.isInteger(previousIndex)
      ? (previousIndex + 1) % emptyStateHeadings.length
      : 0;
    window.localStorage.setItem(emptyHeadingStorageKey, String(nextIndex));
    return emptyStateHeadings[nextIndex];
  } catch {
    return emptyStateHeadings[Math.floor(Math.random() * emptyStateHeadings.length)];
  }
}

function nextInitialPrompts() {
  try {
    const previousSet = Number(window.localStorage.getItem(promptSetStorageKey));
    const nextSet = Number.isInteger(previousSet) ? (previousSet + 1) % 2 : 0;
    window.localStorage.setItem(promptSetStorageKey, String(nextSet));
    return promptPool.slice(nextSet * 3, nextSet * 3 + 3);
  } catch {
    const start = Math.random() < 0.5 ? 0 : 3;
    return promptPool.slice(start, start + 3);
  }
}

function errorMessage(status: number) {
  if (status === 429) return "I've received a few questions at once. Please try again shortly.";
  if (status === 402) return "I'm temporarily unavailable. Please try again later.";
  if (status === 408 || status === 504) return "That took longer than expected. Please try the question again.";
  return "I couldn't answer that just now. Please try again.";
}

export function DareLlm({ isOpen, path, drawerWidth, onClose }: { isOpen: boolean; path: string; drawerWidth: number; onClose: () => void }) {
  const initialConversation = useMemo(loadConversation, []);
  const emptyStateHeading = useMemo(nextEmptyStateHeading, []);
  const initialPrompts = useMemo(nextInitialPrompts, []);
  const [conversationId, setConversationId] = useState(initialConversation.conversationId);
  const [messages, setMessages] = useState<ChatMessage[]>(initialConversation.messages);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [requestError, setRequestError] = useState("");
  const dialogRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    window.sessionStorage.setItem(storageKey, JSON.stringify({ conversationId, messages }));
  }, [conversationId, messages]);

  useEffect(() => {
    if (!isOpen) {
      setInfoOpen(false);
      return;
    }
    const timer = window.setTimeout(() => inputRef.current?.focus(), 420);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [isOpen, isLoading, messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        if (infoOpen) setInfoOpen(false);
        else onClose();
        return;
      }

      if (window.innerWidth > 575 || event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [infoOpen, isOpen, onClose]);

  const submitQuestion = useCallback(async (question: string, baseMessages = messages) => {
    const cleanQuestion = question.trim().slice(0, 500);
    if (!cleanQuestion || isLoading) return;

    const userMessage: ChatMessage = { id: makeId(), role: "user", content: cleanQuestion };
    const nextMessages = [...baseMessages, userMessage];
    setMessages(nextMessages);
    setDraft("");
    setRequestError("");
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 55000);

    try {
      const response = await fetch("/api/dare-llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          conversationId,
          path,
          messages: nextMessages.map(({ role, content }) => ({ role, content })).slice(-12),
          usedMediaKeys: [...new Set(nextMessages.flatMap((message) => message.mediaKey ? [message.mediaKey] : []))],
        }),
      });

      if (!response.ok) throw Object.assign(new Error("Request failed"), { status: response.status });
      const data = await response.json() as DareLlmResponse;
      const assistantMessage: ChatMessage = {
        id: makeId(),
        role: "assistant",
        content: data.answer,
        followUps: data.followUps,
        mediaKey: data.mediaKey,
      };
      setConversationId(data.conversationId || conversationId);
      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      if (controller.signal.aborted && abortRef.current !== controller) return;
      const status = typeof error === "object" && error && "status" in error ? Number(error.status) : 408;
      setRequestError(errorMessage(status));
    } finally {
      window.clearTimeout(timeout);
      if (abortRef.current === controller) abortRef.current = null;
      setIsLoading(false);
    }
  }, [conversationId, isLoading, messages, path]);

  function submit(event: FormEvent) {
    event.preventDefault();
    void submitQuestion(draft);
  }

  function resetConversation() {
    const activeRequest = abortRef.current;
    abortRef.current = null;
    activeRequest?.abort();
    setConversationId(makeId());
    setMessages([]);
    setDraft("");
    setRequestError("");
    setIsLoading(false);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function inputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") onClose();
  }

  return (
    <>
    <div className={`dare-llm-scrim${isOpen ? " is-open" : ""}`} aria-hidden="true" />
    <aside
      ref={dialogRef}
      className={`dare-llm${isOpen ? " is-open" : ""}`}
      style={{ width: drawerWidth }}
      data-lenis-prevent
      role="dialog"
      aria-modal={typeof window !== "undefined" && window.innerWidth <= 575 ? "true" : "false"}
      aria-labelledby="dare-llm-title"
      aria-hidden={!isOpen}
    >
      <header className="dare-llm__header">
        <div className="dare-llm__title-wrap">
          <h2 id="dare-llm-title">DARE LLM</h2>
          <button className={`dare-llm__icon${infoOpen ? " is-active" : ""}`} type="button" aria-label="About DARE LLM" aria-expanded={infoOpen} onClick={() => setInfoOpen((value) => !value)}><span aria-hidden="true">i</span></button>
        </div>
        <div className="dare-llm__tools">
          <button className="dare-llm__icon dare-llm__reset" type="button" aria-label="Reset chat" onClick={resetConversation}><img src={resetIcon} alt="" aria-hidden="true" /></button>
          <button className="dare-llm__icon dare-llm__close" type="button" aria-label="Close DARE LLM" onClick={onClose}><span aria-hidden="true">×</span></button>
        </div>
        {infoOpen ? (
          <div className="dare-llm__info" role="status">
            <p>DARE LLM is an AI chatbot and may contain hallucinations. Responses are logged for research and development purposes.</p>
          </div>
        ) : null}
      </header>

      <div className="dare-llm__conversation" ref={scrollRef} aria-live="polite">
        {messages.length === 0 ? (
          <div className="dare-llm__empty">
            <div>
              <h3>{emptyStateHeading}</h3>
              <div className="dare-llm__suggestions">
                {initialPrompts.map((prompt) => <button type="button" key={prompt} onClick={() => void submitQuestion(prompt)}><span aria-hidden="true">↳</span>{prompt}</button>)}
              </div>
            </div>
          </div>
        ) : (
          <div className="dare-llm__messages">
            {messages.map((message) => {
              const selectedMedia = message.mediaKey ? media[message.mediaKey] : null;
              return (
                <article className={`dare-llm__message dare-llm__message--${message.role}`} key={message.id}>
                  <p>{message.role === "assistant" ? renderAnswer(message.content) : message.content}</p>
                  {selectedMedia ? <figure><img src={selectedMedia.src} alt={selectedMedia.alt} /><figcaption>{selectedMedia.caption}</figcaption></figure> : null}
                  {message.followUps?.length ? (
                    <div className="dare-llm__follow-ups" aria-label="Related questions">
                      {message.followUps.map((question) => <button type="button" key={question} disabled={isLoading} onClick={() => void submitQuestion(question)}><span aria-hidden="true">↳</span>{question}</button>)}
                    </div>
                  ) : null}
                </article>
              );
            })}
            {isLoading ? (
              <div className="dare-llm__thinking" role="status" aria-live="polite">
                <span className="sr-only">DARE LLM is preparing a response.</span>
                <span className="dare-llm__loading-dots" aria-hidden="true"><i /><i /><i /></span>
              </div>
            ) : null}
            {requestError ? <div className="dare-llm__error" role="alert"><p>{requestError}</p><button type="button" onClick={() => {
              const lastQuestion = messages.at(-1)?.role === "user" ? messages.at(-1)?.content || "" : "";
              void submitQuestion(lastQuestion, lastQuestion ? messages.slice(0, -1) : messages);
            }}>Try again</button></div> : null}
          </div>
        )}
      </div>

      <form className="dare-llm__composer" onSubmit={submit}>
        <label className="sr-only" htmlFor="dare-llm-input">Ask about Dare</label>
        <input id="dare-llm-input" ref={inputRef} value={draft} maxLength={500} placeholder="Ask about Dare…" autoComplete="off" disabled={isLoading} onKeyDown={inputKeyDown} onChange={(event) => setDraft(event.target.value)} />
        <button type="submit" aria-label="Send message" disabled={!draft.trim() || isLoading}><span aria-hidden="true">↑</span></button>
        <i className={isLoading ? "is-busy" : ""} aria-hidden="true" />
      </form>
    </aside>
    </>
  );
}
