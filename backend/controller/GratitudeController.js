// const Gratitude = require("../model/Gratitude");

// // Daily rotating prompts
// const PROMPTS = [
//   "What made today worth showing up for?",
//   "Name one thing you're quietly proud of.",
//   "What small kindness did you give or receive?",
//   "What's something that surprised you in a good way?",
//   "Who or what felt like a safe space today?",
//   "What small moment made you smile?",
//   "Name someone who helped you this week.",
//   "What's something your body did well today?",
//   "What challenge taught you something valuable?",
//   "What are you looking forward to tomorrow?",
// ];

// const MOODS = ["✨", "💛", "🌱", "🌸", "🦋", "🌿", "💙"];

// // Lightweight sentiment scorer (keyword-based, replace with AI call if preferred)
// const scoreSentiment = (text) => {
//   const positive = ["happy","joy","love","grateful","thankful","amazing","wonderful","great","good","beautiful","smile","calm","peace","hope","proud","kind","blessed","better","excited","fun","laugh"];
//   const negative = ["sad","bad","awful","terrible","angry","hate","hurt","pain","stressed","anxious","fear","worry","lost","fail","hard","tired","exhausted","depressed","alone"];

//   const words = text.toLowerCase().split(/\W+/);
//   let score = 0.5;
//   words.forEach((w) => {
//     if (positive.includes(w)) score += 0.05;
//     if (negative.includes(w)) score -= 0.04;
//   });
//   score = Math.max(0.1, Math.min(0.99, score));

//   let label;
//   if (score >= 0.8) label = "very_positive";
//   else if (score >= 0.6) label = "positive";
//   else if (score >= 0.4) label = "neutral";
//   else if (score >= 0.25) label = "negative";
//   else label = "very_negative";

//   return { score: parseFloat(score.toFixed(2)), label };
// };

// // GET /api/gratitude/prompt  — today's rotating prompt
// const getDailyPrompt = async (req, res) => {
//   try {
//     const dayIndex = new Date().getDate() % PROMPTS.length;
//     res.status(200).json({ success: true, prompt: PROMPTS[dayIndex] });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // GET /api/gratitude  — user's gratitude entries
// const getEntries = async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 20;
//     const entries = await Gratitude.find({ userId: req.user._id })
//       .sort({ date: -1 })
//       .limit(limit);

//     res.status(200).json({ success: true, data: entries });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // POST /api/gratitude  — create entry + auto-sentiment
// const createEntry = async (req, res) => {
//   try {
//     const { prompt, entry } = req.body;
//     if (!entry || entry.trim().length < 3) {
//       return res.status(400).json({ success: false, message: "Entry too short" });
//     }

//     const sentiment = scoreSentiment(entry);
//     const mood = MOODS[Math.floor(Math.random() * MOODS.length)];

//     // Calculate current streak
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     yesterday.setHours(0, 0, 0, 0);

//     const lastEntry = await Gratitude.findOne({ userId: req.user._id }).sort({ date: -1 });
//     let streak = 1;
//     if (lastEntry) {
//       const lastDate = new Date(lastEntry.date);
//       lastDate.setHours(0, 0, 0, 0);
//       if (lastDate.getTime() === yesterday.getTime()) {
//         streak = (lastEntry.streak || 0) + 1;
//       }
//     }

//     const gratitude = await Gratitude.create({
//       userId: req.user._id,
//       prompt,
//       entry: entry.trim(),
//       sentiment,
//       mood,
//       streak,
//     });

