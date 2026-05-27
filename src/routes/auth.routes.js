const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/user-register', register);
router.post('/user-login', login);
router.get('/me',  authenticateToken, getMe);

module.exports = router;