const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Work Wise Backend is healthy')
})

module.exports = router;