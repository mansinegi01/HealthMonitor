
import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2, Heart, AlertCircle, Info } from "lucide-react";

// Internal Imports (Ensure these paths match your project structure)
import { useChat } from "./UseChat";
import { ChatBubble } from "./ChatBubble";
import { EmotionTracker } from "./EmotionTracker";
import FeedbackModal from "./feedbackModel";


import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Trash2, 
  Heart, 
  AlertTriangle, 
  Phone, 
  LifeBuoy, 
  Info 
} from "lucide-react";

// Internal Imports
import { useChat } from "./UseChat";
import { ChatBubble } from "./ChatBubble";
import { EmotionTracker } from "./EmotionTracker";
import FeedbackModal from "./feedbackModel"; // Ensure the filename case matches exactly

export function ChatInterface() {
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    clearChat, 
    currentEmotion, 
    sessionId 
  } = useChat();

  const [input, setInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // --- Suggestions ---
  const suggestions = [
    "I'm feeling anxious today",
    "I need help with stress",
    "I want to feel more positive",
  ];

  // --- CRISIS DETECTION LOGIC ---
  const isCrisisActive = useMemo(() => {
    const keywords = ["suicide", "kill myself", "end my life", "harm myself", "want to die"];
    const inputMatch = keywords.some(k => input.toLowerCase().includes(k));
    const lastMsg = messages[messages.length - 1];
    const historyMatch = lastMsg?.role === "user" && keywords.some(k => lastMsg.content.toLowerCase().includes(k));
    return inputMatch || historyMatch;
  }, [input, messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#f9fafb] overflow-hidden font-sans ">
      
      {/* Centered Container */}
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 md:p-6 min-h-0 mt-8">
        
        {/* Main Chat Card */}
        <div className="flex-1 bg-white rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col min-h-0 overflow-hidden relative">
          
          {/* 1. TOP SECTION: MOOD JOURNEY */}
          <EmotionTracker messages={messages} currentEmotion={currentEmotion} />

          {/* 2. SAFETY LAYER: CRISIS BANNER */}
          <AnimatePresence>
            {isCrisisActive && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: "auto", opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="bg-red-600 text-white z-20"
              >
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 animate-pulse shrink-0" />
                    <div>
                      <p className="text-xs font-bold leading-tight uppercase tracking-wide">Safety Alert</p>
                      <p className="text-[11px] opacity-90">Help is available 24/7. You are not alone.</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href="tel:988" className="flex-1 bg-white text-red-600 text-center py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2">
                      <Phone className="w-3 h-3" /> Call 988
                    </a>
                    <a href="https://988lifeline.org" target="_blank" rel="noreferrer" className="flex-1 bg-red-800 text-white text-center py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2">
                      <LifeBuoy className="w-3 h-3" /> Chat Online
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. CHAT MESSAGES AREA */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 bg-slate-50/30 scroll-smooth">
            {messages.length === 0 ? (
              /* RESTORED: Welcome Screen with Suggestions */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center mt-10"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center mb-6 shadow-lg">
                  <Heart className="w-10 h-10 text-white fill-current" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">
                  How are you feeling today?
                </h2>
                <p className="text-slate-500 max-w-sm mb-8 text-sm">
                  I'm your MindfulAI companion. Start typing or choose a suggestion to begin.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs text-slate-600 hover:border-teal-400 hover:text-teal-600 transition-all shadow-sm active:scale-95"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              messages.map((msg, i) => (
                <ChatBubble key={msg.id} message={msg} isLatest={i === messages.length - 1} />
              ))
            )}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 px-4 py-2 rounded-2xl flex gap-1 items-center shadow-sm">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 4. INPUT AREA */}
          <div className="p-4 md:p-6 bg-white border-t border-slate-100">
            <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-2 shadow-sm focus-within:ring-2 focus-within:ring-teal-100 transition-all">
              <button 
                type="button" 
                onClick={clearChat} 
                className="p-2 text-slate-300 hover:text-red-400 transition-colors shrink-0"
                title="Clear Chat History"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 bg-transparent py-2 outline-none text-sm text-slate-600 placeholder:text-slate-300"
              />

              {/* RESTORED: Feedback Button (visible on mobile/sm if needed) */}
              <button
                type="button"
                onClick={() => setShowFeedback(true)}
                className="hidden sm:block px-4 py-1.5 text-[10px] font-black uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:border-teal-400 hover:text-teal-600 transition-all shrink-0"
              >
                Feedback
              </button>

              <button 
                type="submit" 
                disabled={isLoading || !input.trim()} 
                className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white hover:bg-teal-600 disabled:opacity-20 shadow-md transition-all active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4 fill-current" />
              </button>
            </form>
            
            {/* MindNest Branding */}
            <div className="flex items-center justify-center gap-1 mt-3 opacity-60">
              <Info className="w-3 h-3 text-slate-400" />
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                MindNest AI: Emotionally Aware
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. RESTORED: FEEDBACK MODAL */}
      <AnimatePresence>
        {showFeedback && (
          <FeedbackModal
            sessionId={sessionId}
            onClose={() => setShowFeedback(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}