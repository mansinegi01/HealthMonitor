
const express = require("express");
const router = express.Router();
const {addMood, getMood} = require('../controller/userMoodRoutes')
router.post("/add",addMood)
router.get("/summary/:userId/:year/:month",getMood)
module.exports = router;