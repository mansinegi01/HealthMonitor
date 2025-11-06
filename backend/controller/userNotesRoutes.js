const userNotes = require("../model/notes");

async function setNotes(req, res) {
  try {
    const { userId, Subject, Note, type } = req.body;

    if (!type) {
      return res.status(400).json({ msg: "Note type is required" });
    }

    const NOTE = await userNotes.create({
      userId: userId || "guest",
      Subject: Subject || "Daily Note",
      Note: Note || `User is feeling ${type}`,
      type,
      date: new Date(),
    });

    res.status(201).json({ msg: "Note saved successfully", note: NOTE });
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
}

async function getAllNotes(req, res) {
  try {
    const notes = await userNotes.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching notes", error: err.message });
  }
}

module.exports = { setNotes, getAllNotes };
