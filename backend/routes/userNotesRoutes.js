const express = require("express");
const router = express.Router();
const { setNotes, getAllNotes } = require("../controller/userNotesRoutes"); 

router.post("/setNotes", setNotes);
router.get("/getNotes", getAllNotes);

module.exports = router;
