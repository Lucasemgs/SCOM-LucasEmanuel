const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/users', UserController.getUsers);
router.post('/users', UserController.createUser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
