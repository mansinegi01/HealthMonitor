const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: { type: String, default: "guest" },
  Subject: { type: String },
  Note: { type: String },
  type: { type: String, enum: ["good", "bad"], required: true },
  date: { type: Date, default: Date.now },
});
const userNotes = mongoose.model("userNotes", userSchema);
module.exports = userNotes;
