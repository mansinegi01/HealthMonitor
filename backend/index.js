

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./connectDB/connectDB");
const { restrictUser } = require("./middlewares/auth");

// Routes
const routes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");
const userNotesRoutes = require("./routes/userNotesRoutes");
const userPostsRoutes = require("./routes/userPosts");
// const userMoodRoutes = require("./routes/userMoodRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const goalsRoutes = require("./routes/GoalRoutes");
const gratitudRoutes = require("./routes/GratitudeRoutes");
const medicationRoutes = require("./routes/MedicationRoutes");
const moodRoutes = require("./routes/moodRoutes");
const app = express();
const port = process.env.PORT || 8000;

// ─────────────────────────────────────────────
// 🔐 MIDDLEWARES
// ─────────────────────────────────────────────

// Cookie parser
app.use(cookieParser());

// CORS (important for frontend connection)
const allowedOrigins = [
  "http://localhost:5173", // Vite frontend
  "http://localhost:3000",
  "https://sleeplessly-guttiform-luetta.ngrok-free.dev"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ─────────────────────────────────────────────
// 🗄️ DATABASE
// ─────────────────────────────────────────────
connectDB("mongodb://127.0.0.1:27017/healthMonitor");

// ─────────────────────────────────────────────
// 🔥 START CRON JOB (CORRECT WAY)
// ─────────────────────────────────────────────
require("./cron/medReminder");

// ─────────────────────────────────────────────
// 🌐 ROUTES
// ─────────────────────────────────────────────

// Public routes
app.use("/api", routes); // login/signup
app.use("/api/chat", chatbotRoutes);
app.use("/api/feedback", feedbackRoutes);

// Protected routes
app.use("/api/health",restrictUser, healthRoutes);
app.use("/api/notes", restrictUser, userNotesRoutes);
app.use("/api/posts", restrictUser, userPostsRoutes);
// app.use("/api/mood", restrictUser, userMoodRoutes);
app.use("/api/mood",moodRoutes);

// 🔐 Important protected modules
app.use("/api/goals", restrictUser, goalsRoutes);
app.use("/api/gratitude", restrictUser, gratitudRoutes);
app.use("/api/medications", restrictUser, medicationRoutes);


// ─────────────────────────────────────────────
// 🚀 SERVER START
// ─────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});