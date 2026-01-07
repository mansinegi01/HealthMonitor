const mongoose = require("mongoose");

const userHealthSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Mental & Lifestyle
    sleepHours: Number,
    sleepQuality: Number,        // 1–5
    stressLevel: Number,         // 1–5
    energyLevel: Number,         // 1–5
    focusLevel: Number,          // 1–5

    activityLevel: {
      type: String,
      enum: ["none", "low", "moderate", "high"],
    },

    waterIntake: Number,         // liters/day
    screenTimeHours: Number,

    socialInteractionLevel: {
      type: String,
      enum: ["low", "medium", "high"],
    },

    // Reflection
    notes: String,
  },
  { timestamps: true } 
);

module.exports = mongoose.model("UserHealth", userHealthSchema);
