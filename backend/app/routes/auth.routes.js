const express = require('express');
const AuthController = require('../controller/Auth.controller');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/protected', AuthController.authenticate);

module.exports = router;
