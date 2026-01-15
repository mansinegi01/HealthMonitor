import React,{ useState } from "react";
import axios from "axios";

export default function TextChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    setMessages(m => [...m, { from: "user", text: input }]);

    const res = await axios.post("/api/chatbot/message", {
      message: input,
      mode: "text"
    });

    setMessages(m => [
      ...m,
      { from: "bot", text: res.data.reply }
    ]);

    setInput("");
  };

  return (
    <div>
      <div style={{ minHeight: "300px" }}>
        {messages.map((m, i) => (
          <p key={i}><b>{m.from}:</b> {m.text}</p>
        ))}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your thoughts..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
