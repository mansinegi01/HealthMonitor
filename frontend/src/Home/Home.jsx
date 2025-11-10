// import { useLocation, useNavigate, Link } from "react-router-dom";
// import React, { useState, useRef, useEffect, useContext } from "react";
// import {
//   MessageCircle,
//   Activity,
//   Utensils,
//   FileText,
//   Users,
// } from "lucide-react";
// import { AuthContext } from "../Context/AuthContext";

// function Home() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const [dailyMoodData, setDailyMoodData] = useState([]);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   const moodValueMap = {
//     "Happy 😊": 5,
//     "Excited 🤩": 4,
//     "Good 🙂": 3,
//     "Tired 😴": 2,
//     "Sad 😢": 1,
//     "Anxious 😟": 0,
//   };

//   const feelings = [
//     "Happy 😊",
//     "Excited 🤩",
//     "Good 🙂",
//     "Tired 😴",
//     "Sad 😢",
//     "Anxious 😟",
//   ];

//   const motivationalQuotesByMood = {
//     "Tired 😴": [
//       "Rest when you need to, but don’t quit. 🌙",
//       "Even slow progress is progress. 💪",
//       "Your body achieves what your mind believes. 🧘‍♀️",
//       "Energy flows where focus goes. ✨",
//     ],
//     "Sad 😢": [
//       "Every day may not be good, but there’s something good in every day. 💖",
//       "You’ve survived 100% of your bad days so far. 🌈",
//       "It’s okay to not be okay — better days are coming. ☀️",
//       "You are stronger than you feel right now. 💫",
//     ],
//     "Anxious 😟": [
//       "Breathe. You’ve got this. 🌿",
//       "Peace begins with one deep breath. 🌸",
//       "Don’t believe everything you think. 🧠",
//       "You are safe, calm, and in control. 🌤️",
//     ],
//   };

//   const handleFeelingClick = (feeling) => {
//     const today = new Date().toLocaleDateString("en-US", { weekday: "short" });
//     const newEntry = { day: today, mood: moodValueMap[feeling] || 3 };

//     setDailyMoodData((prev) => {
//       const filtered = prev.filter((item) => item.day !== today);
//       return [...filtered, newEntry];
//     });

//     let popupText = "";

//     if (["Happy 😊", "Excited 🤩", "Good 🙂"].includes(feeling)) {
//       popupText = "Nice! Let’s move forward 😄";
//     } else {
//       const quotes = motivationalQuotesByMood[feeling];
//       popupText = quotes[Math.floor(Math.random() * quotes.length)];
//     }

//     setPopupMessage(popupText);
//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 3000);
//   };

//   const handleMoodSelect = (mood) => {
//     navigate("/notes", { state: { mood } });
//   };

//   return (
//     <div className="p-5 mt-20 flex flex-col items-center gap-10 relative">
//       {/* Greeting */}
//       <h1 className="text-3xl font-bold text-indigo-600">
//         Hello, {user?.name || "Guest"} 👋
//       </h1>
//       <p className="text-gray-700 mb-6 text-lg">How are you feeling today?</p>

//       {/* Mood Buttons */}
//       <div className="flex flex-wrap gap-4 justify-center mb-10">
//         {feelings.map((feeling, index) => (
//           <button
//             key={index}
//             onClick={() => handleFeelingClick(feeling)}
//             className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all"
//           >
//             {feeling}
//           </button>
//         ))}
//       </div>

//       {/* Popup */}
//       {showPopup && (
//         <div className="fixed top-24 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg text-center animate-bounce z-50">
//           {popupMessage}
//         </div>
//       )}

//       {/* Card Sections */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 max-w-5xl justify-center items-stretch">
//         {/* Quick Actions */}
//         <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between min-h-[250px]">
//           <h3 className="text-xl font-bold mb-3">⚡ Quick Actions</h3>
//           <div className="flex flex-col space-y-3">
//             <Link
//               to="/playGames"
//               className="flex items-center gap-2 hover:underline"
//             >
//               <Activity size={18} /> Play Games
//             </Link>
//             <Link
//               to="/reports"
//               className="flex items-center gap-2 hover:underline"
//             >
//               <FileText size={18} /> View Reports
//             </Link>
//             <Link
//               to="/therapy"
//               className="flex items-center gap-2 hover:underline"
//             >
//               <Utensils size={18} /> Therapy
//             </Link>
//           </div>
//         </div>

