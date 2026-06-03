const express = require('express');

const {
  incomeReport
} = require('../controllers/reports.controller');

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

const {
  validateIncomeReport
} = require('../middlewares/validate.middleware');

const router = express.Router();

router.get(
  '/income',
  authenticateToken,
  authorizeRoles('administrador'),
  validateIncomeReport,
  incomeReport
);

module.exports = router;