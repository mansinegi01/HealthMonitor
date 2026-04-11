// require("dotenv").config();  
// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const { connectDB } = require("./connectDB/connectDB");
// const { restrictUser } = require("./middlewares/auth");


// const routes = require("./routes/userRoutes");
// const userHealthRoutes = require("./routes/userHealthRoutes");
// const userNotesRoutes = require("./routes/userNotesRoutes");
// const userPostsRoutes = require("./routes/userPosts");
// const userMoodRoutes = require("./routes/userMoodRoutes");
// const chatbotRoutes = require("./routes/chatbotRoutes")
// const feedbackRoutes  = require("./routes/feedbackRoutes");
// const moodRoutes = require("./routes/moodRoutes")
// const goalsRoutes = require("./routes/GoalRoutes");
// const gratitudRoutes = require("./routes/GratitudeRoutes");
// const medicationRoutes =  require("./routes/MedicationRoutes");

// const app = express();
// const port = process.env.PORT;

// app.use(cookieParser());
// // app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:3000",
//   "https://sleeplessly-guttiform-luetta.ngrok-free.dev"  // ← add this
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// connectDB("mongodb://127.0.0.1:27017/healthMonitor");

// app.use("/api", routes);
// app.use("/api/chat", chatbotRoutes);

// app.use("/api/health", restrictUser, userHealthRoutes);
// app.use("/api/notes", restrictUser, userNotesRoutes);
// app.use("/api/posts", restrictUser, userPostsRoutes);
// app.use("/api/mood", restrictUser, userMoodRoutes);
// app.use("/api/mood", restrictUser, moodRoutes);
// app.use("/api/feedback", feedbackRoutes);
// app.use("/api/goals",goalsRoutes );
// app.use("/api/gratitude", gratitudRoutes);
// app.use("/api/medications", medicationRoutes);


// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// })
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./connectDB/connectDB");
const { restrictUser } = require("./middlewares/auth");

// Routes
const routes = require("./routes/userRoutes");
const userHealthRoutes = require("./routes/userHealthRoutes");
const userNotesRoutes = require("./routes/userNotesRoutes");
const userPostsRoutes = require("./routes/userPosts");
const userMoodRoutes = require("./routes/userMoodRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const moodRoutes = require("./routes/moodRoutes");
const goalsRoutes = require("./routes/GoalRoutes");
const gratitudRoutes = require("./routes/GratitudeRoutes");
const medicationRoutes = require("./routes/MedicationRoutes");

const app = express();
const port = process.env.PORT || 8000;

// ─────────────────────────────────────────────────────────
// 🔐 MIDDLEWARES
// ─────────────────────────────────────────────────────────

// ✅ Cookie parser (REQUIRED for auth)
app.use(cookieParser());

// ✅ CORS (FIXED for Vite + credentials)
const allowedOrigins = [
  "http://localhost:5173",
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

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ─────────────────────────────────────────────────────────
// 🗄️ DATABASE
// ─────────────────────────────────────────────────────────
connectDB("mongodb://127.0.0.1:27017/healthMonitor");

// ─────────────────────────────────────────────────────────
// 🌐 ROUTES
// ─────────────────────────────────────────────────────────

// 🔓 Public routes
app.use("/api", routes); // login/signup
app.use("/api/chat", chatbotRoutes);
app.use("/api/feedback", feedbackRoutes);

// 🔐 Protected routes
app.use("/api/health", restrictUser, userHealthRoutes);
app.use("/api/notes", restrictUser, userNotesRoutes);
app.use("/api/posts", restrictUser, userPostsRoutes);

// ✅ FIXED: Avoid duplicate mounting
app.use("/api/mood", restrictUser, userMoodRoutes);

// ✅ CRITICAL FIX: Protect these routes
app.use("/api/goals", restrictUser, goalsRoutes);
app.use("/api/gratitude", restrictUser, gratitudRoutes);
app.use("/api/medications", restrictUser, medicationRoutes);

// ─────────────────────────────────────────────────────────
// 🚀 SERVER START
// ─────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});