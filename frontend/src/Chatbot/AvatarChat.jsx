import React,{ useState } from "react";
import axios from "axios";
import Avatar from "./Avatar";

export default function AvatarChat() {
  const [emotion, setEmotion] = useState("neutral");
  const [reply, setReply] = useState("");
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const res = await axios.post("/api/chatbot/message", {
      message: input,
      mode: "avatar"
    });

    setEmotion(res.data.emotion);
    setReply(res.data.reply);
    setInput("");
  };

  return (
    <div>
      <Avatar emotion={emotion} />
      <p>{reply}</p>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Tell me how you feel..."
      />
      <button onClick={sendMessage}>Speak</button>
    </div>
  );
}
