import React from "react";
export default function Avatar({ emotion }) {
  return (
    <div style={{ fontSize: "80px", textAlign: "center" }}>
      {emotion === "happy" && "😊"}
      {emotion === "sad" && "😔"}
      {emotion === "anxiety" && "😟"}
      {emotion === "anger" && "😠"}
      {emotion === "neutral" && "🙂"}
    </div>
  );
}
