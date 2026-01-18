// import { useNavigate, Link } from "react-router-dom";
// import React, { useState, useContext, useEffect } from "react";
// import { MessageCircle, Users, Zap, PenTool, Dumbbell, Brain, Sun, Moon } from "lucide-react";
// import { AuthContext } from "../Context/AuthContext";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";

// function Home() {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const [isDark, setIsDark] = useState(true);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [highlightNotes, setHighlightNotes] = useState(false);
//   const [highlightTherapy, setHighlightTherapy] = useState(false);

//   const feelings = [
//     { label: "Happy 😊", mood: "happy" },
//     { label: "Excited 🤩", mood: "happy" },
//     { label: "Good 🙂", mood: "good" },
//     { label: "Tired 😴", mood: "tired" },
//     { label: "Sad 😢", mood: "sad" },
//     { label: "Anxious 😟", mood: "anxious" },
//   ];

//   const motivationalQuotesByMood = {
//     "Tired 😴": ["Rest when you need to, but don’t quit. 🌙", "Even slow progress is progress. 💪"],
//     "Sad 😢": ["It’s okay to not be okay — better days are coming. ☀️", "You are stronger than you feel right now. 💫"],
//     "Anxious 😟": ["Breathe. You’ve got this. 🌿", "Peace begins with one deep breath. 🌸"],
//   };

//   const handleFeelingClick = async (feelingLabel) => {
//     setHighlightNotes(false);
//     setHighlightTherapy(false);

//     const moodObj = feelings.find(f => f.label === feelingLabel);
//     try {
//       await axios.post("/api/mood/add", { userId: user?._id, mood: moodObj.mood });
//     } catch (err) { console.error(err); }

//     let popupText = "";
//     if (["Happy 😊", "Excited 🤩", "Good 🙂"].includes(feelingLabel)) {
//       setHighlightNotes(true);
//       popupText = "📝 Reflect on this joy in your notes!";
//     } else {
//       setHighlightTherapy(true);
//       const quotes = motivationalQuotesByMood[feelingLabel] || ["You are loved. 💚"];
//       popupText = `${quotes[Math.floor(Math.random() * quotes.length)]}`;
//     }

//     setPopupMessage(popupText);
//     setShowPopup(true);
    
//     setTimeout(() => {
//       setShowPopup(false);
//       setHighlightNotes(false);
//       setHighlightTherapy(false);
//     }, 4000); 
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden font-sans ${isDark ? "bg-[#030305] text-white" : "bg-[#F0F4FF] text-slate-800"}`}>
      
//       {/* 🌓 Theme Slider (Top Right) */}
//       <div className="fixed top-20 right-8 z-[100] flex items-center gap-3">
//         <Sun size={18} className={isDark ? "text-gray-500" : "text-amber-500"} />
//         <div 
//           onClick={() => setIsDark(!isDark)}
//           className="w-14 h-7 bg-indigo-500/20 rounded-full relative cursor-pointer border border-indigo-400/30 shadow-inner"
//         >
//           <motion.div 
//             animate={{ x: isDark ? 28 : 2 }}
//             className="w-6 h-6 bg-indigo-600 rounded-full absolute top-0.5 shadow-lg flex items-center justify-center"
//           >
//              {isDark ? <Moon size={12} className="text-white" /> : <Sun size={12} className="text-white" />}
//           </motion.div>
//         </div>
//         <Moon size={18} className={isDark ? "text-indigo-400" : "text-gray-400"} />
//       </div>

//       {/* 🌌 Animated Background Elements */}
//       <div className="fixed inset-0 z-0">
//         <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse ${isDark ? "bg-indigo-900/20" : "bg-blue-200/50"}`} />
//         <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse ${isDark ? "bg-blue-900/20" : "bg-purple-200/40"}`} style={{ animationDelay: '2s' }} />
//       </div>

