
// import React from "react";
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Send, Trash2, Heart, Loader2 } from "lucide-react";
// import { useChat } from "./UseChat";
// import { ChatBubble } from "./ChatBubble";
// import { EmotionTracker } from "./EmotionTracker";

// export function ChatInterface() {
//   const { messages, isLoading, currentEmotion, error, sendMessage, clearChat } =
//     useChat();
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (input.trim()) {
//       sendMessage(input);
//       setInput("");
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="flex flex-col flex-1 w-full">

//       {/* Emotion tracker bar */}
//       <EmotionTracker messages={messages} currentEmotion={currentEmotion} />

//       {/* Messages area */}
//       <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
//         {messages.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="flex flex-col items-center justify-center h-full text-center px-4"
//           >
//             <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center mb-6 animate-breathe">
//               <Heart className="w-9 h-9 text-primary-foreground" />
//             </div>
//             <h2 className="text-2xl font-serif font-semibold text-foreground mb-3">
//               How are you feeling today?
//             </h2>
//             <p className="text-muted-foreground max-w-md leading-relaxed">
//               I'm here to listen, support, and help you navigate your emotions.
//               Share what's on your mind — there's no judgment here.
//             </p>
//             <div className="flex flex-wrap gap-2 mt-6 justify-center">
//               {[
//                 "I'm feeling anxious today",
//                 "I need help with stress",
//                 "I'm going through a tough time",
//                 "I want to feel more positive",
//               ].map((suggestion) => (
//                 <button
//                   key={suggestion}
//                   onClick={() => sendMessage(suggestion)}
//                   className="px-4 py-2 rounded-full border border-border bg-card text-sm text-card-foreground hover:bg-muted transition-colors shadow-soft"
//                 >
//                   {suggestion}
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {messages.map((msg, i) => (
//           <ChatBubble
//             key={msg.id}
//             message={msg}
//             isLatest={i === messages.length - 1}
//           />
//         ))}

//         {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex justify-start mb-4"
//           >
//             <div className="bg-card shadow-card border border-border rounded-2xl rounded-bl-md px-5 py-3">
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 <span className="text-sm">Listening...</span>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -8 }}
//               className="flex justify-center mb-4"
//             >
//               <div className="bg-destructive/10 text-destructive text-sm px-4 py-2 rounded-lg">
//                 {error}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input area */}
//       <div className="border-t border-border bg-background/80 backdrop-blur-sm px-4 py-3">
//         <form onSubmit={handleSubmit} className="flex items-end gap-3 max-w-3xl mx-auto">
//           {messages.length > 0 && (
//             <button
//               type="button"
//               onClick={clearChat}
//               className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
//               title="Clear chat"
//             >
//               <Trash2 className="w-5 h-5" />
//             </button>
//           )}

//           <div className="flex-1 relative">
//             <textarea
//               ref={inputRef}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Share what's on your mind..."
//               rows={1}
//               className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 pr-12 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
//               style={{ maxHeight: "120px" }}
//               onInput={(e) => {
//                 const target = e.target as HTMLTextAreaElement;
//                 target.style.height = "auto";
//                 target.style.height = Math.min(target.scrollHeight, 120) + "px";
//               }}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={!input.trim() || isLoading}
//             className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-all shrink-0 shadow-soft"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </form>

//         <p className="text-[10px] text-muted-foreground text-center mt-2 opacity-60">
//           MindfulAI is not a substitute for professional mental health care. If you're in crisis, please call 988.
//         </p>
//       </div>
//     </div>
//   );
// } 
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Heart, RotateCcw, Loader2, PlusCircle } from "lucide-react";
import { useChat } from "./UseChat";
import { ChatBubble } from "./ChatBubble";
import { EmotionTracker } from "./EmotionTracker";

export function ChatInterface() {
  const { messages, isLoading, currentEmotion, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic strictly for the internal container
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    /**
     * h-screen and overflow-hidden on the main wrapper 
     * prevents the "extreme right" page scrollbar.
     */
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
      
      {/* 1. Header Section - Fixed Height */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0 bg-white z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E6F4F1] flex items-center justify-center shadow-sm">
            <Heart className="w-5 h-5 text-[#149184]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1A2E35]">MindfulChat</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Safe Space</p>
          </div>
        </div>
        
        {/* REFINED New Chat Button: Higher visibility */}
        <div className="flex items-center">
          <button 
            onClick={clearChat} 
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-[#1A2E35] hover:bg-[#E6F4F1] hover:text-[#149184] hover:border-[#149184]/30 text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <PlusCircle className="w-4 h-4" /> NEW CHAT
          </button>
        </div>
      </header>

      {/* 2. Emotion Tracker Section - Placed beneath header */}
      <div className="shrink-0 bg-white border-b border-gray-50 z-20">
        <EmotionTracker messages={messages} currentEmotion={currentEmotion} />
      </div>

      {/* 3. Main Chat Container - Scrollable Middle */}
      <main className="flex-1 overflow-y-auto bg-[#F8FAFA] relative scroll-smooth scrollbar-thin">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-full p-8 text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-6"
            >
              <Heart className="w-8 h-8 text-[#149184]" />
            </motion.div>
            <h2 className="text-2xl font-bold text-[#1A2E35] mb-2 font-serif">How are you feeling today?</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xs leading-relaxed">
              I'm here to listen and support you through whatever is on your mind.
            </p>
            
            {/* Suggestions/Predefined Prompts */}
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {["I'm feeling anxious", "I need help with stress", "I'm having a tough time"].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-[#1A2E35] hover:border-[#149184] hover:text-[#149184] transition-all shadow-sm font-medium"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          
          {isLoading && (
            <div className="flex gap-3 items-center text-gray-400 p-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse border border-gray-200" />
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
                <Loader2 className="w-3 h-3 animate-spin text-[#149184]" />
                <span className="text-xs italic font-medium">MindfulAI is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* 4. Input Footer - Fixed Bottom */}
      <footer className="p-4 bg-white border-t border-gray-100 shrink-0 shadow-lg">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share what's on your mind..."
            className="flex-1 p-4 rounded-xl border border-gray-200 bg-[#F8FAFA] text-[#1A2E35] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#149184]/15 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3.5 rounded-xl bg-[#149184] text-white disabled:opacity-40 hover:bg-[#0E7A6E] transition-all shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-[10px] text-gray-400 text-center mt-3 font-semibold uppercase tracking-wider">
          MindfulChat is not a substitute for professional therapy.
        </p>
      </footer>
    </div>
  );
}