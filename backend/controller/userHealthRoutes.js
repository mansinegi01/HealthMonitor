const express = require('express')
const userHealthData = require('../model/userHealth.js')


async function setUserHealth(){
  try {
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

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    await userHealthData.create({
      userId,
      weight,
      heartRate,
      systolic,
      diastolic,
      glucose,
      waterIntake,
      notes,
    });


    return res.status(201).json({
      success: true,
      message: "Health data saved successfully",
      data: healthData,
    });
  } catch (error) {
    console.error("Error saving health data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save health data",
      error: error.message,
    });
  }
};


module.exports = {
    setUserHealth
}