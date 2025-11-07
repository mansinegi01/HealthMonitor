const mongoose = require('mongoose');

const userHealthSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // optional for now
    },
    weight: {
      type: Number, // in kg
      required: false,
    },
    heartRate: {
      type: Number, // bpm
      required: false,
    },
    systolic: {
      type: Number, // BP upper
      required: false,
    },
    diastolic: {
      type: Number, // BP lower
      required: false,
    },
    glucose: {
      type: Number, // mg/dL
      required: false,
    },
    waterIntake: {
      type: Number, // liters
      required: false,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const UserHealth = mongoose.model("UserHealth", userHealthSchema);
module.exports = UserHealth;
