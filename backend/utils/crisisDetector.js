// const HIGH_RISK_PHRASES = [
//   "kill myself",
//   "end my life",
//   "suicide",
//   "don't want to live",
//   "want to die",
//   "hurt myself",
//   "self harm",
//   "no reason to live",
//   "goodbye forever",
//   "life is meaningless"
// ];

// const MODERATE_RISK_PHRASES = [
//   "i can't go on",
//   "i feel hopeless",
//   "everything is pointless",
//   "i hate my life",
//   "i am tired of living"
// ];

// function detectCrisis(text) {
//   const lowerText = text.toLowerCase();

//   let riskLevel = "none";

//   for (let phrase of HIGH_RISK_PHRASES) {
//     if (lowerText.includes(phrase)) {
//       riskLevel = "high";
//       break;
//     }
//   }

//   if (riskLevel !== "high") {
//     for (let phrase of MODERATE_RISK_PHRASES) {
//       if (lowerText.includes(phrase)) {
//         riskLevel = "moderate";
//         break;
//       }
//     }
//   }

//   return riskLevel;
// }

// module.exports = { detectCrisis };
const crisisPatterns = [
  /suicide/i,
  /kill myself/i,
  /end my life/i,
  /self[\s-]?harm/i,
  /i want to die/i,
  /cut myself/i,
  /overdose/i,
  /no reason to live/i,
  /what'?s the point of living/i,
  /can't go on/i,
  /i am done with everything/i
];

function detectCrisis(message) {
  if (!message) return { isCrisis: false };

  const normalized = message.trim();

  let score = 0;

  crisisPatterns.forEach(pattern => {
    if (pattern.test(normalized)) {
      score += 1;
    }
  });

  return {
    isCrisis: score > 0,
    score
  };
}

module.exports = { detectCrisis };
