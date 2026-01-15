module.exports = function buildReply({ emotion, mode }) {
  const shortReplies = {
    sad: "I hear you. You’re not alone, and I’m here with you.",
    anxiety: "It’s okay to feel anxious. Let’s take this one step at a time.",
    anger: "That sounds frustrating. Your feelings are valid.",
    happy: "I’m really glad to hear that.",
    neutral: "I’m listening. Tell me more."
  };

  const longReplies = {
    sad: "Feeling sad can be heavy, and it’s completely okay to feel this way. You don’t have to go through it alone.",
    anxiety: "Anxiety can feel overwhelming, but you are stronger than you think. Let’s focus on what you can control right now.",
    anger: "Anger often comes from feeling unheard. Your emotions make sense, and it’s okay to express them.",
    happy: "That’s wonderful to hear. Moments like these matter.",
    neutral: "I’m here and ready to listen whenever you want to share."
  };

  return mode === "avatar"
    ? shortReplies[emotion]
    : longReplies[emotion];
};
