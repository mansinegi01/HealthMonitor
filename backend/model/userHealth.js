
const mongoose = require('mongoose');

const userHealthSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weight: Number,
    height: Number,
    heartRate: Number,
    bloodPressure: {
      systolic: Number,
      diastolic: Number,
    },
    activityLevel: String,
    waterIntake: Number,
    sleepHours: Number,
    glucose: Number,
    notes: String,
  },
  { timestamps: true }
);

const UserHealth = mongoose.model("UserHealth", userHealthSchema);
module.exports = UserHealth;
