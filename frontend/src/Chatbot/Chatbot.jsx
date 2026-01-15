// import React, { useState, useRef, useEffect } from "react";
// import { Send, Bot, User } from "lucide-react";
// import { motion } from "framer-motion";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "👋 Hello! I’m your Health Support Assistant. How are you feeling today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input.trim() };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");

//     // Simulate bot reply
//     setTimeout(() => {
//       const botReplies = [
//         "Remember to drink enough water 💧",
//         "Take a deep breath and relax 🌿",
//         "A short walk can refresh your mind 🚶‍♀️",
//         "Would you like a quick stress-relief tip? 😊",
//         "Keeping track of your mood helps improve your emotional balance 💭",
//       ];
//       const randomReply =
//         botReplies[Math.floor(Math.random() * botReplies.length)];

//       setMessages((prev) => [...prev, { sender: "bot", text: randomReply }]);
//     }, 1000);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSend();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-indigo-50 flex flex-col items-center py-10 px-4">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text mb-6 mt-20"
//       >
//         Health Support Chatbot 🤖
//       </motion.h1>

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="w-full max-w-3xl bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl border border-gray-200 flex flex-col overflow-hidden"
//       >
//         {/* Chat Window */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[65vh] scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
//           {messages.map((msg, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className={`flex items-start ${
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               {msg.sender === "bot" && (
//                 <div className="mr-3 bg-blue-100 p-2 rounded-full">
//                   <Bot className="h-5 w-5 text-blue-600" />
//                 </div>
//               )}
//               <div
//                 className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
//                   msg.sender === "user"
//                     ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-br-none"
//                     : "bg-gray-100 text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//               {msg.sender === "user" && (
//                 <div className="ml-3 bg-indigo-100 p-2 rounded-full">
//                   <User className="h-5 w-5 text-indigo-600" />
//                 </div>
//               )}
//             </motion.div>
//           ))}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Input Section */}
//         <div className="flex items-center border-t border-gray-200 bg-white/60 px-4 py-3 backdrop-blur-md">
//           <input
//             type="text"
//             placeholder="Type your message..."
//             className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />
//           <button
//             onClick={handleSend}
//             className="ml-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full hover:scale-110 transform transition-all duration-300 shadow-md"
//           >
//             <Send className="h-5 w-5" />
//           </button>
//         </div>
//       </motion.div>

//       <p className="text-gray-500 text-sm mt-6">
//         💡 Your messages are private and never stored. This chatbot is your
//         personal companion for wellness, motivation, and self-care.
//       </p>
//     </div>
//   );
// };

// export default Chatbot;
import React from "react";
import { useState } from "react";
import ModeSelector from "./MoodSelector";
import AvatarChat from "./AvatarChat";
import TextChat from "./TextChat";

export default function Chatbot() {
  const [mode, setMode] = useState(null);

  if (!mode) return <ModeSelector setMode={setMode} />;

  return mode === "avatar" ? <AvatarChat /> : <TextChat />;
}
