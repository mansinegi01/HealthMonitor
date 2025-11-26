
const express = require("express");
const router = express.Router();
const { sethealthProfile, gethealthProfile } = require("../controller/userHealthRoutes"); 
const { restrictUser } = require("../middlewares/auth");

router.post("/sethealthProfile", restrictUser, sethealthProfile);
router.get("/gethealthProfile", restrictUser, gethealthProfile);

module.exports = router;
