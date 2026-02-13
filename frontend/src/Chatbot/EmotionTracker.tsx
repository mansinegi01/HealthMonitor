
import React from "react";
import { motion } from "framer-motion";
import type { ChatMessage, Emotion } from "./ChatTypes";
import { emotionConfig } from "./ChatTypes";

interface EmotionTrackerProps {
  messages: ChatMessage[];
  currentEmotion: Emotion | null;
}

export function EmotionTracker({ messages, currentEmotion }: EmotionTrackerProps) {
  const emotionHistory = messages
    .filter((m) => m.role === "assistant" && m.emotion)
    .map((m) => m.emotion!);

  if (emotionHistory.length === 0 && !currentEmotion) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-3"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider shrink-0">
            Mood Journey
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            {emotionHistory.map((emotion, i) => {
              const config = emotionConfig[emotion];
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${config.colorClass}`}
                  title={config.label}
                >
                  {config.emoji}
                </motion.div>
              );
            })}
            {currentEmotion && emotionHistory.length > 0 && (
              <div className="w-px h-5 bg-border mx-1" />
            )}
            {currentEmotion && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted"
              >
                <span className="text-xs">
                  {emotionConfig[currentEmotion].emoji}
                </span>
                <span className="text-xs font-medium text-foreground">
                  {emotionConfig[currentEmotion].label}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
