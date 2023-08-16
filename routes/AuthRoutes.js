const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getProfile} = require('../controller/AuthController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile)

module.exports = router;