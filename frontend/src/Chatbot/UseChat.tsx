
// import { useState, useCallback, useEffect } from "react";
// import type { ChatMessage, Emotion } from "./ChatTypes";
// import { parseEmotionFromResponse } from "./ChatTypes";

// const CHAT_URL = "http://localhost:8000/api/chat";

// export function useChat() {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentEmotion, setCurrentEmotion] = useState<Emotion | null>(null);
//   const [sessionId, setSessionId] = useState<string | null>(() => localStorage.getItem("sessionId"));

//   useEffect(() => {
//     if (!sessionId) {
//       const tempId = crypto.randomUUID();
//       localStorage.setItem("sessionId", tempId);
//       setSessionId(tempId);
//     }
//   }, [sessionId]);

//   const sendMessage = useCallback(async (input: string) => {
//     if (!input.trim() || isLoading) return;

//     const userMsg: ChatMessage = {
//       id: crypto.randomUUID(),
//       role: "user",
//       content: input.trim(),
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMsg]);
//     setIsLoading(true);

//     try {
//       const resp = await fetch(CHAT_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
//           sessionId: sessionId,
//         }),
//       });

//       const data = await resp.json();
//       const aiRawText = data.reply;

//       // Extract emotion detected by the AI in the context of the ongoing chat
//       const { emotion, cleanText } = parseEmotionFromResponse(aiRawText);

//       if (emotion) {
//         setCurrentEmotion(emotion);
//       }

//       const assistantMsg: ChatMessage = {
//         id: crypto.randomUUID(),
//         role: "assistant",
//         content: cleanText,
//         emotion: emotion || undefined,
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, assistantMsg]);
//     } catch (err) {
//       console.error("Chat Error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [messages, isLoading, sessionId]);

//   const clearChat = () => {
//     setMessages([]);
//     setCurrentEmotion(null);
//     localStorage.removeItem("sessionId");
//     setSessionId(crypto.randomUUID());
//   };

//   return { messages, isLoading, currentEmotion, sendMessage, clearChat, sessionId };
// }
import { useState, useCallback, useEffect } from "react";
import type { ChatMessage, Emotion } from "./ChatTypes";
import { parseEmotionFromResponse } from "./ChatTypes";

const CHAT_URL = "http://localhost:8000/api/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(() => localStorage.getItem("sessionId"));

  useEffect(() => {
    if (!sessionId) {
      const tempId = crypto.randomUUID();
      localStorage.setItem("sessionId", tempId);
      setSessionId(tempId);
    }
  }, [sessionId]);

  const sendMessage = useCallback(async (input: string) => {
    if (!input.trim() || isLoading) return;

    // 1. CRISIS DETECTION LIST
    const CRISIS_KEYWORDS = ["suicide", "kill myself", "end my life", "harm myself", "want to die", "better off dead"];
    const isCrisis = CRISIS_KEYWORDS.some(k => input.toLowerCase().includes(k));

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);

    // 2. INTERCEPT IF CRISIS DETECTED
    if (isCrisis) {
      console.warn("CRITICAL SAFETY ALERT: Crisis keywords detected. Providing emergency resources.");
      
      const emergencyMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        emotion: "sad",
        content: `I'm deeply concerned about what you're sharing. Please know that you are not alone, and there are people who want to support you through this.

🚨 **IMMEDIATE HELP RESOURCES:**
• **Call or Text 988** (Suicide & Crisis Lifeline) - Available 24/7.
• **Text HOME to 741741** to connect with the Crisis Text Line.
• **Call 911** or go to the nearest emergency room if you are in immediate danger.

🧘 **INSTANT GROUNDING EXERCISE (5-4-3-2-1):**
Take a slow breath. To help stay in the present moment, try to identify:
- **5** things you can see around you.
- **4** things you can touch.
- **3** things you can hear.
- **2** things you can smell.
- **1** thing you can taste.

Please reach out to one of the numbers above. They are trained to help in exactly this moment.`,
        timestamp: new Date(),
      };

      // Add a small delay to simulate the "AI" thinking before showing the emergency response
      setTimeout(() => {
        setMessages((prev) => [...prev, emergencyMsg]);
      }, 600);
      return; 
    }

    // 3. NORMAL AI CONVERSATION FLOW
    setIsLoading(true);
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          sessionId: sessionId,
        }),
      });

      const data = await resp.json();
      const { emotion, cleanText } = parseEmotionFromResponse(data.reply);

      if (emotion) setCurrentEmotion(emotion);

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: cleanText,
        emotion: emotion || undefined,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, sessionId]);

  const clearChat = () => {
    setMessages([]);
    setCurrentEmotion(null);
    localStorage.removeItem("sessionId");
    setSessionId(crypto.randomUUID());
  };

  return { messages, isLoading, currentEmotion, sendMessage, clearChat, sessionId };
}