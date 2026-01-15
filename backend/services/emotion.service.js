module.exports = function detectEmotion(text) {
  const t = text.toLowerCase();

  if (t.includes("sad") || t.includes("lonely")) return "sad";
  if (t.includes("anxious") || t.includes("worried")) return "anxiety";
  if (t.includes("angry") || t.includes("frustrated")) return "anger";
  if (t.includes("happy") || t.includes("good")) return "happy";

  return "neutral";
};
