import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {HeroSection} from "./HeroSection";
import { ChatInterface } from "./ChatInterface";
import { ArrowLeft, Heart } from "lucide-react";

export default function ChatbotIndex() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef6f4] via-white to-[#f5fbfa] flex items-center justify-center p-4">

      <AnimatePresence mode="wait">

        {!showChat ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-5xl"
          >
            <HeroSection onStartChat={() => setShowChat(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-5xl relative"
          >

            {/* Chat Header */}
            <div className="flex items-center justify-between mb-4 px-4">

              <div className="flex items-center gap-3">

                <button
                  onClick={() => setShowChat(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-md">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold text-gray-800">
                      MindfulAI
                    </h1>
                    <p className="text-[11px] text-gray-400">
                      Your mental health companion
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Chat UI */}
            <ChatInterface />

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}




