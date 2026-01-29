const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const dashboardController = require('./dashboard.controller');

router.get('/summary', auth, dashboardController.summary);
router.get('/by-category', auth, dashboardController.byCategory);
router.get('/monthly', auth, dashboardController.monthly);

module.exports = router;