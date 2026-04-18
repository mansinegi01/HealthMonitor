
// const { getUser } = require('../services/auth');

// function restrictUser(req, res, next) {
//   const token = req.cookies.uid;

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const user = getUser(token);

//   if (!user) {
//     return res.status(401).json({ message: "Invalid token" });
//   }

//   req.user = user;
//   next();
// }

// module.exports = { restrictUser };


// const { getUser } = require("../services/auth");

// function restrictUser(req, res, next) {
//   const token = req.cookies.uid;

//   console.log("COOKIE TOKEN:", token); // 🔥 DEBUG

//   if (!token) {
//     return res.status(401).json({ message: "No token found" });
//   }

//   const user = getUser(token);

//   if (!user) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }

//   req.user = user;
//   next();
// }

// module.exports = { restrictUser };

const jwt = require("jsonwebtoken");

function restrictUser(req, res, next) {
  let token;

  // ✅ 1. Check Authorization header (React uses this)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("HEADER TOKEN:", token);
  }

  // ✅ 2. Fallback to cookies
  if (!token && req.cookies.uid) {
    token = req.cookies.uid;
    console.log("COOKIE TOKEN:", token);
  }

  // ❌ No token
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED USER:", decoded);

    req.user = decoded; // 🔥 IMPORTANT
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { restrictUser };