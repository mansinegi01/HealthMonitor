const userNotes = require("../model/notes");

async function setNotes(req, res) {
  console.log("REQ BODY:", req.body);
console.log("REQ USER:", req.user?._id);
  try {

    const { Subject, Note, type } = req.body;

    if (!type) {
      return res.status(400).json({ msg: "Note type is required" });
    }

    const userId = req.user?._id || req.user?.id || "guest";

    const newNote = await userNotes.create({
      userId,
      Subject: Subject || "Daily Note",
      Note: Note || `User is feeling ${type}`,
      type, 
      date: new Date(),
    });

    res.status(201).json({
      msg: "Note saved successfully",
      note: newNote,
    });
  } catch (err) {
    console.error(" Error saving note:", err);
    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
}

async function getAllNotes(req, res) {
  try {
    const userId = req.user?._id || req.user?.id;
    const notes = await userNotes.find(userId ? { userId } : {}).sort({ date: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching notes", error: err.message });
  }
}

module.exports = { setNotes, getAllNotes };
