// // middlewares/auth.js
// const jwt = require("jsonwebtoken");
// const secret = "mysecret"; // move to .env later

// function setUser(user) {
//   return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: "1d" });
// }

// function getUser(token) {
//   try {
//     return jwt.verify(token, secret);
//   } catch {
//     return null;
//   }
// }

// module.exports = { setUser, getUser };
const jwt = require('jsonwebtoken');

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      anonId: user.anonId
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { setUser, getUser };