//         {/* Wellness Notes */}
//         <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between">
//           <div>
//             <h3 className="text-xl font-bold mb-3">📝 Wellness Notes</h3>
//             <p className="text-sm text-pink-100 mb-4">
//               Reflect on your emotions — note how you feel and see your growth 💫
//             </p>

//             <div className="flex flex-col gap-4 mt-4">
//               <button
//                 onClick={() => handleMoodSelect("good")}
//                 className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
//               >
//                 😄 Feeling Good
//               </button>

//               <button
//                 onClick={() => handleMoodSelect("sad")}
//                 className="bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
//               >
//                 😔 Not Feeling Good
//               </button>
//             </div>
//           </div>

//           <div className="mt-6">
//             <p className="text-xs text-indigo-200">
//               Your journal entries will be saved based on your mood 🌿
//             </p>
//           </div>
//         </div>

//         {/* Workout Videos */}
//         <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between min-h-[250px]">
//           <h3 className="text-xl font-bold mb-3">🏋️ Workout Videos</h3>
//           <p className="text-sm text-green-100 mb-4">
//             Boost your mood with curated fitness and yoga sessions 💪
//           </p>

//           <div className="flex flex-col space-y-3">
//             <a
//               href="https://www.youtube.com/results?search_query=10+minute+abs+workout"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-white text-green-600 font-semibold py-2 rounded-xl text-center hover:bg-green-100 transition-transform transform hover:scale-105 shadow-md"
//             >
//               🔥 Home Workouts
//             </a>
//             <a
//               href="https://www.youtube.com/results?search_query=stretching+routine"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-white text-green-600 font-semibold py-2 rounded-xl text-center hover:bg-green-100 transition-transform transform hover:scale-105 shadow-md"
//             >
//               🧘 Yoga
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Floating Buttons */}
//       <div className="fixed bottom-5 right-5 flex flex-col gap-4 z-50">
//         {/* Chatbot Button */}
//         <div className="relative group">
//           <button
//             onClick={() => navigate("/chatbot")}
//             className="bg-indigo-500 p-4 rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
//           >
//             <MessageCircle size={28} className="text-white" />
//           </button>
//           <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-indigo-600 text-white text-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-all">
//             Chat with AI
//           </span>
//         </div>

//         {/* Community Button */}
//         <div className="relative group">
//           <button
//             onClick={() => navigate("/community")}
//             className="bg-pink-500 p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
//           >
//             <Users size={28} className="text-white" />
//           </button>
//           <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-pink-600 text-white text-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
//             Share feelings with others 💬
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import React, { useState, useRef, useEffect, useContext } from "react";
// import {
//   MessageCircle,
//   Activity,
//   Utensils,
//   FileText,
//   Users,
//   Heart,
// } from "lucide-react";
// import { AuthContext } from "../Context/AuthContext";

// function Home() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const [dailyMoodData, setDailyMoodData] = useState([]);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   const moodValueMap = {
//     "Happy 😊": 5,
//     "Excited 🤩": 4,
//     "Good 🙂": 3,
//     "Tired 😴": 2,
//     "Sad 😢": 1,
//     "Anxious 😟": 0,
//   };

//   const feelings = [
//     "Happy 😊",
//     "Excited 🤩",
//     "Good 🙂",
//     "Tired 😴",
//     "Sad 😢",
//     "Anxious 😟",
//   ];

//   const motivationalQuotesByMood = {
//     "Tired 😴": [
//       "Rest when you need to, but don’t quit. 🌙",
//       "Even slow progress is progress. 💪",
//       "Your body achieves what your mind believes. 🧘‍♀️",
//       "Energy flows where focus goes. ✨",
//     ],
//     "Sad 😢": [
//       "Every day may not be good, but there’s something good in every day. 💖",
//       "You’ve survived 100% of your bad days so far. 🌈",
//       "It’s okay to not be okay — better days are coming. ☀️",
//       "You are stronger than you feel right now. 💫",
//     ],
//     "Anxious 😟": [
//       "Breathe. You’ve got this. 🌿",
//       "Peace begins with one deep breath. 🌸",
//       "Don’t believe everything you think. 🧠",
//       "You are safe, calm, and in control. 🌤️",
//     ],
//   };

