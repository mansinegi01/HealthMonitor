const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");

async function addMood(req,res){
  try {
    const { userId, mood } = req.body;

    const today = new Date();
    const formattedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const existing = await Mood.findOne({ userId, date: formattedDate });
    if (existing) return res.json({ message: "Mood already recorded today." });

    const newMood = new Mood({
      userId,
      mood,
      date: formattedDate
    });

    await newMood.save();
    res.json({ message: "Mood recorded successfully!", newMood });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getMood(req, res){
  try {
    const { userId, year, month } = req.params;

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const summary = await Mood.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: start, $lt: end }
        }
      },
      {
        $group: {
          _id: "$mood",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
    addMood, getMood
}
