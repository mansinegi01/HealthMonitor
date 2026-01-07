const express = require("express");
const router = express.Router();
const { restrictUser } = require("../middlewares/auth");

const {
  getDailyCheckIns,
  saveDailyCheckIn,
  generateFinalReport,
} = require("../controller/userHealthRoutes");

router.get("/daily-checkin", restrictUser, getDailyCheckIns);
router.post("/daily-checkin", restrictUser, saveDailyCheckIn);
router.get("/generate-report", restrictUser, generateFinalReport);

module.exports = router;
