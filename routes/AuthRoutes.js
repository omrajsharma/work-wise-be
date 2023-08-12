const express = require('express');
const router = express.Router();
const {registerUser} = require('../controller/AuthController');

router.post('/register', registerUser);

module.exports = router;