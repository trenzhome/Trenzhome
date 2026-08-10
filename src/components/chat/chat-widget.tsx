"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm the TrenzHome shopping assistant. Tell me what room you're furnishing, a material you love, or a budget — I'll point you to the right pieces.",
};

function renderContent(content: string) {
  const nodes: React.ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkPattern.exec(content))) {
    if (match.index > lastIndex) nodes.push(content.slice(lastIndex, match.index));
    nodes.push(
      <Link
        key={key++}
        href={match[2]}
        className="font-medium text-flare underline underline-offset-2 hover:text-ink transition-colors"
      >
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) nodes.push(content.slice(lastIndex));
  return nodes;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isStreaming) return;

    const history = [...messages, { role: "user" as const, content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.filter((m) => m.content) }),
      });

      if (!res.ok || !res.body) {
        const message = await res.text().catch(() => "");
        throw new Error(message || "Request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
      }
    } catch (err) {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong reaching the assistant. Please try again in a moment.",
        };
        return next;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(600px,calc(100vh-140px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl bg-paper shadow-luxury ring-1 ring-ink/10"
          >
            <div className="flex items-center gap-2.5 border-b border-ink/10 bg-ink px-5 py-4 text-paper">
              <Sparkles size={18} strokeWidth={1.75} className="text-flare" />
              <div className="flex-1">
                <p className="font-display text-lg leading-tight">TrenzHome Assistant</p>
                <p className="text-xs text-paper/60">Usually replies in seconds</p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="text-paper/70 hover:text-flare transition-colors"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-ink text-paper rounded-br-sm"
                        : "bg-fog text-ink rounded-bl-sm"
                    }`}
                  >
                    {m.content ? (
                      renderContent(m.content)
                    ) : (
                      <span className="inline-flex gap-1 py-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-steel [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-steel [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-steel" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-ink/10 p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a piece, material, or room..."
                disabled={isStreaming}
                className="flex-1 rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-sm placeholder:text-steel focus:outline-none focus:ring-2 focus:ring-flare/40 disabled:opacity-60"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={isStreaming || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-flare disabled:opacity-40 disabled:pointer-events-none"
              >
                <Send size={16} strokeWidth={2} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? "Close chat" : "Open shopping assistant"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-luxury transition-colors hover:bg-flare"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X size={22} strokeWidth={1.75} /> : <MessageCircle size={22} strokeWidth={1.75} />}
          </motion.span>
        </AnimatePresence>
      </button>
    </>
  );
}
