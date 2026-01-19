const jwt = require("jsonwebtoken");
const secret = "mysecret";

function setUser(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    secret,
    { expiresIn: "1d" }
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

module.exports = { setUser, getUser };
