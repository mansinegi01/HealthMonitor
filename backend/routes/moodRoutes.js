// const express = require("express");
// const router = express.Router();
// const {
//   addOrUpdateMood,
//   getMoodStats,
//   generateReport,
//   getMoodHistory
// } = require("../controller/moodController");

// // Save or update mood
// router.post("/", addOrUpdateMood);

// // Get profile stats
// router.get("/stats", getMoodStats);

// // Get mood history
// router.get("/history", getMoodHistory);

// // Generate report
// router.get("/report", generateReport);

// module.exports = router;

const express = require("express");
const router = express.Router();

const { restrictUser } = require("../middlewares/auth"); // ✅ ADD THIS

const {
  addOrUpdateMood,
  getMoodStats,
  generateReport,
  getMoodHistory
} = require("../controller/moodController");

// 🔒 PROTECT ALL ROUTES
router.post("/", restrictUser, addOrUpdateMood);
router.get("/stats", restrictUser, getMoodStats);
router.get("/history", restrictUser, getMoodHistory);
router.get("/report", restrictUser, generateReport);

module.exports = router;