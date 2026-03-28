const mongoose = require("mongoose");

const doseLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  taken: { type: Boolean, default: false },
  takenAt: { type: Date },
  moodScore: { type: Number, min: 1, max: 10 }, // mood logged that day
});

const medicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    dose: { type: String, required: true },          // e.g. "50mg"
    type: {
      type: String,
      enum: ["medication", "supplement", "vitamin", "other"],
      default: "medication",
    },
    scheduledTime: { type: String, required: true }, // "08:00"
    color: { type: String, default: "#7ee8a2" },
    isActive: { type: Boolean, default: true },
    streak: { type: Number, default: 0 },
    moodCorrelation: { type: Number, default: 0 },   // calculated avg mood delta
    doseLogs: [doseLogSchema],
    reminderEnabled: { type: Boolean, default: true },
    notes: { type: String },
  },
  { timestamps: true }
);

// Recalculate streak
medicationSchema.methods.recalcStreak = function () {
  const logs = [...this.doseLogs]
    .filter((l) => l.taken)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < logs.length; i++) {
    const d = new Date(logs[i].date);
    d.setHours(0, 0, 0, 0);
    const diff = Math.round((today - d) / (1000 * 60 * 60 * 24));
    if (diff === streak) streak++;
    else break;
  }
  this.streak = streak;
};

// Calculate mood correlation: avg mood on taken days vs skipped days
medicationSchema.methods.calcMoodCorrelation = function () {
  const takenMoods = this.doseLogs.filter((l) => l.taken && l.moodScore).map((l) => l.moodScore);
  const skippedMoods = this.doseLogs.filter((l) => !l.taken && l.moodScore).map((l) => l.moodScore);

  if (!takenMoods.length || !skippedMoods.length) return;

  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  this.moodCorrelation = parseFloat((avg(takenMoods) - avg(skippedMoods)).toFixed(2));
};

medicationSchema.index({ userId: 1, isActive: 1 });

module.exports = mongoose.model("Medication", medicationSchema);