//   const handleFeelingClick = (feeling) => {
//     const today = new Date().toLocaleDateString("en-US", { weekday: "short" });
//     const newEntry = { day: today, mood: moodValueMap[feeling] || 3 };

//     setDailyMoodData((prev) => {
//       const filtered = prev.filter((item) => item.day !== today);
//       return [...filtered, newEntry];
//     });

//     let popupText = "";

//     if (["Happy 😊", "Excited 🤩", "Good 🙂"].includes(feeling)) {
//       popupText = "Nice! Let’s move forward 😄";
//     } else {
//       const quotes = motivationalQuotesByMood[feeling];
//       popupText = quotes[Math.floor(Math.random() * quotes.length)];
//     }

//     setPopupMessage(popupText);
//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 3000);
//   };

//   const handleMoodSelect = (mood) => {
//     navigate("/notes", { state: { mood } });
//   };

//   return (
//     <div className="p-5 mt-20 flex flex-col items-center gap-10 relative">
//       {/* Greeting */}
//       <h1 className="text-3xl font-bold text-indigo-600">
//         Hello, {user?.name || "Guest"} 👋
//       </h1>
//       <p className="text-gray-700 mb-6 text-lg">How are you feeling today?</p>

//       {/* Mood Buttons */}
//       <div className="flex flex-wrap gap-4 justify-center mb-10">
//         {feelings.map((feeling, index) => (
//           <button
//             key={index}
//             onClick={() => handleFeelingClick(feeling)}
//             className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all"
//           >
//             {feeling}
//           </button>
//         ))}
//       </div>

//       {/* Popup */}
//       {showPopup && (
//         <div className="fixed top-24 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg text-center animate-bounce z-50">
//           {popupMessage}
//         </div>
//       )}

//       {/* Card Sections */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 max-w-5xl justify-center items-stretch">
//         {/* Quick Actions */}
//         <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between min-h-[250px]">
//           <h3 className="text-xl font-bold mb-3">⚡ Quick Actions</h3>
//           <div className="flex flex-col space-y-3">
//             <Link
//               to="/playGames"
//               className="flex items-center gap-2 hover:underline"
//             >
//               <Activity size={18} /> Play Games
//             </Link>
//             <Link
//               to="/reports"
//               className="flex items-center gap-2 hover:underline"
//             >
//               <FileText size={18} /> View Reports
//             </Link>
//             <Link
//               to="/therapy"
//               className="flex items-center gap-2 hover:underline"
//             >
//               <Utensils size={18} /> Therapy
//             </Link>
//           </div>
//         </div>

//         {/* Wellness Notes */}
//         <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between">
//           <div>
//             <h3 className="text-xl font-bold mb-3">📝 Wellness Notes</h3>
//             <p className="text-sm text-pink-100 mb-4">
//               Reflect on your emotions — note how you feel and see your growth 💫
//             </p>

//             <div className="flex flex-col gap-4 mt-4">
//               <button
//                 onClick={() => handleMoodSelect("good")}
//                 className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
//               >
//                 😄 Feeling Good
//               </button>

//               <button
//                 onClick={() => handleMoodSelect("sad")}
//                 className="bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
//               >
//                 😔 Not Feeling Good
//               </button>
//             </div>
//           </div>

//           <div className="mt-6">
//             <p className="text-xs text-indigo-200">
//               Your journal entries will be saved based on your mood 🌿
//             </p>
//           </div>
//         </div>

//         {/* Workout Videos */}
//         <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between min-h-[250px]">
//           <h3 className="text-xl font-bold mb-3">🏋️ Workout Videos</h3>
//           <p className="text-sm text-green-100 mb-4">
//             Boost your mood with curated fitness and yoga sessions 💪
//           </p>

