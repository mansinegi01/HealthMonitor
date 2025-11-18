// const redisClient= require("../utils/redisClient")
// const UserHealth = require("../model/userHealth");

// async function sethealthProfile(req, res) {
//   try {
//     const userId = req.user.id;
//     const { weight, heartRate, systolic, diastolic, glucose, waterIntake, notes } = req.body;

//     const updated = await UserHealth.findOneAndUpdate(
//       { userId },
//       { $set: { weight, heartRate, systolic, diastolic, glucose, waterIntake, notes } },
//       { upsert: true, new: true }
//     );

//     res.status(200).json({
//       message: " Health data saved successfully",
//       health: updated,
//       user: req.user
//     });
//   } catch (error) {
//     console.error("Error saving health data:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// }

// async function gethealthProfile(req, res) {
//   try {
//     const userId = req.user.id;
//     const health = await UserHealth.findOne({ userId });
//     if (!health) return res.status(404).json({ message: "Health data not found" });

//     res.status(200).json({ health });
//   } catch (error) {
//     console.error(" Error fetching health data:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// }

// module.exports = { sethealthProfile, gethealthProfile };
const redisClient = require("../utils/redisClient");
const UserHealth = require("../model/userHealth");

async function sethealthProfile(req, res) {
  try {
    const userId = req.user.id;
    const {
      weight,
      heartRate,
      systolic,
      diastolic,
      glucose,
      waterIntake,
      notes
    } = req.body;

    const updated = await UserHealth.findOneAndUpdate(
      { userId },
      { $set: { weight, heartRate, systolic, diastolic, glucose, waterIntake, notes } },
      { upsert: true, new: true }
    );

    // Cache update: Write-through strategy
    const cacheKey = `health:${userId}`;
    await redisClient.setEx(cacheKey, 300, JSON.stringify(updated));  // TTL = 5 min

    return res.status(200).json({
      message: "Health data saved successfully",
      health: updated,
      user: req.user
    });
  } catch (error) {
    console.error("Error saving health data:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
}

async function gethealthProfile(req, res) {
  try {
    const userId = req.user.id;
    const cacheKey = `health:${userId}`;

    // Try Redis first (Read-through)
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.status(200).json({
        source: "cache",
        health: JSON.parse(cached)
      });
    }

    // Fallback to MongoDB
    const health = await UserHealth.findOne({ userId });
    if (!health) {
      return res.status(404).json({ message: "Health data not found" });
    }

    // Store fresh DB result in Redis
    await redisClient.setEx(cacheKey, 300, JSON.stringify(health));

    return res.status(200).json({
      source: "db",
      health
    });
  } catch (error) {
    console.error("Error fetching health data:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
}

module.exports = { sethealthProfile, gethealthProfile };
