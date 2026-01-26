const express = require('express');
const router = express.Router();

const usersController = require('./users.controller');
const auth = require('../../middlewares/auth');

router.post('/', auth, usersController.createUser);
router.get('/', auth, usersController.listUsers);
router.put('/:id', auth, usersController.updateUser);
router.put('/:id/password', auth, usersController.updatePassword);
router.put('/:id/status', auth, usersController.updateStatus);
router.delete('/:id', auth, usersController.deleteUser);

module.exports = router;
