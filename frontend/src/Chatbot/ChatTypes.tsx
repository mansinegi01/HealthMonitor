export type Emotion =
  | "happy"
  | "sad"
  | "anxious"
  | "angry"
  | "calm"
  | "neutral"
  | "hopeful"
  | "stressed";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  emotion?: Emotion;
  timestamp: Date;
}

export const emotionConfig: Record<
  Emotion,
  { label: string; emoji: string; colorClass: string }
> = {
  happy: { label: "Happy", emoji: "😊", colorClass: "bg-emotion-happy" },
  sad: { label: "Sad", emoji: "😢", colorClass: "bg-emotion-sad" },
  anxious: { label: "Anxious", emoji: "😰", colorClass: "bg-emotion-anxious" },
  angry: { label: "Angry", emoji: "😤", colorClass: "bg-emotion-angry" },
  calm: { label: "Calm", emoji: "🧘", colorClass: "bg-emotion-calm" },
  neutral: { label: "Neutral", emoji: "😐", colorClass: "bg-emotion-neutral" },
  hopeful: { label: "Hopeful", emoji: "🌱", colorClass: "bg-emotion-hopeful" },
  stressed: { label: "Stressed", emoji: "😓", colorClass: "bg-emotion-stressed" },
};

export function parseEmotionFromResponse(text: string): {
  emotion: Emotion | null;
  cleanText: string;
} {
  const emotionMatch = text.match(/\[EMOTION:\s*(\w+)\]/i);

  if (emotionMatch) {
    const rawEmotion = emotionMatch[1].toLowerCase() as Emotion;

    const validEmotions: Emotion[] = [
      "happy",
      "sad",
      "anxious",
      "angry",
      "calm",
      "neutral",
      "hopeful",
      "stressed",
    ];

    const emotion = validEmotions.includes(rawEmotion)
      ? rawEmotion
      : null;

    const cleanText = text
      .replace(/\[EMOTION:\s*\w+\]\s*/i, "")
      .trim();

    return { emotion, cleanText };
  }

  return { emotion: null, cleanText: text };
}