//           <div className="flex flex-col space-y-3">
//             <a
//               href="https://www.youtube.com/results?search_query=10+minute+abs+workout"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-white text-green-600 font-semibold py-2 rounded-xl text-center hover:bg-green-100 transition-transform transform hover:scale-105 shadow-md"
//             >
//               🔥 Home Workouts
//             </a>
//             <a
//               href="https://www.youtube.com/results?search_query=stretching+routine"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-white text-green-600 font-semibold py-2 rounded-xl text-center hover:bg-green-100 transition-transform transform hover:scale-105 shadow-md"
//             >
//               🧘 Yoga
//             </a>
//           </div>
//         </div>

//         {/* 🧠 Therapy Section */}
//         {/* 🧠 Therapy Section */}
// <div className="col-span-full flex justify-center mt-6">
//   <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
//     <h3 className="text-2xl font-bold mb-4">🧠 Therapy</h3>
//     <p className="text-sm text-blue-100 mb-6">
//       Discover ways to relax your mind and uplift your mood through various therapy options 🌿
//     </p>

//     <button
//       onClick={() => navigate("/therapy")}
//       className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-full hover:bg-blue-100 transition-transform transform hover:scale-105 shadow-md"
//     >
//       Explore Therapy
//     </button>
//   </div>
// </div>
//       </div>

//       {/* Floating Buttons */}
//       <div className="fixed bottom-5 right-5 flex flex-col gap-4 z-50">
//         {/* Chatbot Button */}
//         <div className="relative group">
//           <button
//             onClick={() => navigate("/chatbot")}
//             className="bg-indigo-500 p-4 rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
//           >
//             <MessageCircle size={28} className="text-white" />
//           </button>
//           <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-indigo-600 text-white text-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-all">
//             Chat with AI
//           </span>
//         </div>

