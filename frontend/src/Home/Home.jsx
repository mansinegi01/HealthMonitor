
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Activity, Heart, Moon, Utensils, FileText } from "lucide-react";

function Home() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const user = location.state?.user;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [dailyMoodData, setDailyMoodData] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const chatEndRef = useRef(null);

  const moodValueMap = {
    "Happy 😊": 5,
    "Excited 🤩": 4,
    "Good 🙂": 3,
    "Tired 😴": 2,
    "Sad 😢": 1,
    "Anxious 😟": 0,
  };

  const feelings = ["Happy 😊", "Excited 🤩", "Good 🙂", "Tired 😴", "Sad 😢", "Anxious 😟"];

  const motivationalQuotesByMood = {
    "Tired 😴": [
      "Rest when you need to, but don’t quit. 🌙",
      "Even slow progress is progress. 💪",
      "Your body achieves what your mind believes. 🧘‍♀️",
      "Energy flows where focus goes. ✨",
    ],
    "Sad 😢": [
      "Every day may not be good, but there’s something good in every day. 💖",
      "You’ve survived 100% of your bad days so far. 🌈",
      "It’s okay to not be okay — better days are coming. ☀️",
      "You are stronger than you feel right now. 💫",
    ],
    "Anxious 😟": [
      "Breathe. You’ve got this. 🌿",
      "Peace begins with one deep breath. 🌸",
      "Don’t believe everything you think. 🧠",
      "You are safe, calm, and in control. 🌤️",
    ],
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const handleFeelingClick = (feeling) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "short" });
    const newEntry = { day: today, mood: moodValueMap[feeling] || 3 };

    setDailyMoodData((prev) => {
      const filtered = prev.filter((item) => item.day !== today);
      return [...filtered, newEntry];
    });

    let popupText = "";

    if (["Happy 😊", "Excited 🤩", "Good 🙂"].includes(feeling)) {
      popupText = "Nice! Let’s move forward 😄";
    } else {
      const quotes = motivationalQuotesByMood[feeling];
      popupText = quotes[Math.floor(Math.random() * quotes.length)];
    }

    setPopupMessage(popupText);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);

    setMessages((prev) => [...prev, { type: "user", text: feeling }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: `You logged "${feeling}" for today.` },
      ]);
    }, 500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: "Thanks for sharing! 😊" }]);
    }, 500);
    setInput("");
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
        <div className="fixed top-24 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg text-center animate-bounce z-50">
          {popupMessage}
        </div>
      )}

      {/* Card Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 max-w-5xl justify-center items-stretch">
        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between min-h-[250px]">
          <h3 className="text-xl font-bold mb-3">⚡ Quick Actions</h3>
          <div className="flex flex-col space-y-3">
            <button className="flex items-center gap-2 hover:underline">
              <Activity size={18} /> Track Activity
            </button>
            <button className="flex items-center gap-2 hover:underline">
              <FileText size={18} /> View Reports
            </button>
            <button className="flex items-center gap-2 hover:underline">
              <Utensils size={18} /> Diet Plans
            </button>
          </div>
        </div>

        {/* Wellness Notes */}
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between min-h-[280px]">
          <div>
            <h3 className="text-xl font-bold mb-3">📝 Wellness Notes</h3>
            <p className="text-sm text-pink-100 mb-4">
              Reflect on your emotions — note how you feel and see your growth 💫
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              className="bg-white text-pink-600 font-semibold py-2 rounded-xl hover:bg-pink-100 transition-transform transform hover:scale-105 shadow-md"
              onClick={() => navigate("/notes")}
            >
              🌈 How was today?
            </button>
           
            
          </div>
        </div>

        {/* Workout Videos */}
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between min-h-[250px]">
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
      </div>

      {/* Chatbot */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-indigo-500 p-4 rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
        >
          <MessageCircle size={28} className="text-white" />
        </button>
      </div>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-5 w-80 md:w-96 bg-gray-900 text-white rounded-t-lg shadow-2xl flex flex-col">
          <div className="h-64 overflow-y-auto p-4 flex flex-col gap-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-lg max-w-[80%] ${
                  msg.type === "user" ? "bg-blue-500 self-end" : "bg-gray-700 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="flex p-2 gap-2 bg-gray-800 rounded-b-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
