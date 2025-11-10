
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Notes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [subject, setSubject] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const mood = location.state?.mood || "good";
  const borderColor = mood === "sad" ? "border-red-500" : "border-green-500";

  const motivationalMessages = [
    "Keep going — even small progress matters 🌿",
    "You’re doing better than you think 💫",
    "Reflecting is healing — you’re growing 🌱",
    "Your words shape your mindset. Keep writing ✨",
  ];

  const handleNoteSubmit = async () => {
    if (!subject || !note) {
      alert("Please fill both Subject and Note 📘");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please log in first");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8000/api/notes/setNotes",
        {
          Subject: subject,
          Note: note,
          type: mood,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const randomMsg =
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ];
      setMessage(randomMsg);

      setTimeout(() => {
        navigate("/home", { state: { msg: randomMsg } });
      }, 1500);
    } catch (err) {
      console.error("Error saving note:", err.response || err.message);
      if (err.response?.status === 401) {
        alert("Session expired, please log in again 🔒");
        navigate("/login");
      } else {
        setMessage("Something went wrong! Please try again ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 to-white p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">📝 Write Your Note</h1>

      <h2 className="text-lg font-semibold text-center mb-4">
        Mood:{" "}
        <span className={mood === "sad" ? "text-red-500" : "text-green-500"}>
          {mood === "sad" ? "Feeling Low 😔" : "Feeling Good 😊"}
        </span>
      </h2>

      <div
        className={`bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg border-4 ${borderColor}`}
      >
        <label className="block text-gray-700 font-semibold mb-2">Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Enter your note subject..."
        />

        <label className="block text-gray-700 font-semibold mb-2">Your Note:</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="6"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Write your thoughts here..."
        ></textarea>

        <button
          onClick={handleNoteSubmit}
          disabled={loading}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-transform hover:scale-105 shadow-md"
        >
          {loading ? "Saving..." : "Save Note"}
        </button>

        <button
          onClick={() => navigate("/displayNotes")}
          className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-transform hover:scale-105 shadow-md"
        >
          📚 View All Notes
        </button>

        <button
          onClick={() => navigate("/home")}
          className="mt-4 w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition-transform hover:scale-105 shadow-md"
        >
          ⬅️ Back to Home
        </button>
      </div>

      {message && !loading && (
        <div className="mt-8 bg-indigo-500 text-white px-6 py-3 rounded-xl shadow-lg text-center animate-bounce max-w-md">
          {message}
        </div>
      )}
    </div>
  );
}

export default Notes;
