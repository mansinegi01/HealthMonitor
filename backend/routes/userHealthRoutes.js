// const express = require("express");
// const router = express.Router();
// const { restrictUser } = require("../middlewares/auth");

// const {
//   getDailyCheckIns,
//   saveDailyCheckIn,
//   generateFinalReport,
// } = require("../controller/userHealthRoutes");

// router.get("/daily-checkin", restrictUser, getDailyCheckIns);
// router.post("/daily-checkin", restrictUser, saveDailyCheckIn);
// router.get("/generate-report", restrictUser, generateFinalReport);

// module.exports = router;
// userHealthRoutes.js
const express = require("express");
const router = express.Router();
const { getDailyCheckIns, saveDailyCheckIn, generateFinalReport } = require("../controller/userHealthRoutes");

// No need for restrictUser here if it's already in app.use("/api/health", restrictUser, ...)
router.get("/daily-checkin", getDailyCheckIns);
router.post("/daily-checkin", saveDailyCheckIn);
router.get("/generate-report", generateFinalReport);

module.exports = router;