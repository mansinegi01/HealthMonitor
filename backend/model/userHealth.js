const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a separate User model
      required: true,
    },
    weight: {
      type: Number, // in kg
      required: false,
    },
    heartRate: {
      type: Number, // in beats per minute
      required: false,
    },
    systolic: {
      type: Number, // upper blood pressure reading
      required: false,
    },
    diastolic: {
      type: Number, // lower blood pressure reading
      required: false,
    },
    glucose: {
      type: Number, // in mg/dL
      required: false,
    },
    waterIntake: {
      type: Number, // in liters
      required: false,
    },
    notes: {
      type: String, // optional health remarks
      trim: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

const userHealth = mongoose.model("userHealth",userSchema);
module.exports = userHealth;


