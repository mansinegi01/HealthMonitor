
import React from "react";
import { motion } from "framer-motion";
import { emotionConfig, type Emotion } from "./ChatTypes";

interface EmotionBadgeProps {
  emotion: Emotion;
  size?: "sm" | "md" | "lg";
}

export function EmotionBadge({ emotion, size = "sm" }: EmotionBadgeProps) {
  const config = emotionConfig[emotion];

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.colorClass} text-foreground/90 ${sizeClasses[size]}`}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </motion.span>
  );
}
