import { useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Home() {
  const location = useLocation();
  const user = location.state?.user;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [dailyMoodData, setDailyMoodData] = useState([]); // stores moods over days

  const chatEndRef = useRef(null);

  // Map moods to numeric values
  const moodValueMap = {
    "Happy 😊": 5,
    "Excited 🤩": 4,
    "Good 🙂": 3,
    "Tired 😴": 2,
    "Sad 😢": 1,
    "Anxious 😟": 0,
  };

  // Predefined feelings
  const feelings = ["Happy 😊", "Excited 🤩", "Good 🙂", "Tired 😴", "Sad 😢", "Anxious 😟"];

  // Scroll chatbot to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  // When user selects mood
  const handleFeelingClick = (feeling) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue, etc.
    const newEntry = { day: today, mood: moodValueMap[feeling] || 3 };

    setDailyMoodData((prev) => {
      // Replace existing entry for today if exists
      const filtered = prev.filter((item) => item.day !== today);
      return [...filtered, newEntry];
    });

    // Chatbot message
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
    <div className="p-5 mt-20 flex flex-col items-center gap-8">
      {/* Greeting */}
      <h1 className="text-3xl font-bold">Hello, {user?.name || "Guest"}!</h1>
      <p className="text-gray-700 mb-6">How are you feeling today?</p>

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

      {/* Single Line Chart for Daily Mood */}
      {dailyMoodData.length > 0 && (
        <div className="w-full max-w-xl bg-white p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Your Daily Mood</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyMoodData.sort((a, b) => a.day.localeCompare(b.day))}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="mood" stroke="#6366F1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Chatbot Toggle */}
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
