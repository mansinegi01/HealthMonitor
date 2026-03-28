const express = require("express");
const router = express.Router();

// ✅ Destructure 'protect' — matches your existing auth middleware export style
const { restrictUser } = require("../middlewares/auth");

const {
  getGoals,
  createGoal,
  checkInGoal,
  getGoalStats,
  deleteGoal,
} = require("../controller/GoalController");

// /stats must come before /:id to avoid route conflict
router.get("/stats", restrictUser, getGoalStats);
router.get("/", restrictUser, getGoals);
router.post("/", restrictUser, createGoal);
router.patch("/:id/checkin", restrictUser, checkInGoal);
router.delete("/:id", restrictUser, deleteGoal);

module.exports = router;