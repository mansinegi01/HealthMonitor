
// // const Mood = require("../model/mood");


// // async function addMood(req, res){
// //   try {
// //     const { userId, mood } = req.body;

// //     const newMood = new Mood({
// //       userId,
// //       mood,
// //       date: new Date() 
// //     });

// //     await newMood.save();

// //     res.json({ message: "Mood recorded successfully!", newMood });
// //   } catch (err) {
// //     console.error("Add Mood Error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // }

// // async function getMood(req, res){
// //   try {
// //     const { userId, year, month } = req.params;

// //     const start = new Date(year, month - 1, 1);
// //     const end = new Date(year, month, 1);

// //     const summary = await Mood.aggregate([
// //       { 
// //         $match: { 
// //           userId: new mongoose.Types.ObjectId(userId), 
// //           date: { $gte: start, $lt: end }
// //         }
// //       },
// //       {
// //         $group: {
// //           _id: "$mood",
// //           count: { $sum: 1 }
// //         }
// //       }
// //     ]);

// //     res.json(summary);
// //   }catch (err) {
// //     console.error("Get Mood Error:", err); 
// //     res.status(500).json({ error: err.message });
// //   }
// // }

// // module.exports = {
// //     addMood, getMood
// // }
// const express = require("express"); // Optional if you need router here, but mainly Mongoose is missing below
// const Mood = require("../model/mood");
// const mongoose = require("mongoose"); // <--- THIS LINE WAS MISSING

// async function addMood(req, res){
//   try {
//     const { userId, mood } = req.body;

//     // Use new Date() to capture the EXACT time of the click
//     const newMood = new Mood({
//       userId,
//       mood,
//       date: new Date() 
//     });

//     await newMood.save();

//     res.json({ message: "Mood recorded successfully!", newMood });
//   } catch (err) {
//     console.error("Add Mood Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// }

// async function getMood(req, res){
//   try {
//     const { userId, year, month } = req.params;

//     const start = new Date(year, month - 1, 1);
//     const end = new Date(year, month, 1);

//     const summary = await Mood.aggregate([
//       { 
//         $match: { 
//           // This line works now because we imported mongoose at the top
//           userId: new mongoose.Types.ObjectId(userId), 
//           date: { $gte: start, $lt: end }
//         }
//       },
//       {
//         $group: {
//           _id: "$mood",
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     res.json(summary);
//   } catch (err) {
//     console.error("Get Mood Error:", err); 
//     res.status(500).json({ error: err.message });
//   }
// }

// module.exports = {
//     addMood, getMood
// }
const Mood = require("../model/mood");
const mongoose = require("mongoose");

/* ================= ADD MOOD ================= */
async function addMood(req, res) {
  try {
    // ✅ userId must come from JWT middleware
    const userId = req.user.id || req.user._id;
    const { mood } = req.body;

    if (!userId || !mood) {
      return res.status(400).json({ message: "Invalid mood data" });
    }

    const newMood = new Mood({
      userId,
      mood,
      date: new Date(),
    });

    await newMood.save();

    res.status(201).json({
      message: "Mood recorded successfully!",
      mood: newMood,
    });
  } catch (err) {
    console.error("Add Mood Error:", err);
    res.status(500).json({ error: err.message });
  }
}

/* ================= GET MOOD SUMMARY ================= */
async function getMood(req, res) {
  try {
    const { userId, year, month } = req.params;

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const summary = await Mood.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$mood",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(summary);
  } catch (err) {
    console.error("Get Mood Error:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addMood, getMood };
