
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./connectDB/connectDB');
const {restrictUser} = require("./middlewares/auth")

const routes = require('./routes/userRoutes');
const userHealthRoutes = require('./routes/userHealthRoutes');
const userNotesRoutes = require('./routes/userNotesRoutes'); 
const userPostsRoutes = require("./routes/userPosts");
const userChatRoutes = require('./routes/chatbotrRoutes')
const userMoodRoutes = require('./routes/userMoodRoutes')

const port = process.env.PORT || 8000;

// Middlewares
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database
connectDB("mongodb://127.0.0.1:27017/healthMonitor");

// Routes
app.use("/api", routes);
app.use("/api/health",restrictUser, userHealthRoutes);
app.use("/api/notes",restrictUser, userNotesRoutes); 
app.use("/api/posts",restrictUser, userPostsRoutes); 
app.use("/api/chatbot",restrictUser, userChatRoutes);
app.use("/api/mood", restrictUser, userMoodRoutes);



// Server
app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
