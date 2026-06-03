const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

const {
  validateRegisterUser,
  validateLogin
} = require('../middlewares/validate.middleware');

const router = express.Router();

router.post('/user-register', validateRegisterUser, register);
router.post('/user-login', validateLogin, login);
router.get('/me',  authenticateToken, getMe);

module.exports = router;