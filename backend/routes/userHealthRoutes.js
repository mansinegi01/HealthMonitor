// const express = require('express')
// const router = express.Router();
// const {sethealthProfile,gethealthProfile} = require("../controller/userHealthRoutes") 
// router.post('/sethealthProfile',sethealthProfile);
// router.get('/gethealthProfile/:userId',gethealthProfile);
// module.exports = router;
const express = require("express");
const router = express.Router();
const { sethealthProfile, gethealthProfile } = require("../controller/userHealthRoutes"); 
const { restrictUser } = require("../middlewares/auth");

// ✅ Auth-protected routes
router.post("/sethealthProfile", restrictUser, sethealthProfile);
router.get("/gethealthProfile", restrictUser, gethealthProfile);

module.exports = router;
