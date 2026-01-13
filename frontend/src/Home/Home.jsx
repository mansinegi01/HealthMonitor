
import { useLocation, useNavigate, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import {
  MessageCircle,
  Activity,
  FileText,
  Users,
} from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import bg from "../assets/yoga-544970_1280.webp";

function Home() {
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

  // ==========================================
  // SAVE MOOD TO BACKEND (DAILY CHECK-IN)
  // ==========================================
  const saveDailyMood = async (feeling) => {
    try {
      const moodMap = {
        "Happy 😊": "happy",
        "Excited 🤩": "happy",
        "Good 🙂": "good",
        "Tired 😴": "tired",
        "Sad 😢": "sad",
        "Anxious 😟": "anxious",
      };

      await axios.post("/api/mood/add", {
        userId: user?._id,
        mood: moodMap[feeling],
      });

      console.log("Mood saved:", moodMap[feeling]);
    } catch (err) {
      console.error("Error saving mood:", err);
    }
  };

  const handleFeelingClick = async (feeling) => {
    setHighlightNotes(false);
    setHighlightTherapy(false);

    // Save today's mood to the database
    await saveDailyMood(feeling);

    let popupText = "";

    if (["Happy 😊", "Excited 🤩", "Good 🙂"].includes(feeling)) {
      setHighlightNotes(true);
      popupText = "📝 Write your emotions and thoughts!";
    } else {
      setHighlightTherapy(true);
      const quotes = motivationalQuotesByMood[feeling];
      popupText = `${quotes[Math.floor(Math.random() * quotes.length)]} 💚 Take therapy 🌿`;
    }

    setPopupMessage(popupText);
    setShowPopup(true);

    // Hide popup + reset highlights
    setTimeout(() => setShowPopup(false), 3000);
    setTimeout(() => {
      setHighlightNotes(false);
      setHighlightTherapy(false);
    }, 3000);
  };

  const handleMoodSelect = (mood) => {
    navigate("/notes", { state: { mood } });
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center text-gray-900 overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-blue-50/70 to-indigo-50/60 backdrop-blur-sm"></div>

      {/* Popup Message */}
      {showPopup && (
        <div className="fixed top-24 bg-green-500 text-white px-8 py-3 rounded-full shadow-lg text-center animate-bounce z-50">
          {popupMessage}
        </div>
      )}

      {/* Content */}
      <div className="z-10 mt-24 w-full max-w-md px-6 flex flex-col items-center gap-8 pb-20">
        {/* Greeting */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-700">
            Hello, {user?.name || "Guest"} 👋
          </h1>
          <p className="text-gray-600 mt-2 text-lg">How are you feeling today?</p>
        </div>

        {/* Mood Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {feelings.map((feeling, index) => (
            <button
              key={index}
              onClick={() => handleFeelingClick(feeling)}
              className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transform transition-all duration-300 text-sm"
            >
              {feeling}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5 mt-8 w-full items-center">
          {/* Quick Actions */}
          <div className="bg-white/90 w-full p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-center">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              ⚡ Quick Actions
            </h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/playGames" className="text-indigo-600 hover:underline">
                🎮 Play Games
              </Link>
              <Link to="/reports" className="text-indigo-600 hover:underline">
                📊 View Reports
              </Link>
            </div>
          </div>

          {/* Wellness Notes */}
          <div
            className={`bg-white/90 w-full p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-center ${
              highlightNotes ? "scale-110 border-indigo-400" : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              📝 Wellness Notes
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Reflect on your emotions — note how you feel 💫
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleMoodSelect("good")}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-2 rounded-xl shadow hover:scale-105 transition-transform text-sm"
              >
                😄 Feeling Good
              </button>

              <button
                onClick={() => handleMoodSelect("sad")}
                className="bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold py-2 rounded-xl shadow hover:scale-105 transition-transform text-sm"
              >
                😔 Not Feeling Good
              </button>
            </div>
          </div>

          {/* Workout Videos */}
          <div className="bg-white/90 w-full p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-center">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              🏋️ Workout Videos
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Boost your mood with fitness & yoga 💪
            </p>
            <button
              onClick={() => navigate("/workout")}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-6 rounded-full hover:scale-105 transition-transform text-sm"
            >
              Watch Now
            </button>
          </div>

          {/* Therapy Section */}
          <div
            className={`bg-white/90 w-full p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-center ${
              highlightTherapy ? "scale-110 border-indigo-400" : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">🧠 Therapy</h3>
            <p className="text-gray-500 text-sm mb-4">
              Relax your mind and uplift your mood while working 🌿
            </p>
            <button
              onClick={() => navigate("/therapy")}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-6 rounded-full hover:scale-105 transition-transform text-sm"
            >
              Explore Therapy
            </button>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-5 right-5 flex flex-col gap-4 z-50">

        {/* Chatbot */}
        <div className="relative group">
          <button
            onClick={() => navigate("/chatbot")}
            className="bg-indigo-500 p-3 rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
          >
            <MessageCircle size={22} className="text-white" />
          </button>
          <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all">
            Chat with AI
          </span>
        </div>

        {/* Community */}
        <div className="relative group">
          <button
            onClick={() => navigate("/community")}
            className="bg-pink-500 p-3 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
          >
            <Users size={22} className="text-white" />
          </button>
          <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-pink-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all">
            Community 💬
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
