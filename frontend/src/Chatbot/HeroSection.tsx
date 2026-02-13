

import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Brain, Shield, User, Menu } from "lucide-react";

interface HeroSectionProps {
  onStartChat: () => void;
}

export function HeroSection({ onStartChat }: HeroSectionProps) {
  return (
    // min-h-screen ensures it takes full height, but allows scrolling if content is tall
    <div className="min-h-screen flex flex-col bg-[#f8fbfa] font-sans">
      
      {/* NAVBAR - Matches the new dark theme in your second image */}
      <nav className="w-full bg-gradient-to-r from-[#1a1c2e] via-[#2a5fb1] to-[#0ea5e9] px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          {/* Custom Logo Icon */}
          <div className="w-8 h-8 bg-[#ff5722] rounded-full flex items-center justify-center p-1">
             <div className="w-full h-full border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
             </div>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">MindNest</span>
        </div>
        <div className="flex items-center gap-5 text-white">
          <User className="w-6 h-6 cursor-pointer opacity-90 hover:opacity-100" />
          <Menu className="w-7 h-7 cursor-pointer opacity-90 hover:opacity-100" />
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        
        {/* REFINED ORB - Smaller and tighter to prevent vertical overflow */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#98d2c1] via-[#c2bed6] to-[#e0f2ee] blur-[30px] opacity-50" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#4d9086] to-[#6a87a3] flex items-center justify-center shadow-lg">
            <Heart className="w-7 h-7 text-white fill-current" />
          </div>
        </div>

        {/* HEADLINE - Scaled for better visibility */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#334155] leading-tight">
            Your Safe Space for
          </h1>
          <h2 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-[#4d8e84] via-[#6a87a3] to-[#9fa5c5] bg-clip-text text-transparent">
            Mental Wellness
          </h2>
        </div>

        {/* SUBTITLE */}
        <p className="text-[#64748b] text-center max-w-xl text-lg mb-10 leading-relaxed">
          An AI companion that understands your emotions, provides real-time
          support, and guides you toward mental clarity — 24/7, judgment-free.
        </p>

        {/* CTA BUTTON */}
        <button
          onClick={onStartChat}
          className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#538e85] to-[#7c92b0] text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 mb-20"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          Start a Conversation
        </button>

        {/* FEATURE CARDS - Using a standard grid with bottom padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full pb-10">
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
              className="bg-white/60 backdrop-blur-md border border-[#edf2f1] rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e6f1ef] flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-[#4d8e84]" />
              </div>
              <h3 className="font-serif font-bold text-[#334155] text-xl mb-3">
                {feature.title}
              </h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}