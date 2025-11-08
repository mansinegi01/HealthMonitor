// // const UserHealth = require("../model/userHealth")

// // async function sethealthProfile(req, res) {
// //   try {
// //     const userId = req.user.id; // ✅ from JWT
// //     const { weight, height, heartRate, systolic, diastolic, activityLevel, waterIntake, sleepHours } = req.body;

// //     let health = await UserHealth.findOne({ userId });
// //     if (health) {
// //       // update existing
// //       health.weight = weight ?? health.weight;
// //       health.height = height ?? health.height;
// //       health.heartRate = heartRate ?? health.heartRate;
// //       health.bloodPressure = {
// //         systolic: systolic ?? health.bloodPressure.systolic,
// //         diastolic: diastolic ?? health.bloodPressure.diastolic,
// //       };
// //       health.activityLevel = activityLevel ?? health.activityLevel;
// //       health.waterIntake = waterIntake ?? health.waterIntake;
// //       health.sleepHours = sleepHours ?? health.sleepHours;
// //       health.updatedAt = Date.now();
// //       await health.save();
// //     } else {
// //       health = await UserHealth.create({
// //         userId,
// //         weight,
// //         height,
// //         heartRate,
// //         bloodPressure: { systolic, diastolic },
// //         activityLevel,
// //         waterIntake,
// //         sleepHours,
// //       });
// //     }

// //     res.status(200).json({ message: "Health data saved", health });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server Error", error });
// //   }
// // }

// // async function gethealthProfile(req,res) {
// //   try {
// //     const { userId } = req.params;
// //     const health = await UserHealth.findOne({ userId });
// //     if (!health) return res.status(404).json({ message: "Health data not found" });

// //     res.status(200).json(health);
// //   } catch (error) {
// //     res.status(500).json({ message: "Server Error", error });
// //   }
// // };

// // module.exports = {
// //   sethealthProfile,gethealthProfile
// // }
// const UserHealth = require("../model/userHealth");

// async function sethealthProfile(req, res) {
//   try {
//     const userId = req.user.id; // ✅ from JWT
//     const { weight, heartRate, systolic, diastolic, glucose, waterIntake, notes } = req.body;

//     const updated = await UserHealth.findOneAndUpdate(
//       { userId },
//       { $set: { weight, heartRate, systolic, diastolic, glucose, waterIntake, notes } },
//       { upsert: true, new: true }
//     );

//    res.status(200).json({
//   message: "✅ Health data saved",
//   health: updated,
//   user: req.user // so you can pass it back to Profile.jsx
// });

//   } catch (error) {
//     console.error("❌ Error saving health data:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// }

// async function gethealthProfile(req, res) {
//   try {
//     const userId = req.user.id;
//     const health = await UserHealth.findOne({ userId });
//     if (!health) return res.status(404).json({ message: "Health data not found" });

//     res.status(200).json({ health });
//   } catch (error) {
//     console.error("❌ Error fetching health data:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// }

// module.exports = { sethealthProfile, gethealthProfile };
const UserHealth = require("../model/userHealth");

async function sethealthProfile(req, res) {
  try {
    const userId = req.user.id;
    const { weight, heartRate, systolic, diastolic, glucose, waterIntake, notes } = req.body;

    const updated = await UserHealth.findOneAndUpdate(
      { userId },
      { $set: { weight, heartRate, systolic, diastolic, glucose, waterIntake, notes } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: " Health data saved successfully",
      health: updated,
      user: req.user
    });
  } catch (error) {
    console.error("Error saving health data:", error);
    res.status(500).json({ message: "Server Error", error });
  }
}

async function gethealthProfile(req, res) {
  try {
    const userId = req.user.id;
    const health = await UserHealth.findOne({ userId });
    if (!health) return res.status(404).json({ message: "Health data not found" });

    res.status(200).json({ health });
  } catch (error) {
    console.error(" Error fetching health data:", error);
    res.status(500).json({ message: "Server Error", error });
  }
}

module.exports = { sethealthProfile, gethealthProfile };
