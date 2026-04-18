
const UserHealth = require("../model/Health");
const redisClient = require("../utils/redisClient");

// ✅ Get last 7 days logs
const getDailyCheckIns = async (req, res) => {
  const userId = req.user.id;
  const cacheKey = `health:logs:${userId}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json({ logs: JSON.parse(cached) });
    }

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const logs = await UserHealth.find({
      userId,
      createdAt: { $gte: last7Days },
    }).sort({ createdAt: -1 });

    await redisClient.setEx(cacheKey, 600, JSON.stringify(logs));

    res.json({ logs });
  } catch {
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};

// ✅ Save entry
const saveDailyCheckIn = async (req, res) => {
  try {
    await UserHealth.create({
      userId: req.user.id,
      ...req.body,
    });

    // clear cache
    await redisClient.del(`health:logs:${req.user.id}`);
    await redisClient.del(`health:summary:${req.user.id}`);

    res.status(201).json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to save check-in" });
  }
};

// ✅ Generate 7-day report
const generateFinalReport = async (req, res) => {
  const userId = req.user.id;
  const cacheKey = `health:summary:${userId}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const logs = await UserHealth.find({
      userId,
      createdAt: { $gte: last7Days },
    }).sort({ createdAt: -1 });

    const avg = (key) =>
      logs.length
        ? Math.round(
            logs.reduce((sum, item) => sum + (item[key] || 0), 0) /
              logs.length
          )
        : 0;

    const report = {
      averages: {
        stress: avg("stressLevel"),
        energy: avg("energyLevel"),
        focus: avg("focusLevel"),
        sleep: avg("sleepQuality"),
      },
      totalEntries: logs.length,
      logs,
    };

    await redisClient.setEx(cacheKey, 1800, JSON.stringify(report));

    res.json(report);
  } catch {
    res.status(500).json({ message: "Failed to generate report" });
  }
};

module.exports = {
  getDailyCheckIns,
  saveDailyCheckIn,
  generateFinalReport,
};