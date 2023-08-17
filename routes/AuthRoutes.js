const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getProfile, logoutUser} = require('../controller/AuthController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.get('/logout', logoutUser);

module.exports = router;