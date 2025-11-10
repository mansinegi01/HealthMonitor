
const jwt = require("jsonwebtoken");
const secret = "mysecret"; 

function setUser(user) {
  return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: "1d" });
}

function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

function restrictUser(req, res, next) {
  const token = req.cookies?.uid || req.headers["authorization"]?.split(" ")[1];
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

module.exports = { setUser, getUser, restrictUser };
