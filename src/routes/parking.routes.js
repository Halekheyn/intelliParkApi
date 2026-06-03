const express = require('express');

const {
  checkIn,
  checkOut,
  findActive
} = require('../controllers/parking.controller');

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

const {
  validateCheckIn,
  validateCheckOut
} = require('../middlewares/validate.middleware');

const router = express.Router();

router.post(
  '/check-in',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  validateCheckIn,
  checkIn
);

router.post(
  '/check-out',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  validateCheckOut,
  checkOut
);

router.get(
  '/active',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  findActive
);

module.exports = router;