const HIGH_RISK_PHRASES = [
  "kill myself",
  "end my life",
  "suicide",
  "don't want to live",
  "want to die",
  "hurt myself",
  "self harm",
  "no reason to live",
  "goodbye forever",
  "life is meaningless"
];

const MODERATE_RISK_PHRASES = [
  "i can't go on",
  "i feel hopeless",
  "everything is pointless",
  "i hate my life",
  "i am tired of living"
];

function detectCrisis(text) {
  const lowerText = text.toLowerCase();

  let riskLevel = "none";

  for (let phrase of HIGH_RISK_PHRASES) {
    if (lowerText.includes(phrase)) {
      riskLevel = "high";
      break;
    }
  }

  if (riskLevel !== "high") {
    for (let phrase of MODERATE_RISK_PHRASES) {
      if (lowerText.includes(phrase)) {
        riskLevel = "moderate";
        break;
      }
    }
  }

  return riskLevel;
}

module.exports = { detectCrisis };
