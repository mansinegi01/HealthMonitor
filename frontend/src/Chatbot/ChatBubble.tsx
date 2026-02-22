
// import React from "react";
// import { motion } from "framer-motion";
// import { Heart } from "lucide-react";
// import { EmotionBadge } from "./EmotionBadge";
// import { type ChatMessage } from "./ChatTypes";

// export function ChatBubble({ message }: { message: ChatMessage, isLatest: boolean }) {
//   const isUser = message.role === "user";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
//     >
//       <div className={`
//         relative max-w-[85%] px-4 py-3 rounded-2xl shadow-sm
//         ${isUser ? "bg-teal-500 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"}
//       `}>
//         {!isUser && (
//           <div className="flex items-center justify-between mb-2 gap-4">
//             <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
//               <Heart className="w-3 h-3 fill-current text-teal-400" />
//               MINDFUL AI
//             </div>
//             {/* 🔥 THIS RENDERS THE DETECTED MOOD */}
//             {message.emotion && <EmotionBadge emotion={message.emotion} size="sm" />}
//           </div>
//         )}
//         <p className="text-sm leading-relaxed">{message.content}</p>
//       </div>
//     </motion.div>
//   );
// }
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { EmotionBadge } from "./EmotionBadge";
import { type ChatMessage } from "./ChatTypes";

export function ChatBubble({ message, isLatest }: { message: ChatMessage; isLatest: boolean }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`
        relative max-w-[85%] px-4 py-3 rounded-2xl shadow-sm
        ${isUser ? "bg-teal-500 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"}
      `}>
        {!isUser && (
          <div className="flex items-center justify-between mb-2 gap-4">
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
              <Heart className="w-3 h-3 fill-current text-teal-400" />
              MINDFUL AI
            </div>
            {message.emotion && <EmotionBadge emotion={message.emotion} size="sm" />}
          </div>
        )}
        
        {/* whitespace-pre-wrap is CRITICAL for the emergency resources formatting */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
          {message.content}
        </p>
      </div>
    </motion.div>
  );
}