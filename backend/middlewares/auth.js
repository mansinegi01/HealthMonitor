
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
const { getUser } = require("../services/auth");

function restrictUser(req, res, next) {
  const token = req.cookies.uid;

  console.log("COOKIE TOKEN:", token); // 🔥 DEBUG

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  const user = getUser(token);

  if (!user) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = user;
  next();
}

module.exports = { restrictUser };