const express = require('express')
const router = express.Router();
const {setUserHealth} = require("../controller/userHealthRoutes") 
router.post('/healthProfile',setUserHealth);
module.exports = router;