//       {/* 🔔 Popup */}
//       <AnimatePresence>
//         {showPopup && (
//           <motion.div 
//             initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
//             className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3 min-w-[320px] justify-center ${isDark ? "bg-indigo-600 border border-white/20 text-white" : "bg-white border border-indigo-100 text-indigo-700"}`}
//           >
//             <Zap size={22} className="animate-bounce text-yellow-300" />
//             <span className="font-bold text-lg">{popupMessage}</span>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 🏠 Main Content */}
//       <main className="relative z-10 pt-28 pb-20 px-6 max-w-3xl mx-auto">
        
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
//           <h1 className={`text-5xl font-black tracking-tighter bg-clip-text text-transparent ${isDark ? "bg-gradient-to-r from-white via-indigo-200 to-indigo-500" : "bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-800"}`}>
//             Welcome, {user?.name || "Explorer"}
//           </h1>
//           <p className={`mt-4 text-lg font-medium ${isDark ? "text-gray-400" : "text-slate-500"}`}>How is your inner world today?</p>
          
//           <div className="flex flex-wrap justify-center gap-4 mt-8">
//             {feelings.map((f, i) => (
//               <motion.button
//                 key={i}
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => handleFeelingClick(f.label)}
//                 className={`px-6 py-2 rounded-full border transition-all shadow-sm font-medium ${isDark ? "bg-white/5 border-white/10 text-white hover:bg-indigo-500/20 hover:border-indigo-500/50" : "bg-white/70 border-indigo-100 text-slate-700 hover:bg-white hover:border-indigo-300"}`}
//               >
//                 {f.label}
//               </motion.button>
//             ))}
//           </div>
//         </motion.div>

//         {/* 🧩 COLUMN DASHBOARD */}
//         <div className="flex flex-col gap-8" style={{ perspective: "1000px" }}>
          
//           <HomeCard 
//             isDark={isDark}
//             highlight={highlightNotes}
//             icon={<PenTool className="text-green-500" />}
//             title="Wellness Notes"
//             desc="Reflect on your emotions — document your soul's journey."
//             action={
//               <div className="flex gap-4 w-full">
//                 <button onClick={() => navigate("/notes", { state: { mood: 'good' } })} className={`flex-1 py-3 rounded-xl transition-all font-bold border ${isDark ? "bg-green-500/20 border-green-500/30 text-white hover:bg-green-500/40" : "bg-emerald-100/50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"}`}>😄 Feeling Good</button>
//                 <button onClick={() => navigate("/notes", { state: { mood: 'sad' } })} className={`flex-1 py-3 rounded-xl transition-all font-bold border ${isDark ? "bg-red-500/20 border-red-500/30 text-white hover:bg-red-500/40" : "bg-rose-100/50 border-rose-200 text-rose-700 hover:bg-rose-100"}`}>😔 Not Great</button>
//               </div>
//             }
//           />

//           <HomeCard 
//             isDark={isDark}
//             highlight={highlightTherapy}
//             icon={<Brain className="text-purple-500" />}
//             title="Mind Therapy"
//             desc="Listen to soothing frequencies and guided meditation designed for mental clarity."
//             action={
//               <button onClick={() => navigate("/therapy")} className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${isDark ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"}`}>Enter Therapy Room</button>
//             }
//           />

//           <HomeCard 
//             isDark={isDark}
//             icon={<Dumbbell className="text-blue-500" />}
//             title="Fitness & Yoga"
//             desc="Engage in curated physical activities to strengthen both body and mind."
//             action={
//               <button onClick={() => navigate("/workout")} className={`w-full py-4 rounded-xl font-bold transition-all ${isDark ? "bg-white/10 hover:bg-white/20 border border-white/10" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"}`}>Start Session</button>
//             }
//           />

