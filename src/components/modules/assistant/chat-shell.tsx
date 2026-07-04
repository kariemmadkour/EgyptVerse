"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Send, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import heritageSpinner from "@/assets/lottie/heritage-spinner.json";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

type ReplyKey = "replyRosetta" | "replyMask" | "replyMembership" | "replyDefault";

function matchReplyKey(question: string): ReplyKey {
  const q = question.toLowerCase();
  if (q.includes("rosetta") || q.includes("رشيد") || q.includes("rosette")) return "replyRosetta";
  if (q.includes("mask") || q.includes("قناع") || q.includes("masque")) return "replyMask";
  if (q.includes("member") || q.includes("عضوية") || q.includes("adhé")) return "replyMembership";
  return "replyDefault";
}

export function ChatShell() {
  const t = useTranslations("Assistant");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", text: t("welcomeMessage") },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const question = input.trim();
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Mocked "thinking" delay — this Phase 1 preview has no live model to await.
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: t(matchReplyKey(question)),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 700);
  }

  return (
    <div className="mx-auto flex h-[70vh] max-w-3xl flex-col rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-6 py-4">
        <Sparkles className="size-5 text-gold" aria-hidden />
        <span className="font-heading font-semibold">Heritage Assistant</span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={
                  m.role === "user"
                    ? "max-w-[80%] rounded-2xl rounded-ee-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                    : "max-w-[80%] rounded-2xl rounded-ss-sm bg-secondary px-4 py-2.5 text-sm text-secondary-foreground"
                }
              >
                {m.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-2 rounded-2xl rounded-ss-sm bg-secondary px-4 py-2 text-secondary-foreground">
                <div className="w-6">
                  <Lottie animationData={heritageSpinner} loop autoplay />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("inputPlaceholder")}
          aria-label={t("inputPlaceholder")}
          disabled={isTyping}
        />
        <Button type="submit" size="icon" aria-label={t("send")} disabled={isTyping}>
          <Send className="size-4" aria-hidden />
        </Button>
      </form>
      <p className="border-t border-border px-6 py-3 text-xs text-muted-foreground">
        {t("disclaimer")}
      </p>
    </div>
  );
}