//     res.status(201).json({ success: true, data: gratitude });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// // GET /api/gratitude/stats  — weekly sentiment summary for reports
// const getGratitudeStats = async (req, res) => {
//   try {
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     const entries = await Gratitude.find({
//       userId: req.user._id,
//       date: { $gte: sevenDaysAgo },
//     }).sort({ date: 1 });

//     const avgSentiment = entries.length
//       ? parseFloat((entries.reduce((a, e) => a + e.sentiment.score, 0) / entries.length).toFixed(2))
//       : 0;

//     const currentStreak = entries.length ? entries[entries.length - 1].streak : 0;

//     // Group by day for chart
//     const dailyData = {};
//     entries.forEach((e) => {
//       const key = new Date(e.date).toISOString().split("T")[0];
//       dailyData[key] = e.sentiment.score;
//     });

//     res.status(200).json({
//       success: true,
//       data: { totalEntries: entries.length, avgSentiment, currentStreak, dailyData },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// module.exports = { getDailyPrompt, getEntries, createEntry, getGratitudeStats };
const Gratitude = require("../model/Gratitude");

// Daily rotating prompts
const PROMPTS = [
  "What made today worth showing up for?",
  "Name one thing you're quietly proud of.",
  "What small kindness did you give or receive?",
  "What's something that surprised you in a good way?",
  "Who or what felt like a safe space today?",
  "What small moment made you smile?",
  "Name someone who helped you this week.",
  "What's something your body did well today?",
  "What challenge taught you something valuable?",
  "What are you looking forward to tomorrow?",
];

const MOODS = ["✨", "💛", "🌱", "🌸", "🦋", "🌿", "💙"];

// Lightweight sentiment scorer (keyword-based, replace with AI call if preferred)
const scoreSentiment = (text) => {
  const positive = ["happy","joy","love","grateful","thankful","amazing","wonderful","great","good","beautiful","smile","calm","peace","hope","proud","kind","blessed","better","excited","fun","laugh"];
  const negative = ["sad","bad","awful","terrible","angry","hate","hurt","pain","stressed","anxious","fear","worry","lost","fail","hard","tired","exhausted","depressed","alone"];

  const words = text.toLowerCase().split(/\W+/);
  let score = 0.5;
  words.forEach((w) => {
    if (positive.includes(w)) score += 0.05;
    if (negative.includes(w)) score -= 0.04;
  });
  score = Math.max(0.1, Math.min(0.99, score));

  let label;
  if (score >= 0.8) label = "very_positive";
  else if (score >= 0.6) label = "positive";
  else if (score >= 0.4) label = "neutral";
  else if (score >= 0.25) label = "negative";
  else label = "very_negative";

  return { score: parseFloat(score.toFixed(2)), label };
};

// GET /api/gratitude/prompt  — today's rotating prompt
const getDailyPrompt = async (req, res) => {
  try {
    const dayIndex = new Date().getDate() % PROMPTS.length;
    res.status(200).json({ success: true, prompt: PROMPTS[dayIndex] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/gratitude  — user's gratitude entries
const getEntries = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const entries = await Gratitude.find({ userId: req.user._id || req.user.id })
      .sort({ date: -1 })
      .limit(limit);

    res.status(200).json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/gratitude  — create entry + auto-sentiment
const createEntry = async (req, res) => {
  try {
    const { prompt, entry } = req.body;
    if (!entry || entry.trim().length < 3) {
      return res.status(400).json({ success: false, message: "Entry too short" });
    }

    const sentiment = scoreSentiment(entry);
    const mood = MOODS[Math.floor(Math.random() * MOODS.length)];

    // Calculate current streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const lastEntry = await Gratitude.findOne({ userId: req.user._id || req.user.id }).sort({ date: -1 });
    let streak = 1;
    if (lastEntry) {
      const lastDate = new Date(lastEntry.date);
      lastDate.setHours(0, 0, 0, 0);
      if (lastDate.getTime() === yesterday.getTime()) {
        streak = (lastEntry.streak || 0) + 1;
      }
    }

    const gratitude = await Gratitude.create({
      userId: req.user._id || req.user.id,
      prompt,
      entry: entry.trim(),
      sentiment,
      mood,
      streak,
    });

    res.status(201).json({ success: true, data: gratitude });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /api/gratitude/stats  — weekly sentiment summary for reports
const getGratitudeStats = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const entries = await Gratitude.find({
      userId: req.user._id || req.user.id,
      date: { $gte: sevenDaysAgo },
    }).sort({ date: 1 });

    const avgSentiment = entries.length
      ? parseFloat((entries.reduce((a, e) => a + e.sentiment.score, 0) / entries.length).toFixed(2))
      : 0;

    const currentStreak = entries.length ? entries[entries.length - 1].streak : 0;

    // Group by day for chart
    const dailyData = {};
    entries.forEach((e) => {
      const key = new Date(e.date).toISOString().split("T")[0];
      dailyData[key] = e.sentiment.score;
    });

    res.status(200).json({
      success: true,
      data: { totalEntries: entries.length, avgSentiment, currentStreak, dailyData },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getDailyPrompt, getEntries, createEntry, getGratitudeStats };