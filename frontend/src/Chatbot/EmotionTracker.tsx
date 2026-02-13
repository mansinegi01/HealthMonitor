import React from "react";
import { motion } from "framer-motion";

interface EmotionTrackerProps {
  currentEmotion: string | null;
}

const emotionStyles: Record<string, string> = {
  happy: "bg-emerald-100 text-emerald-600",
  sad: "bg-blue-100 text-blue-600",
  anxious: "bg-yellow-100 text-yellow-600",
  angry: "bg-red-100 text-red-600",
  calm: "bg-teal-100 text-teal-600",
  stressed: "bg-orange-100 text-orange-600",
  hopeful: "bg-purple-100 text-purple-600",
  neutral: "bg-gray-100 text-gray-600",
};

export function EmotionTracker({ currentEmotion }: EmotionTrackerProps) {
  if (!currentEmotion) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-between px-6 py-3"
    >
      <div className="text-sm text-gray-500">
        Mood Journey
      </div>

      <motion.div
        key={currentEmotion}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm ${
          emotionStyles[currentEmotion] || "bg-gray-100 text-gray-600"
        }`}
      >
        {currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1)}
      </motion.div>
    </motion.div>
  );
}
