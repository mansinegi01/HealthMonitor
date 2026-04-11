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
const jwt = require("jsonwebtoken");

// ✅ CREATE TOKEN
function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

// ✅ VERIFY TOKEN
function getUser(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log("JWT ERROR:", err.message); // 🔥 DEBUG
    return null;
  }
}

module.exports = { setUser, getUser };