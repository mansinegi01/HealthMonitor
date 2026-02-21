const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  empathyScore: {
    type: Number,
    min: 1,
    max: 5
  },
  helpfulnessScore: {
    type: Number,
    min: 1,
    max: 5
  },
  comfortScore: {
    type: Number,
    min: 1,
    max: 5
  },
  naturalnessScore: {
    type: Number,
    min: 1,
    max: 5
  },
  wouldReuse: Boolean
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);