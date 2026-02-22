const express = require("express");
const router = express.Router();
const {
  addOrUpdateMood,
  getMoodStats,
  generateReport,
  getMoodHistory
} = require("../controller/moodController");

// Save or update mood
router.post("/", addOrUpdateMood);

// Get profile stats
router.get("/stats", getMoodStats);

// Get mood history
router.get("/history", getMoodHistory);

// Generate report
router.get("/report", generateReport);

module.exports = router;