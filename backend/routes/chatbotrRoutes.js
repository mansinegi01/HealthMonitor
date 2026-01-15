const express = require("express");
const router = express.Router();
const { handleChat } = require("../controller/chatbotRoutes");

router.post("/message", handleChat);

module.exports = router;
