const UserHealth = require("../model/userHealth");
const redisClient = require("../utils/redisClient");

const getDailyCheckIns = async (req, res) => {
  const userId = req.user.id;
  const cacheKey = `health:logs:${userId}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json({ logs: JSON.parse(cached) });
    }

    const logs = await UserHealth.find({ userId })
      .sort({ createdAt: -1 })
      .limit(7);

    await redisClient.setEx(cacheKey, 600, JSON.stringify(logs));
    res.json({ logs });
  } catch {
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};

const saveDailyCheckIn = async (req, res) => {
  try {
    await UserHealth.create({
      userId: req.user.id,
      ...req.body,
    });

    await redisClient.del(`health:logs:${req.user.id}`);
    await redisClient.del(`health:summary:${req.user.id}`);

    res.status(201).json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to save check-in" });
  }
};

const generateFinalReport = async (req, res) => {
  const userId = req.user.id;
  const cacheKey = `health:summary:${userId}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const logs = await UserHealth.find({ userId });

    const avg = (k) =>
      Math.round(logs.reduce((s, l) => s + (l[k] || 0), 0) / (logs.length || 1));

    const report = {
      averages: {
        stress: avg("stressLevel"),
        energy: avg("energyLevel"),
        focus: avg("focusLevel"),
        sleep: avg("sleepQuality"),
      },
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
