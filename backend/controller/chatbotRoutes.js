const detectEmotion = require("../services/emotion.service");
const assessRisk = require("../services/safety.service");
const buildReply = require("../services/reply.service");

exports.handleChat = async (req, res) => {
  const { message, mode } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  const riskLevel = assessRisk(message);

  if (riskLevel === "high") {
    return res.json({
      emotion: "distress",
      riskLevel,
      reply:
        "I’m really glad you told me this. You deserve immediate support. Please reach out to a trusted person or a mental-health professional right now."
    });
  }

  const emotion = detectEmotion(message);
  const reply = buildReply({ emotion, mode });

  res.json({
    emotion,
    riskLevel,
    reply
  });
};
