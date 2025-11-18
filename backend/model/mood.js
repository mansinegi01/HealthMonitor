const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  mood: {
    type: String,
    enum: ["happy", "sad", "neutral", "anxious", "stressed"],
    required: true,
  }
});

module.exports = mongoose.model("Mood", MoodSchema);
