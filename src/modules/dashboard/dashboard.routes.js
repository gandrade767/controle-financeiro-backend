const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const dashboardController = require('./dashboard.controller');


router.get('/summary', auth, dashboardController.summary);

module.exports = router;