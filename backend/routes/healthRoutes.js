
// const express = require("express");
// const router = express.Router();
// const { getDailyCheckIns, saveDailyCheckIn, generateFinalReport } = require("../controller/userHealthRoutes");

// // No need for restrictUser here if it's already in app.use("/api/health", restrictUser, ...)
// router.get("/daily-checkin", getDailyCheckIns);
// router.post("/daily-checkin", saveDailyCheckIn);
// router.get("/generate-report", generateFinalReport);

// module.exports = router;


const express = require("express");
const router = express.Router();

const { restrictUser } = require("../middlewares/auth");

// ✅ FIXED IMPORT (IMPORTANT)
const {
  getDailyCheckIns,
  saveDailyCheckIn,
  generateFinalReport,
} = require("../controller/HealthController");

// ✅ CLEAN ROUTES (MATCH FRONTEND)
router.post("/daily-checkin", restrictUser, saveDailyCheckIn);
router.get("/daily-checkin", restrictUser, getDailyCheckIns);
router.get("/report", restrictUser, generateFinalReport);

module.exports = router;