import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DisplayNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/notes/getNotes");
        setNotes(res.data || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">📖 All Saved Notes</h1>

      {/* Loading & Error States */}
      {loading && <p className="text-gray-700">Loading your notes...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Notes List */}
      {!loading && !error && notes.length === 0 && (
        <p className="text-gray-600">No notes found. Start writing one! 📝</p>
      )}

      <div className="grid gap-4 mt-6 w-full max-w-3xl">
        {notes.map((note, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl shadow-md transition-transform transform hover:scale-[1.02] ${
              note.type === "good"
                ? "bg-green-100 border-l-4 border-green-500"
                : "bg-red-100 border-l-4 border-red-500"
            }`}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{note.Subject}</h3>
            <p className="text-gray-700 mb-3">{note.Note}</p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Type:{" "}
                <span
                  className={`font-semibold ${
                    note.type === "good" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {note.type.toUpperCase()}
                </span>
              </span>
              <span>
                {new Date(note.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-10 flex gap-4">
        <button
          onClick={() => navigate("/home")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-all shadow-md"
        >
          ⬅️ Back to Home
        </button>

        <button
          onClick={() => navigate("/notes")}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-all shadow-md"
        >
          ➕ Add New Note
        </button>
      </div>
    </div>
  );
}

export default DisplayNotes;
