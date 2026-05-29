const express = require('express');

const {
  checkIn,
  findActive
} = require('../controllers/parking.controller');

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

const router = express.Router();

router.post(
  '/check-in',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  checkIn
);

router.get(
  '/active',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  findActive
);

module.exports = router;