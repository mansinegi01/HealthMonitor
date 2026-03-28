const express = require("express");
const router = express.Router();

// ✅ Match your project: backend/middlewares/auth.js
const { restrictUser } = require("../middlewares/auth");

const {
  getDailyPrompt,
  getEntries,
  createEntry,
  getGratitudeStats,
} = require("../controller/GratitudeController");

router.get("/prompt", restrictUser, getDailyPrompt);
router.get("/stats", restrictUser, getGratitudeStats);
router.get("/", restrictUser, getEntries);
router.post("/", restrictUser, createEntry);

module.exports = router;