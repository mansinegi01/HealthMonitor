import React from "react";
export default function ModeSelector({ setMode }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>How would you like to talk?</h2>

      <button onClick={() => setMode("avatar")}>
        🎥 Talk to AI Character
      </button>

      <button onClick={() => setMode("text")}>
        💬 Chat via Text
      </button>
    </div>
  );
}
