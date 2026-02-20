const express = require('express');
const router = express.Router();
const { getTodayVisitors } = require('../controllers/analyticsController');

router.get('/visitors/today', getTodayVisitors);

module.exports = router;
