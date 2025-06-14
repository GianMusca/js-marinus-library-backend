const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/:id', userController.showProfile);
router.post('/', userController.createUser);

module.exports = router;