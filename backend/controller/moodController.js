const Mood = require("../model/mood");


// ✅ Add or Update Mood (Single Mood Per Day)
exports.addOrUpdateMood = async (req, res) => {
  try {
    const { mood } = req.body;
    const userId = req.user.id;

    const today = new Date().toISOString().split("T")[0];

    const updatedMood = await Mood.findOneAndUpdate(
      { userId, date: today },
      { mood },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Mood saved successfully",
      data: updatedMood
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to save mood" });
  }
};



// ✅ Get Mood Statistics (Profile Page)
exports.getMoodStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const moods = await Mood.find({ userId });

    const daysTracked = moods.length;

    const moodFrequency = {};

    moods.forEach(m => {
      moodFrequency[m.mood] = (moodFrequency[m.mood] || 0) + 1;
    });

    let topMood = "—";
    let max = 0;

    for (let mood in moodFrequency) {
      if (moodFrequency[mood] > max) {
        max = moodFrequency[mood];
        topMood = mood;
      }
    }

    res.json({
      daysTracked,
      topMood,
      reportUnlocked: daysTracked >= 14
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};



// ✅ Generate Report (Protected by 14 Day Rule)
exports.generateReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const moods = await Mood.find({ userId });

    const daysTracked = moods.length;

    if (daysTracked < 14) {
      return res.status(403).json({
        error: "Minimum 14 days of tracking required"
      });
    }

    // You can later generate PDF here
    res.json({
      message: "Report generated successfully",
      totalDays: daysTracked
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to generate report" });
  }
};

exports.getMoodHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const moods = await Mood.find({ userId }).sort({ date: 1 });

    res.json(moods);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};