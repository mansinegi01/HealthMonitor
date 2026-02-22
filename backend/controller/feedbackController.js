const Feedback = require("../model/feedback");

// async function submitFeedback(req, res) {
//   try {
//     const feedback = await Feedback.create(req.body);
//     res.status(201).json({ message: "Feedback stored successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to store feedback" });
//   }
// }

async function submitFeedback(req, res) {
  try {
    if (!req.body.sessionId) {
      return res.status(400).json({ error: "Session ID is required to submit feedback." });
    }
    const feedback = await Feedback.create(req.body);
    res.status(201).json({ message: "Feedback stored successfully" });
  } catch (error) {
    console.error("Feedback Error:", error); // Log the actual error for debugging
    res.status(500).json({ error: "Failed to store feedback" });
  }
}
module.exports = { submitFeedback };