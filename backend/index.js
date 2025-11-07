// const express = require('express')
// const app = express();
// const {connectDB} = require('./connectDB/connectDB')
// const routes = require('./routes/userRoutes')
// const userHealthRoutes = require('./routes/userHealthRoutes')
// const userNotesRoutes = require('./routes/userNotesRoutes')
// const cors = require('cors')
// const cookieParser = require("cookie-parser");


// const port = process.env.PORT || 8000;


// //Cors
// let corsOption = {
//     origin : "http://localhost:5173",
//     methods : "GET, POST, PUT, PATCH, DELETE",
//     credentials : true
// }

// //ConnectDB
// connectDB("mongodb://127.0.0.1:27017/healthMonitor")

// //middlewares
// app.use(cookieParser());
// app.use(cors(corsOption))
// app.use(express.json())
// app.use(express.urlencoded({extended:false}))

// //routes
// app.use("/api",routes)
// app.use("/",userHealthRoutes)
// app.use("/api/notes",userNotesRoutes)





// //listen
// app.listen(port,()=>{
//     console.log(`server started`);
    
// })
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./connectDB/connectDB');

const routes = require('./routes/userRoutes');
const userHealthRoutes = require('./routes/userHealthRoutes');
const userNotesRoutes = require('./routes/userNotesRoutes'); 

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
app.use("/api/health", userHealthRoutes);
app.use("/api/notes", userNotesRoutes); 

// Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
