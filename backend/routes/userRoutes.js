const express = require('express')
const router = express.Router();
const {loginUser, signupUser} = require('../controller/userRoutes')
const {restrictUser} = require('../middlewares/auth')
router.post('/login',loginUser);
router.post('/signup',signupUser);
router.get('/verify', restrictUser, (req, res) => {
  res.json({ user: req.user });
});


module.exports = router;