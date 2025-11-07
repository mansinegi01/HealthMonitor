const UserHealth = require("../model/userHealth");

async function setUserHealth(req, res) {
  try {
    console.log("📩 Incoming data:", req.body);

    const {
      userId,
      weight,
      heartRate,
      systolic,
      diastolic,
      glucose,
      waterIntake,
      notes,
    } = req.body;

    const healthData = await UserHealth.create({
      userId,
      weight,
      heartRate,
      systolic,
      diastolic,
      glucose,
      waterIntake,
      notes,
    });

    console.log("✅ Saved data:", healthData);

    return res.status(201).json({
      success: true,
      message: "Health data saved successfully",
      data: healthData,
    });
  } catch (error) {
    console.error("❌ Error saving health data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save health data",
      error: error.message,
    });
  }
}

async function getHealthStatus(req, res) {
  try {
    const userId = req.params.userId;
    const health = await UserHealth.findOne({ userId }).sort({ createdAt: -1 });
    if (!health)
      return res.status(404).json({ message: "No health data found" });
    res.status(200).json({ success: true, data: health });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { setUserHealth, getHealthStatus };
