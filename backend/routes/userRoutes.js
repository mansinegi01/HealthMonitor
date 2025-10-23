const express = require('express')
const router = express.Router();
const {loginUser, signupUser} = require('../controller/userRoutes')

router.get('/login',loginUser);
router.get('/signup',signupUser);

module.exports = {router};