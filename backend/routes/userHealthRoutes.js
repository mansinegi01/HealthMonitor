const express = require('express')
const router = express.Router();
const {setUserHealth,getHealthStatus} = require("../controller/userHealthRoutes") 
router.post('/sethealthProfile',setUserHealth);
router.get('/gethealthProfile',getHealthStatus);
module.exports = router;