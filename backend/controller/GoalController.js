// const Goal = require("../model/Goal");

// // GET /api/goals  — all goals for logged-in user
// const getGoals = async (req, res) => {
//   try {
//     const goals = await Goal.find({ userId: req.user._id, isActive: true }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: goals });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // POST /api/goals  — create a new SMART goal
// const createGoal = async (req, res) => {
//   try {
//     const { title, category, target, unit, milestones, color } = req.body;

//     const milestoneArr = (milestones || []).map((v) => ({ value: v, reached: false }));

//     const goal = await Goal.create({
//       userId: req.user._id,
//       title,
//       category,
//       target,
//       unit,
//       color,
//       milestones: milestoneArr,
//     });

//     res.status(201).json({ success: true, data: goal });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// // PATCH /api/goals/:id/checkin  — log daily check-in, update streak
// const checkInGoal = async (req, res) => {
//   try {
//     const goal = await Goal.findOne({ _id: req.params.id, userId: req.user._id });
//     if (!goal) return res.status(404).json({ success: false, message: "Goal not found" });

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Prevent duplicate check-in on same day
//     const alreadyChecked = goal.activityLog.some((l) => {
//       const d = new Date(l.date);
//       d.setHours(0, 0, 0, 0);
//       return d.getTime() === today.getTime();
//     });

//     if (alreadyChecked) {
//       return res.status(400).json({ success: false, message: "Already checked in today" });
//     }

//     goal.activityLog.push({ date: today, checked: true });
//     goal.current = Math.min(goal.current + 1, goal.target);
//     goal.lastCheckedIn = today;

//     goal.recalcStreak();
//     goal.checkMilestones();

//     if (goal.current >= goal.target) {
//       goal.completedAt = new Date();
//     }

//     await goal.save();
//     res.status(200).json({ success: true, data: goal });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // GET /api/goals/stats  — summary stats for report
// const getGoalStats = async (req, res) => {
//   try {
//     const goals = await Goal.find({ userId: req.user._id });

//     const totalStreak = goals.reduce((a, g) => a + g.streak, 0);
//     const completedGoals = goals.filter((g) => g.current >= g.target).length;
//     const completionRate = goals.length
//       ? Math.round((completedGoals / goals.length) * 100)
//       : 0;

//     // 30-day activity
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

//     const activityMap = {};
//     goals.forEach((g) => {
//       g.activityLog.forEach((log) => {
//         if (new Date(log.date) >= thirtyDaysAgo) {
//           const key = new Date(log.date).toISOString().split("T")[0];
//           activityMap[key] = true;
//         }
//       });
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         totalGoals: goals.length,
//         activeGoals: goals.filter((g) => g.isActive).length,
//         completedGoals,
//         completionRate,
//         totalStreak,
//         activeDaysLast30: Object.keys(activityMap).length,
//         activityMap,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // DELETE /api/goals/:id
// const deleteGoal = async (req, res) => {
//   try {
//     await Goal.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user._id },
//       { isActive: false }
//     );
//     res.status(200).json({ success: true, message: "Goal removed" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// module.exports = { getGoals, createGoal, checkInGoal, getGoalStats, deleteGoal };
const Goal = require("../model/Goal");

// GET /api/goals  — all goals for logged-in user
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id || req.user.id, isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: goals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/goals  — create a new SMART goal
const createGoal = async (req, res) => {
  try {
    const { title, category, target, unit, milestones, color } = req.body;

    const milestoneArr = (milestones || []).map((v) => ({ value: v, reached: false }));

    const goal = await Goal.create({
      userId: req.user._id || req.user.id,
      title,
      category,
      target,
      unit,
      color,
      milestones: milestoneArr,
    });

    res.status(201).json({ success: true, data: goal });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PATCH /api/goals/:id/checkin  — log daily check-in, update streak
const checkInGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user._id || req.user.id });
    if (!goal) return res.status(404).json({ success: false, message: "Goal not found" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Prevent duplicate check-in on same day
    const alreadyChecked = goal.activityLog.some((l) => {
      const d = new Date(l.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });

    if (alreadyChecked) {
      return res.status(400).json({ success: false, message: "Already checked in today" });
    }

    goal.activityLog.push({ date: today, checked: true });
    goal.current = Math.min(goal.current + 1, goal.target);
    goal.lastCheckedIn = today;

    goal.recalcStreak();
    goal.checkMilestones();

    if (goal.current >= goal.target) {
      goal.completedAt = new Date();
    }

    await goal.save();
    res.status(200).json({ success: true, data: goal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/goals/stats  — summary stats for report
const getGoalStats = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id || req.user.id });

    const totalStreak = goals.reduce((a, g) => a + g.streak, 0);
    const completedGoals = goals.filter((g) => g.current >= g.target).length;
    const completionRate = goals.length
      ? Math.round((completedGoals / goals.length) * 100)
      : 0;

    // 30-day activity
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activityMap = {};
    goals.forEach((g) => {
      g.activityLog.forEach((log) => {
        if (new Date(log.date) >= thirtyDaysAgo) {
          const key = new Date(log.date).toISOString().split("T")[0];
          activityMap[key] = true;
        }
      });
    });

    res.status(200).json({
      success: true,
      data: {
        totalGoals: goals.length,
        activeGoals: goals.filter((g) => g.isActive).length,
        completedGoals,
        completionRate,
        totalStreak,
        activeDaysLast30: Object.keys(activityMap).length,
        activityMap,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/goals/:id
const deleteGoal = async (req, res) => {
  try {
    await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id || req.user.id },
      { isActive: false }
    );
    res.status(200).json({ success: true, message: "Goal removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getGoals, createGoal, checkInGoal, getGoalStats, deleteGoal };