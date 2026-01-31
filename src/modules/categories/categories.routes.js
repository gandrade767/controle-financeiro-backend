const express = require('express');
const router = express.Router();

const categoriesController = require('./categories.controller');
const auth = require('../../middlewares/auth');

router.get('/', auth, categoriesController.list);
router.post('/', auth, categoriesController.create);
router.put('/:id', auth, categoriesController.update);
router.patch("/:id/toggle", categoriesController.toggleActive);

module.exports = router;