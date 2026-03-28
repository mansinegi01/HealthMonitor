const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  reached: { type: Boolean, default: false },
  reachedAt: { type: Date },
});

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["mindfulness", "physical", "reflection", "wellness", "social", "other"],
      default: "wellness",
    },
    target: { type: Number, required: true },
    unit: { type: String, required: true, default: "days" },
    current: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastCheckedIn: { type: Date },
    milestones: [milestoneSchema],
    color: { type: String, default: "#7ee8a2" },
    isActive: { type: Boolean, default: true },
    completedAt: { type: Date },
    activityLog: [
      {
        date: { type: Date, default: Date.now },
        checked: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

// Auto-check milestones on current update
goalSchema.methods.checkMilestones = function () {
  this.milestones.forEach((m) => {
    if (!m.reached && this.current >= m.value) {
      m.reached = true;
      m.reachedAt = new Date();
    }
  });
};

// Calculate streak from activityLog
goalSchema.methods.recalcStreak = function () {
  const logs = [...this.activityLog].sort((a, b) => new Date(b.date) - new Date(a.date));
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

module.exports = mongoose.model("Goal", goalSchema);