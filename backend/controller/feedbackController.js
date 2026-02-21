const Feedback = require("../model/feedback");

async function submitFeedback(req, res) {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json({ message: "Feedback stored successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to store feedback" });
  }
}

module.exports = { submitFeedback };