
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Trash2, Heart } from "lucide-react";
import { useChat } from "./UseChat";
import { ChatBubble } from "./ChatBubble";

export function ChatInterface() {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "I'm feeling anxious today",
    "I need help with stress",
    "I'm going through a tough time",
    "I want to feel more positive",
  ];

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
    <div className="flex flex-col h-screen bg-[#f8fbfa]">

      {/* Header offset (adjust if header height differs) */}
      <div className="flex flex-col flex-1 pt-16 min-h-0">

        <div className="flex-1 flex justify-center px-4 py-6 min-h-0">

          {/* Chat Container Box */}
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col min-h-0">

            {/* Scrollable Chat Area */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">

              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center text-center mt-10"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center mb-6 shadow-lg">
                    <Heart className="w-10 h-10 text-white fill-current" />
                  </div>

                  <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">
                    How are you feeling today?
                  </h2>

                  <p className="text-slate-500 max-w-sm mb-8">
                    I'm here to listen and help you navigate your emotions.
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center max-w-lg">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-sm text-slate-600 hover:border-teal-300 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                messages.map((msg, i) => (
                  <ChatBubble
                    key={msg.id}
                    message={msg}
                    isLatest={i === messages.length - 1}
                  />
                ))
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="border-t border-slate-100 px-6 py-4 bg-white">

              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-[35px] px-6 py-3 shadow-sm"
              >
                <button
                  type="button"
                  onClick={clearChat}
                  className="p-2 text-slate-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share what's on your mind..."
                  className="flex-1 bg-transparent py-2 focus:outline-none text-slate-600 placeholder:text-slate-300 resize-none"
                  rows={1}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4 fill-current" />
                </button>
              </form>

              <p className="text-[10px] text-slate-400 text-center mt-3 font-semibold uppercase">
                MindNest is not a substitute for professional care. Crisis? Call 988.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
