// const Medication = require("../model/Medication");

// // GET /api/medications  — all active meds for user
// const getMedications = async (req, res) => {
//   try {
//     const meds = await Medication.find({ userId: req.user._id, isActive: true }).sort({
//       scheduledTime: 1,
//     });
//     res.status(200).json({ success: true, data: meds });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // POST /api/medications  — add a new medication/supplement
// const addMedication = async (req, res) => {
//   try {
//     const { name, dose, type, scheduledTime, color, reminderEnabled, notes } = req.body;

//     const med = await Medication.create({
//       userId: req.user._id,
//       name,
//       dose,
//       type,
//       scheduledTime,
//       color,
//       reminderEnabled,
//       notes,
//     });

//     res.status(201).json({ success: true, data: med });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// // PATCH /api/medications/:id/log  — mark today's dose taken/skipped
// const logDose = async (req, res) => {
//   try {
//     const { taken, moodScore } = req.body;
//     const med = await Medication.findOne({ _id: req.params.id, userId: req.user._id });
//     if (!med) return res.status(404).json({ success: false, message: "Medication not found" });

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Find or create today's log entry
//     const existingLog = med.doseLogs.find((l) => {
//       const d = new Date(l.date);
//       d.setHours(0, 0, 0, 0);
//       return d.getTime() === today.getTime();
//     });

//     if (existingLog) {
//       existingLog.taken = taken;
//       if (taken) existingLog.takenAt = new Date();
//       if (moodScore) existingLog.moodScore = moodScore;
//     } else {
//       med.doseLogs.push({
//         date: today,
//         taken,
//         takenAt: taken ? new Date() : undefined,
//         moodScore,
//       });
//     }

//     med.recalcStreak();
//     med.calcMoodCorrelation();

//     await med.save();
//     res.status(200).json({ success: true, data: med });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // GET /api/medications/adherence  — 7-day adherence + mood correlation for report
// const getAdherenceStats = async (req, res) => {
//   try {
//     const meds = await Medication.find({ userId: req.user._id, isActive: true });

//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     // Per-day adherence %
//     const dailyAdherence = {};
//     for (let i = 6; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       d.setHours(0, 0, 0, 0);
//       const key = d.toISOString().split("T")[0];

//       const totalMeds = meds.length;
//       if (!totalMeds) { dailyAdherence[key] = 0; continue; }

//       let taken = 0;
//       meds.forEach((m) => {
//         const log = m.doseLogs.find((l) => {
//           const ld = new Date(l.date);
//           ld.setHours(0, 0, 0, 0);
//           return ld.getTime() === d.getTime();
//         });
//         if (log && log.taken) taken++;
//       });

//       dailyAdherence[key] = Math.round((taken / totalMeds) * 100);
//     }

//     const todayKey = new Date().toISOString().split("T")[0];
//     const todayAdherence = dailyAdherence[todayKey] || 0;

//     const avgAdherence = Math.round(
//       Object.values(dailyAdherence).reduce((a, b) => a + b, 0) /
//         Object.keys(dailyAdherence).length
//     );

//     const moodInsight = meds
//       .filter((m) => Math.abs(m.moodCorrelation) > 0)
//       .map((m) => ({ name: m.name, correlation: m.moodCorrelation }))
//       .sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

//     res.status(200).json({
//       success: true,
//       data: {
//         totalMeds: meds.length,
//         todayTaken: meds.filter((m) => {
//           const todayLog = m.doseLogs.find((l) => {
//             const d = new Date(l.date);
//             d.setHours(0, 0, 0, 0);
//             return d.toISOString().split("T")[0] === todayKey;
//           });
//           return todayLog && todayLog.taken;
//         }).length,
//         todayAdherence,
//         avgAdherence,
//         dailyAdherence,
//         moodInsight,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // DELETE /api/medications/:id
// const deleteMedication = async (req, res) => {
//   try {
//     await Medication.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user._id },
//       { isActive: false }
//     );
//     res.status(200).json({ success: true, message: "Medication removed" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// module.exports = { getMedications, addMedication, logDose, getAdherenceStats, deleteMedication };
const Medication = require("../model/Medication");

