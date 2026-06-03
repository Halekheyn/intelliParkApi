const express = require('express');
const {
  findAll,
  findById,
  updateStatus
} = require('../controllers/users.controller');

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

const {
  validateUserIdParam,
  validateUserStatus
} = require('../middlewares/validate.middleware');

const router = express.Router();

router.get(
  '/',
  authenticateToken,
  authorizeRoles('administrador'),
  findAll
);

router.get(
  '/:user_id',
  authenticateToken,
  authorizeRoles('administrador'),
  validateUserIdParam,
  findById
);

router.patch(
  '/:user_id/status',
  authenticateToken,
  authorizeRoles('administrador'),
  validateUserStatus,
  updateStatus
);

module.exports = router;