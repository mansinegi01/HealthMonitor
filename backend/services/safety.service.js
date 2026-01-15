module.exports = function assessRisk(text) {
  const dangerWords = [
    "want to die",
    "kill myself",
    "end my life",
    "hurt myself"
  ];

  const t = text.toLowerCase();
  return dangerWords.some(w => t.includes(w)) ? "high" : "low";
};
