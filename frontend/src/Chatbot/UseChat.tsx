import React from "react";
import { useState, useCallback } from "react";
import type { ChatMessage, Emotion } from "./ChatTypes";
import { parseEmotionFromResponse } from "./ChatTypes";

const CHAT_URL = "http://localhost:8000/api/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (input: string) => {
      if (!input.trim() || isLoading) return;

      setError(null);

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: input.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const resp = await fetch(CHAT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!resp.ok) {
          throw new Error("API error");
        }

        // ✅ FIX: Read JSON properly
        const data = await resp.json();

        // backend sends { reply: "text" }
        const aiText = data.reply;

        const { emotion, cleanText } =
          parseEmotionFromResponse(aiText);

        if (emotion) setCurrentEmotion(emotion);

        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: cleanText,
          emotion: emotion ?? undefined,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        setError("Connection error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setCurrentEmotion(null);
    setError(null);
  }, []);

  return { messages, isLoading, currentEmotion, error, sendMessage, clearChat };
}