const mongoose = require("mongoose");

const gratitudeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: { type: String, required: true },
    entry: { type: String, required: true, trim: true },
    sentiment: {
      score: { type: Number, min: 0, max: 1, default: 0 },   // 0-1 positivity
      label: {
        type: String,
        enum: ["very_positive", "positive", "neutral", "negative", "very_negative"],
        default: "neutral",
      },
    },
    mood: { type: String, default: "✨" },
    streak: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Index for fast per-user lookups
gratitudeSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model("Gratitude", gratitudeSchema);