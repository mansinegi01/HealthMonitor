
// import React from "react";
// import { motion } from "framer-motion";
// import type { ChatMessage, Emotion } from "./ChatTypes";
// import { emotionConfig } from "./ChatTypes";

// interface EmotionTrackerProps {
//   messages: ChatMessage[];
//   currentEmotion: Emotion | null;
// }

// export function EmotionTracker({ messages, currentEmotion }: EmotionTrackerProps) {
//   const emotionHistory = messages
//     .filter((m) => m.role === "assistant" && m.emotion)
//     .map((m) => m.emotion!);

//   if (emotionHistory.length === 0 && !currentEmotion) return null;

//   return (
//     <motion.div
//       initial={{ height: 0, opacity: 0 }}
//       animate={{ height: "auto", opacity: 1 }}
//       className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-3"
//     >
//       <div className="max-w-3xl mx-auto">
//         <div className="flex items-center gap-3">
//           <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider shrink-0">
//             Mood Journey
//           </span>
//           <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
//             {emotionHistory.map((emotion, i) => {
//               const config = emotionConfig[emotion];
//               return (
//                 <motion.div
//                   key={i}
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: i * 0.05 }}
//                   className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${config.colorClass}`}
//                   title={config.label}
//                 >
//                   {config.emoji}
//                 </motion.div>
//               );
//             })}
//             {currentEmotion && emotionHistory.length > 0 && (
//               <div className="w-px h-5 bg-border mx-1" />
//             )}
//             {currentEmotion && (
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted"
//               >
//                 <span className="text-xs">
//                   {emotionConfig[currentEmotion].emoji}
//                 </span>
//                 <span className="text-xs font-medium text-foreground">
//                   {emotionConfig[currentEmotion].label}
//                 </span>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// // }
import React from "react";
import { motion } from "framer-motion";
import { emotionConfig, type ChatMessage, type Emotion } from "./ChatTypes";

interface EmotionTrackerProps {
  messages: ChatMessage[];
  currentEmotion: Emotion | null;
}

export function EmotionTracker({ messages, currentEmotion }: EmotionTrackerProps) {
  // Extract emotions only from assistant messages that actually have an emotion property
  const emotionHistory = messages
    .filter((m) => m.role === "assistant" && m.emotion)
    .map((m) => m.emotion as Emotion);

  return (
    <div className="w-full bg-slate-50 border-b border-slate-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Emotional Timeline
          </span>
          
          <div className="flex items-center gap-2">
            {emotionHistory.length > 0 ? (
              emotionHistory.map((emo, i) => (
                <motion.div
                  key={`${emo}-${i}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${emotionConfig[emo].colorClass} border shadow-sm transition-all`}
                  title={emotionConfig[emo].label}
                >
                  {emotionConfig[emo].emoji}
                </motion.div>
              ))
            ) : (
              /* Placeholder when no emotions are detected yet */
              <div className="flex items-center gap-2 text-xs text-slate-300 italic">
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-slate-200" />
                Waiting for AI to detect mood...
              </div>
            )}
          </div>
        </div>

        {/* Current Mood Badge */}
        {currentEmotion && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-teal-100 shadow-sm"
          >
            <span className="text-[10px] font-black text-teal-600 uppercase">Current</span>
            <span className="text-base">{emotionConfig[currentEmotion].emoji}</span>
            <span className="text-sm font-medium text-slate-700">{emotionConfig[currentEmotion].label}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}