//         {/* Community Button */}
//         <div className="relative group">
//           <button
//             onClick={() => navigate("/community")}
//             className="bg-pink-500 p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
//           >
//             <Users size={28} className="text-white" />
//           </button>
//           <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-pink-600 text-white text-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
//             Share feelings with others 💬
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
import { useLocation, useNavigate, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import {
  MessageCircle,
  Activity,
  Utensils,
  FileText,
  Users,
} from "lucide-react";
import { AuthContext } from "../Context/AuthContext";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [highlightNotes, setHighlightNotes] = useState(false);
  const [highlightTherapy, setHighlightTherapy] = useState(false);

  const feelings = [
    "Happy 😊",
    "Excited 🤩",
    "Good 🙂",
    "Tired 😴",
    "Sad 😢",
    "Anxious 😟",
  ];

  const motivationalQuotesByMood = {
    "Tired 😴": [
      "Rest when you need to, but don’t quit. 🌙",
      "Even slow progress is progress. 💪",
    ],
    "Sad 😢": [
      "It’s okay to not be okay — better days are coming. ☀️",
      "You are stronger than you feel right now. 💫",
    ],
    "Anxious 😟": [
      "Breathe. You’ve got this. 🌿",
      "Peace begins with one deep breath. 🌸",
    ],
  };

  const handleFeelingClick = (feeling) => {
    // reset highlights
    setHighlightNotes(false);
    setHighlightTherapy(false);

    let popupText = "";

    if (["Happy 😊", "Excited 🤩", "Good 🙂"].includes(feeling)) {
      setHighlightNotes(true);
      popupText = "📝 Write your emotions and thoughts!";
    } else {
      setHighlightTherapy(true);
      const quotes = motivationalQuotesByMood[feeling];
      popupText = `${quotes[Math.floor(Math.random() * quotes.length)]} 💚 Take therapy 🌿`;
    }

    // Show popup for 3s
    setPopupMessage(popupText);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);

    // Remove highlight after 3s
    setTimeout(() => {
      setHighlightNotes(false);
      setHighlightTherapy(false);
    }, 3000);
  };

  const handleMoodSelect = (mood) => {
    navigate("/notes", { state: { mood } });
  };

  return (
    <div className="p-5 mt-20 flex flex-col items-center gap-10 relative">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-indigo-600">
        Hello, {user?.name || "Guest"} 👋
      </h1>
      <p className="text-gray-700 mb-6 text-lg">How are you feeling today?</p>

      {/* Mood Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {feelings.map((feeling, index) => (
          <button
            key={index}
            onClick={() => handleFeelingClick(feeling)}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all"
          >
            {feeling}
          </button>
        ))}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-24 bg-green-500 text-white px-8 py-4 rounded-full shadow-lg text-center animate-bounce z-50">
          {popupMessage}
        </div>
      )}

      {/* Card Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 max-w-5xl justify-center items-stretch">
        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between min-h-[250px] transition-transform duration-500">
          <h3 className="text-xl font-bold mb-3">⚡ Quick Actions</h3>
          <div className="flex flex-col space-y-3">
            <Link
              to="/playGames"
              className="flex items-center gap-2 hover:underline"
            >
              <Activity size={18} /> Play Games
            </Link>
            <Link
              to="/reports"
              className="flex items-center gap-2 hover:underline"
            >
              <FileText size={18} /> View Reports
            </Link>
            
          </div>
        </div>

        {/* Wellness Notes */}
        <div
          className={`bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between transition-transform duration-500 ${
            highlightNotes ? "scale-105 shadow-2xl" : "scale-100"
          }`}
        >
          <div>
            <h3 className="text-xl font-bold mb-3">📝 Wellness Notes</h3>
            <p className="text-sm text-pink-100 mb-4">
              Reflect on your emotions — note how you feel and see your growth 💫
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <button
                onClick={() => handleMoodSelect("good")}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
              >
                😄 Feeling Good
              </button>

              <button
                onClick={() => handleMoodSelect("sad")}
                className="bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
              >
                😔 Not Feeling Good
              </button>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-indigo-200">
              Your journal entries will be saved based on your mood 🌿
            </p>
          </div>
        </div>

        {/* Workout Videos */}
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between min-h-[250px] transition-transform duration-500">
          <h3 className="text-xl font-bold mb-3">🏋️ Workout Videos</h3>
          <p className="text-sm text-green-100 mb-4">
            Boost your mood with curated fitness and yoga sessions 💪
          </p>

          <div className="flex flex-col space-y-3">
            <a
              href="https://www.youtube.com/results?search_query=10+minute+abs+workout"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 font-semibold py-2 rounded-xl text-center hover:bg-green-100 transition-transform transform hover:scale-105 shadow-md"
            >
              🔥 Home Workouts
            </a>
            <a
              href="https://www.youtube.com/results?search_query=stretching+routine"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 font-semibold py-2 rounded-xl text-center hover:bg-green-100 transition-transform transform hover:scale-105 shadow-md"
            >
              🧘 Yoga
            </a>
          </div>
        </div>

        {/* 🧠 Therapy Section */}
        <div
          className={`col-span-full flex justify-center mt-6 transition-transform duration-500 ${
            highlightTherapy ? "scale-105 shadow-2xl" : "scale-100"
          }`}
        >
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
            <h3 className="text-2xl font-bold mb-4">🧠 Therapy</h3>
            <p className="text-sm text-blue-100 mb-6">
              Discover ways to relax your mind and uplift your mood through various therapy options 🌿
            </p>

            <button
              onClick={() => navigate("/therapy")}
              className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-full hover:bg-blue-100 transition-transform transform hover:scale-105 shadow-md"
            >
              Explore Therapy
            </button>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-5 right-5 flex flex-col gap-4 z-50">
        {/* Chatbot Button */}
        <div className="relative group">
          <button
            onClick={() => navigate("/chatbot")}
            className="bg-indigo-500 p-4 rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
          >
            <MessageCircle size={28} className="text-white" />
          </button>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-indigo-600 text-white text-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-all">
            Chat with AI
          </span>
        </div>

        {/* Community Button */}
        <div className="relative group">
          <button
            onClick={() => navigate("/community")}
            className="bg-pink-500 p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
          >
            <Users size={28} className="text-white" />
          </button>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-pink-600 text-white text-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
            Share feelings with others 💬
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