//           {/* Chatbot and Community at the Bottom */}
//           <HomeCard 
//             isDark={isDark}
//             icon={<MessageCircle className="text-indigo-400" />}
//             title="AI Wellness Guide"
//             desc="Chat with your personal AI companion for instant support and guidance."
//             action={
//               <button onClick={() => navigate("/chatbot")} className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${isDark ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"}`}>Start Chatting</button>
//             }
//           />

//           <HomeCard 
//             isDark={isDark}
//             icon={<Users className="text-pink-400" />}
//             title="Community Circle"
//             desc="Join our safe haven to share experiences and connect with fellow travelers."
//             action={
//               <button onClick={() => navigate("/community")} className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${isDark ? "bg-pink-600 hover:bg-pink-500 text-white shadow-pink-500/20" : "bg-pink-500 hover:bg-pink-600 text-white shadow-pink-200"}`}>Explore Community</button>
//             }
//           />
//         </div>
//       </main>
//     </div>
//   );
// }

// function HomeCard({ icon, title, desc, action, highlight, isDark }) {
//   return (
//     <motion.div
//       whileHover={{ rotateX: 2, translateZ: 10, scale: 1.01 }}
//       className={`relative p-8 rounded-[32px] border transition-all duration-500 group overflow-hidden ${
//         highlight 
//         ? (isDark ? "bg-indigo-600/30 border-indigo-400 shadow-2xl" : "bg-white border-indigo-400 shadow-2xl") 
//         : (isDark ? "bg-[#0f0f15]/60 border-white/10 backdrop-blur-2xl" : "bg-white/40 border-white/60 backdrop-blur-xl shadow-xl shadow-indigo-100/20")
//       }`}
//     >
//       <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
//         <div className={`p-5 rounded-3xl border shadow-sm ${isDark ? "bg-white/5 border-white/10" : "bg-white border-indigo-50"}`}>
//           {React.cloneElement(icon, { size: 32 })}
//         </div>
//         <div className="flex-1 text-center md:text-left">
//           <h3 className={`text-3xl font-bold mb-2 tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>{title}</h3>
//           <p className={`text-base leading-relaxed mb-8 max-w-xl font-medium ${isDark ? "text-gray-400" : "text-slate-500"}`}>{desc}</p>
//           <div className="w-full">{action}</div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default Home;
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { MessageCircle, Users, Zap, PenTool, Dumbbell, Brain, Sun, Moon } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [isDark, setIsDark] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [highlightNotes, setHighlightNotes] = useState(false);
  const [highlightTherapy, setHighlightTherapy] = useState(false);

  const feelings = [
    { label: "Happy 😊", mood: "happy" },
    { label: "Excited 🤩", mood: "happy" },
    { label: "Good 🙂", mood: "good" },
    { label: "Tired 😴", mood: "tired" },
    { label: "Sad 😢", mood: "sad" },
    { label: "Anxious 😟", mood: "anxious" },
  ];

  const motivationalQuotesByMood = {
    "Tired 😴": ["Rest when you need to, but don’t quit. 🌙", "Even slow progress is progress. 💪"],
    "Sad 😢": ["It’s okay to not be okay — better days are coming. ☀️", "You are stronger than you feel right now. 💫"],
    "Anxious 😟": ["Breathe. You’ve got this. 🌿", "Peace begins with one deep breath. 🌸"],
  };

  const handleFeelingClick = async (feelingLabel) => {
    setHighlightNotes(false);
    setHighlightTherapy(false);

    const moodObj = feelings.find(f => f.label === feelingLabel);
    try {
      await axios.post("/api/mood/add", { userId: user?._id, mood: moodObj.mood });
    } catch (err) { console.error(err); }

    let popupText = "";
    if (["Happy 😊", "Excited 🤩", "Good 🙂"].includes(feelingLabel)) {
      setHighlightNotes(true);
      popupText = "📝 Reflect on this joy in your notes!";
    } else {
      setHighlightTherapy(true);
      const quotes = motivationalQuotesByMood[feelingLabel] || ["You are loved. 💚"];
      popupText = `${quotes[Math.floor(Math.random() * quotes.length)]}`;
    }

    setPopupMessage(popupText);
    setShowPopup(true);
    
    setTimeout(() => {
      setShowPopup(false);
      setHighlightNotes(false);
      setHighlightTherapy(false);
    }, 4000); 
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden font-sans ${isDark ? "bg-[#030305] text-white" : "bg-[#F0F4FF] text-slate-800"}`}>
      
      {/* 🌓 Theme Slider (Top Right) */}
      <div className="fixed top-20 right-8 z-[100] flex items-center gap-3">
        <Sun size={18} className={isDark ? "text-gray-500" : "text-amber-500"} />
        <div 
          onClick={() => setIsDark(!isDark)}
          className="w-14 h-7 bg-indigo-500/20 rounded-full relative cursor-pointer border border-indigo-400/30 shadow-inner"
        >
          <motion.div 
            animate={{ x: isDark ? 28 : 2 }}
            className="w-6 h-6 bg-indigo-600 rounded-full absolute top-0.5 shadow-lg flex items-center justify-center"
          >
             {isDark ? <Moon size={12} className="text-white" /> : <Sun size={12} className="text-white" />}
          </motion.div>
        </div>
        <Moon size={18} className={isDark ? "text-indigo-400" : "text-gray-400"} />
      </div>

      {/* 🌌 Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse ${isDark ? "bg-indigo-900/20" : "bg-blue-200/50"}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse ${isDark ? "bg-blue-900/20" : "bg-purple-200/40"}`} style={{ animationDelay: '2s' }} />
      </div>

      {/* 🔔 Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3 min-w-[320px] justify-center ${isDark ? "bg-indigo-600 border border-white/20 text-white" : "bg-white border border-indigo-100 text-indigo-700"}`}
          >
            <Zap size={22} className="animate-bounce text-yellow-300" />
            <span className="font-bold text-lg">{popupMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏠 Main Content */}
      <main className="relative z-10 pt-28 pb-20 px-6 max-w-3xl mx-auto">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className={`text-5xl font-black tracking-tighter bg-clip-text text-transparent ${isDark ? "bg-gradient-to-r from-white via-indigo-200 to-indigo-500" : "bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-800"}`}>
            Welcome, {user?.name || "Explorer"}
          </h1>
          <p className={`mt-4 text-lg font-medium ${isDark ? "text-gray-400" : "text-slate-500"}`}>How is your inner world today?</p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {feelings.map((f, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleFeelingClick(f.label)}
                className={`px-6 py-2 rounded-full border transition-all shadow-sm font-medium ${isDark ? "bg-white/5 border-white/10 text-white hover:bg-indigo-500/20 hover:border-indigo-500/50" : "bg-white/70 border-indigo-100 text-slate-700 hover:bg-white hover:border-indigo-300"}`}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 🧩 COLUMN DASHBOARD */}
        <div className="flex flex-col gap-8" style={{ perspective: "1000px" }}>
          
          <HomeCard 
            isDark={isDark}
            highlight={highlightNotes}
            icon={<PenTool className="text-green-500" />}
            title="Wellness Notes"
            desc="Reflect on your emotions — document your soul's journey."
            action={
              <div className="flex gap-4 w-full">
                <button onClick={() => navigate("/notes", { state: { mood: 'good' } })} className={`flex-1 py-3 rounded-xl transition-all font-bold border ${isDark ? "bg-green-500/20 border-green-500/30 text-white hover:bg-green-500/40" : "bg-emerald-100/50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"}`}>😄 Feeling Good</button>
                <button onClick={() => navigate("/notes", { state: { mood: 'sad' } })} className={`flex-1 py-3 rounded-xl transition-all font-bold border ${isDark ? "bg-red-500/20 border-red-500/30 text-white hover:bg-red-500/40" : "bg-rose-100/50 border-rose-200 text-rose-700 hover:bg-rose-100"}`}>😔 Not Great</button>
              </div>
            }
          />

          <HomeCard 
            isDark={isDark}
            highlight={highlightTherapy}
            icon={<Brain className="text-purple-500" />}
            title="Mind Therapy"
            desc="Listen to soothing frequencies and guided meditation designed for mental clarity."
            action={
              <button onClick={() => navigate("/therapy")} className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${isDark ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"}`}>Enter Therapy Room</button>
            }
          />

          {/* ⚡ QUICK HUB (Placed below Mind Therapy) */}
          <HomeCard 
            isDark={isDark}
            icon={<Zap className="text-yellow-400" />}
            title="Quick Hub"
            desc="Access your performance metrics and relaxation minigames instantly."
            action={
              <div className="grid grid-cols-2 gap-4 w-full">
                <Link to="/playGames" className={`flex items-center justify-center gap-2 p-4 rounded-xl transition-all border font-semibold ${isDark ? "bg-white/5 border-white/10 hover:bg-indigo-500/20" : "bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-100"}`}>🎮 Play Games</Link>
                <Link to="/reports" className={`flex items-center justify-center gap-2 p-4 rounded-xl transition-all border font-semibold ${isDark ? "bg-white/5 border-white/10 hover:bg-indigo-500/20" : "bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100"}`}>📊 View Reports</Link>
              </div>
            }
          />

          <HomeCard 
            isDark={isDark}
            icon={<Dumbbell className="text-blue-500" />}
            title="Fitness & Yoga"
            desc="Engage in curated physical activities to strengthen both body and mind."
            action={
              <button onClick={() => navigate("/workout")} className={`w-full py-4 rounded-xl font-bold transition-all ${isDark ? "bg-white/10 hover:bg-white/20 border border-white/10" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"}`}>Start Session</button>
            }
          />

          {/* Chatbot and Community at the Bottom */}
          <HomeCard 
            isDark={isDark}
            icon={<MessageCircle className="text-indigo-400" />}
            title="AI Wellness Guide"
            desc="Chat with your personal AI companion for instant support and guidance."
            action={
              <button onClick={() => navigate("/chatbot")} className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${isDark ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"}`}>Start Chatting</button>
            }
          />

          <HomeCard 
            isDark={isDark}
            icon={<Users className="text-pink-400" />}
            title="Community Circle"
            desc="Join our safe haven to share experiences and connect with fellow travelers."
            action={
              <button onClick={() => navigate("/community")} className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${isDark ? "bg-pink-600 hover:bg-pink-500 text-white shadow-pink-500/20" : "bg-pink-500 hover:bg-pink-600 text-white shadow-pink-200"}`}>Explore Community</button>
            }
          />
        </div>
      </main>
    </div>
  );
}

function HomeCard({ icon, title, desc, action, highlight, isDark }) {
  return (
    <motion.div
      whileHover={{ rotateX: 2, translateZ: 10, scale: 1.01 }}
      className={`relative p-8 rounded-[32px] border transition-all duration-500 group overflow-hidden ${
        highlight 
        ? (isDark ? "bg-indigo-600/30 border-indigo-400 shadow-2xl" : "bg-white border-indigo-400 shadow-2xl") 
        : (isDark ? "bg-[#0f0f15]/60 border-white/10 backdrop-blur-2xl" : "bg-white/40 border-white/60 backdrop-blur-xl shadow-xl shadow-indigo-100/20")
      }`}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className={`p-5 rounded-3xl border shadow-sm ${isDark ? "bg-white/5 border-white/10" : "bg-white border-indigo-50"}`}>
          {React.cloneElement(icon, { size: 32 })}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className={`text-3xl font-bold mb-2 tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>{title}</h3>
          <p className={`text-base leading-relaxed mb-8 max-w-xl font-medium ${isDark ? "text-gray-400" : "text-slate-500"}`}>{desc}</p>
          <div className="w-full">{action}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;