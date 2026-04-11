
const userData = require('../model/user');
const { setUser } = require('../services/auth');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// 🔐 Generate anonymized ID
function generateAnonId(email) {
  return crypto
    .createHash('sha256')
    .update(email)
    .digest('hex');
}

// ================= LOGIN =================
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const findUser = await userData.findOne({ email });

    if (!findUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🔥 Compare hashed password
    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = setUser(findUser);

    res.cookie("uid", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false // ⚠️ set true in production (HTTPS)
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        name: findUser.name,
        anonId: findUser.anonId
      },
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ================= SIGNUP =================
async function signupUser(req, res) {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Incomplete information" });
  }

  try {
    const existingUser = await userData.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 🔥 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 Generate anonymized identity
    const anonId = generateAnonId(email);

    const newUser = await userData.create({
      name,
      email,
      password: hashedPassword,
      anonId
    });

    const token = setUser(newUser);

    res.status(201)
      .cookie("uid", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false // ⚠️ true in production
      })
      .json({
        message: "Signup successful",
        user: {
          name: newUser.name,
          anonId: newUser.anonId
        },
        token
      });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      message: "Database error",
      details: err.message
    });
  }
}

module.exports = { loginUser, signupUser };