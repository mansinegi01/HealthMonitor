
export type Emotion = "happy" | "sad" | "anxious" | "angry" | "calm" | "neutral" | "hopeful" | "stressed";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  emotion?: Emotion;
  timestamp: Date;
}

export const emotionConfig: Record<Emotion, { label: string; emoji: string; colorClass: string }> = {
  happy: { label: "Happy", emoji: "😊", colorClass: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  sad: { label: "Sad", emoji: "😢", colorClass: "bg-blue-100 text-blue-700 border-blue-200" },
  anxious: { label: "Anxious", emoji: "😰", colorClass: "bg-purple-100 text-purple-700 border-purple-200" },
  angry: { label: "Angry", emoji: "😤", colorClass: "bg-red-100 text-red-700 border-red-200" },
  calm: { label: "Calm", emoji: "🧘", colorClass: "bg-teal-100 text-teal-700 border-teal-200" },
  neutral: { label: "Neutral", emoji: "😐", colorClass: "bg-slate-100 text-slate-700 border-slate-200" },
  hopeful: { label: "Hopeful", emoji: "🌱", colorClass: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  stressed: { label: "Stressed", emoji: "😓", colorClass: "bg-orange-100 text-orange-700 border-orange-200" },
};

export function parseEmotionFromResponse(text: string): { emotion: Emotion | null; cleanText: string } {
  // Regex to find [EMOTION: mood] anywhere in the response
  const emotionMatch = text.match(/\[EMOTION:\s*(\w+)\]/i);
  
  if (emotionMatch) {
    const rawEmotion = emotionMatch[1].toLowerCase() as Emotion;
    const validEmotions = Object.keys(emotionConfig);
    const emotion = validEmotions.includes(rawEmotion) ? rawEmotion : null;
    
    // Remove the tag from the text shown to the user
    const cleanText = text.replace(/\[EMOTION:\s*\w+\]\s*/i, "").trim();
    return { emotion, cleanText };
  }
  return { emotion: null, cleanText: text };
}