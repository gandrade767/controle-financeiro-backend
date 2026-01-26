const express = require('express');
const router = express.Router();

const categoriesController = require('./categories.controller');
const auth = require('../../middlewares/auth');

router.get('/', auth, categoriesController.list);
router.post('/', auth, categoriesController.create);
router.put('/:id', auth, categoriesController.update);

module.exports = router;