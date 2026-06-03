const express = require('express');

const {
  create,
  findAll,
  findById,
  findByParkingId
} = require('../controllers/payments.controller');

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

const {
  validatePayment,
  validateIdParam,
  validateParkingIdParam
} = require('../middlewares/validate.middleware');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  validatePayment,
  create
);

router.get(
  '/',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  findAll
);

router.get(
  '/parking/:parkingId',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  validateParkingIdParam,
  findByParkingId
);

router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  validateIdParam,
  findById
);

module.exports = router;