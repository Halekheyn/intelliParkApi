const express = require('express');

const {
  create,
  findAll,
  findById,
  findByPlate
} = require('../controllers/vehicles.controller');

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

const {
  validateVehicle,
  validateIdParam,
  validatePlateParam
} = require('../middlewares/validate.middleware');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  validateVehicle,
  create
);

router.get(
  '/',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  findAll
);

router.get(
  '/plate/:plate',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  validatePlateParam,
  findByPlate
);

router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('administrador', 'operador'),
  validateIdParam,
  findById
);

module.exports = router;