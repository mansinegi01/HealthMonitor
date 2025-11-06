
async function setUserHealth(req, res) {
  try {
    console.log("📩 Incoming data:", req.body);  

    const {
      weight,
      heartRate,
      systolic,
      diastolic,
      glucose,
      waterIntake,
      notes,
    } = req.body;

    const healthData = await userHealth.create({
      weight,
      heartRate,
      systolic,
      diastolic,
      glucose,
      waterIntake,
      notes,
    });

    console.log(" Saved data:", healthData); 

    return res.status(201).json({
      success: true,
      message: "Health data saved successfully",
      data: healthData,
    });
  } catch (error) {
    console.error(" Error saving health data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save health data",
      error: error.message,
    });
  }
}

module.exports = { setUserHealth };