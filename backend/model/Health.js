const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema(
  {
    userId: String,

    sleepHours: Number,
    sleepQuality: Number,
    stressLevel: Number,
    energyLevel: Number,
    focusLevel: Number,

    activityLevel: String,
    waterIntake: Number,
    screenTimeHours: Number,
    socialInteractionLevel: String,

    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Health", healthSchema);