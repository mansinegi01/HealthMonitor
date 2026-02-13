import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatBubbleProps {
  message: Message;
  isLatest: boolean;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
        max-w-[75%] px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap
        rounded-3xl shadow-md transition-all duration-300
        hover:translate-y-[-2px]
        ${
          isUser
            ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-br-lg shadow-lg"
            : "bg-white border border-gray-200 text-gray-700 rounded-bl-lg"
        }
      `}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
            <Heart className="w-3 h-3 text-emerald-400" />
            MindfulAI
          </div>
        )}

        {message.content}
      </div>
    </motion.div>
  );
}