// Helper — works whether auth middleware sets req.user._id or req.user.id
const getUserId = (req) => req.user._id || req.user.id;

// GET /api/medications  — all active meds for user
const getMedications = async (req, res) => {
  try {
    const meds = await Medication.find({ userId: getUserId(req), isActive: true }).sort({
      scheduledTime: 1,
    });
    res.status(200).json({ success: true, data: meds });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/medications  — add a new medication/supplement
const addMedication = async (req, res) => {
  try {
    const { name, dose, type, scheduledTime, color, reminderEnabled, notes } = req.body;

    // Validate required fields explicitly for a clear error message
    if (!name || !dose || !scheduledTime) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${!name ? "name " : ""}${!dose ? "dose " : ""}${!scheduledTime ? "scheduledTime" : ""}`.trim(),
      });
    }

    const med = await Medication.create({
      userId: getUserId(req),
      name,
      dose,
      type: type || "medication",
      scheduledTime,
      color: color || "#7ee8a2",
      reminderEnabled: reminderEnabled !== undefined ? reminderEnabled : true,
      notes: notes || "",
    });

    res.status(201).json({ success: true, data: med });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PATCH /api/medications/:id/log  — mark today's dose taken/skipped
const logDose = async (req, res) => {
  try {
    const { taken, moodScore } = req.body;
    const med = await Medication.findOne({ _id: req.params.id, userId: getUserId(req) });
    if (!med) return res.status(404).json({ success: false, message: "Medication not found" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find or create today's log entry
    const existingLog = med.doseLogs.find((l) => {
      const d = new Date(l.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });

    if (existingLog) {
      existingLog.taken = taken;
      if (taken) existingLog.takenAt = new Date();
      if (moodScore) existingLog.moodScore = moodScore;
    } else {
      med.doseLogs.push({
        date: today,
        taken,
        takenAt: taken ? new Date() : undefined,
        moodScore,
      });
    }

    med.recalcStreak();
    med.calcMoodCorrelation();

    await med.save();
    res.status(200).json({ success: true, data: med });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/medications/adherence  — 7-day adherence + mood correlation for report
const getAdherenceStats = async (req, res) => {
  try {
    const meds = await Medication.find({ userId: getUserId(req), isActive: true });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Per-day adherence %
    const dailyAdherence = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const key = d.toISOString().split("T")[0];

      const totalMeds = meds.length;
      if (!totalMeds) { dailyAdherence[key] = 0; continue; }

      let taken = 0;
      meds.forEach((m) => {
        const log = m.doseLogs.find((l) => {
          const ld = new Date(l.date);
          ld.setHours(0, 0, 0, 0);
          return ld.getTime() === d.getTime();
        });
        if (log && log.taken) taken++;
      });

      dailyAdherence[key] = Math.round((taken / totalMeds) * 100);
    }

    const todayKey = new Date().toISOString().split("T")[0];
    const todayAdherence = dailyAdherence[todayKey] || 0;

    const avgAdherence = Math.round(
      Object.values(dailyAdherence).reduce((a, b) => a + b, 0) /
        Object.keys(dailyAdherence).length
    );

    const moodInsight = meds
      .filter((m) => Math.abs(m.moodCorrelation) > 0)
      .map((m) => ({ name: m.name, correlation: m.moodCorrelation }))
      .sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

    res.status(200).json({
      success: true,
      data: {
        totalMeds: meds.length,
        todayTaken: meds.filter((m) => {
          const todayLog = m.doseLogs.find((l) => {
            const d = new Date(l.date);
            d.setHours(0, 0, 0, 0);
            return d.toISOString().split("T")[0] === todayKey;
          });
          return todayLog && todayLog.taken;
        }).length,
        todayAdherence,
        avgAdherence,
        dailyAdherence,
        moodInsight,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/medications/:id
const deleteMedication = async (req, res) => {
  try {
    await Medication.findOneAndUpdate(
      { _id: req.params.id, userId: getUserId(req) },
      { isActive: false }
    );
    res.status(200).json({ success: true, message: "Medication removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getMedications, addMedication, logDose, getAdherenceStats, deleteMedication };