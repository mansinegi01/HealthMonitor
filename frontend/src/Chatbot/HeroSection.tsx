
import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Brain, Shield } from "lucide-react";

interface HeroSectionProps {
  onStartChat: () => void;
}

export function HeroSection({ onStartChat }: HeroSectionProps) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#eef4f3] via-[#f8fbfa] to-[#ffffff] overflow-hidden">

      {/* NAV */}
      <nav className="flex items-center px-8 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-md">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-serif font-semibold text-gray-800">
            MindfulAI
          </span>
        </div>
      </nav>

      {/* MAIN CENTER SECTION */}
      <div className="flex-1 flex flex-col justify-center items-center px-6">

        {/* Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-32 h-32 mb-8 mt-4"  // ↓ moved slightly down
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-300 to-emerald-400 opacity-30 blur-2xl animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 opacity-60 blur-md" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-xl">
            <Heart className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 text-center leading-tight mb-6">
          Your Safe Space for{" "}
          <span className="bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">
            Mental Wellness
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mb-10">
          An AI companion that understands your emotions, provides real-time
          support, and guides you toward mental clarity — 24/7, judgment-free.
        </p>

        {/* CTA — perfectly centered */}
        <button
          onClick={onStartChat}
          className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-14"
        >
          <MessageCircle className="w-5 h-5" />
          Start a Conversation
        </button>
      </div>

      {/* CARDS — anchored at bottom */}
      <div className="max-w-5xl mx-auto px-6 pb-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Brain,
              title: "Emotion Detection",
              desc: "AI analyzes your words to understand how you're feeling in real-time.",
            },
            {
              icon: MessageCircle,
              title: "Personalized Support",
              desc: "Every response is tailored to your emotional state with evidence-based strategies.",
            },
            {
              icon: Shield,
              title: "Safe & Private",
              desc: "Your conversations are private. No data is stored — your space, your rules.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-teal-600" />
              </div>

              <h3 className="font-serif font-semibold text-gray-900 mb-2 text-lg">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
