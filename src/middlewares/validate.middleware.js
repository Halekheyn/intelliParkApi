const VALID_ROLES = ['administrador', 'operador'];
const VALID_VEHICLE_TYPES = ['carro', 'moto'];
const VALID_PAYMENT_METHODS = ['efectivo', 'transferencia', 'tarjeta', 'otro'];

const sendValidationError = (res, errors) => {
  return res.status(400).json({
    message: 'Error de validación',
    errors
  });
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isPositiveInteger = (value) => {
  const numberValue = Number(value);
  return Number.isInteger(numberValue) && numberValue > 0;
};

const isValidDate = (dateValue) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateValue);
};

const validateRegisterUser = (req, res, next) => {
  const errors = [];
  const { user_first_name, user_last_name, user_email, user_password, user_role } = req.body;

  if (!user_first_name || typeof user_first_name !== 'string') {
    errors.push('First name is required and must be text');
  }

  if (!user_last_name || typeof user_last_name !== 'string') {
    errors.push('Last name is required and must be text');
  }

  if (!user_email || typeof user_email !== 'string') {
    errors.push('Email is required and must be text');
  } else if (!isValidEmail(user_email)) {
    errors.push('Email format is invalid');
  }

  if (!user_password || typeof user_password !== 'string') {
    errors.push('Password is required and must be text');
  } else if (user_password.length < 6) {
    errors.push('Password must have at least 6 characters');
  }

  if (user_role && !VALID_ROLES.includes(user_role)) {
    errors.push('Role is invalid');
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};

const validateLogin = (req, res, next) => {
  const errors = [];
  const { user_email, user_password } = req.body;

  if (!user_email || typeof user_email !== 'string') {
    errors.push('Email is required and must be text');
  } else if (!isValidEmail(user_email)) {
    errors.push('Email format is invalid');
  }

  if (!user_password || typeof user_password !== 'string') {
    errors.push('Password is required and must be text');
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};

const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!isPositiveInteger(id)) {
    return sendValidationError(res, ['Id must be a positive integer']);
  }

  return next();
};

const validateUserIdParam = (req, res, next) => {
  const { user_id } = req.params;

  if (!isPositiveInteger(id)) {
    return sendValidationError(res, ['User Id must be a positive integer']);
  }
  return next();
};

const validateParkingIdParam = (req, res, next) => {
  const { parkingId } = req.params;

  if (!isPositiveInteger(parkingId)) {
    return sendValidationError(res, ['Parking id must be a positive integer']);
  }

  return next();
};

const validateUserStatus = (req, res, next) => {
  const { user_active } = req.body;

  if (typeof user_active !== 'boolean') {
    return sendValidationError(res, ['Active value must be true or false']);
  }

  return next();
};

const validateVehicle = (req, res, next) => {
  const errors = [];
  const { plate, type, brand, color } = req.body;

  if (!plate || typeof plate !== 'string') {
    errors.push('Vehicle plate is required and must be text');
  } else if (plate.trim().length > 15) {
    errors.push('Vehicle plate must have maximum 15 characters');
  }

  if (type && !VALID_VEHICLE_TYPES.includes(type)) {
    errors.push('Vehicle type is invalid');
  }

  if (brand && typeof brand !== 'string') {
    errors.push('Vehicle brand must be text');
  }

  if (color && typeof color !== 'string') {
    errors.push('Vehicle color must be text');
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};

const validatePlateParam = (req, res, next) => {
  const { plate } = req.params;

  if (!plate || typeof plate !== 'string') {
    return sendValidationError(res, ['Vehicle plate is required']);
  }

  return next();
};

const validateCheckIn = (req, res, next) => {
  const errors = [];
  const { plate, type, brand, color } = req.body;

  if (!plate || typeof plate !== 'string') {
    errors.push('Vehicle plate is required and must be text');
  } else if (plate.trim().length > 15) {
    errors.push('Vehicle plate must have maximum 15 characters');
  }

  if (type && !VALID_VEHICLE_TYPES.includes(type)) {
    errors.push('Vehicle type is invalid');
  }

  if (brand && typeof brand !== 'string') {
    errors.push('Vehicle brand must be text');
  }

  if (color && typeof color !== 'string') {
    errors.push('Vehicle color must be text');
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};

const validateCheckOut = (req, res, next) => {
  const { plate } = req.body;

  if (!plate || typeof plate !== 'string') {
    return sendValidationError(res, ['Vehicle plate is required and must be text']);
  }

  if (plate.trim().length >= 5) {
    return sendValidationError(res, ['Vehicle plate must have minimun 5 characters']);
  }

  return next();
};

const validatePayment = (req, res, next) => {
  const errors = [];
  const { parkingId, paymentMethod, paymentReference } = req.body;

  if (!parkingId || !isPositiveInteger(parkingId)) {
    errors.push('Parking id is required and must be a positive integer');
  }

  if (paymentMethod && !VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    errors.push('Payment method is invalid');
  }

  if (paymentReference && typeof paymentReference !== 'string') {
    errors.push('Payment reference must be text');
  }

  if (paymentReference && paymentReference.length > 100) {
    errors.push('Payment reference must have maximum 100 characters');
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};

const validateIncomeReport = (req, res, next) => {
  const errors = [];
  const { from, to } = req.query;

  if (from && !isValidDate(from)) {
    errors.push('From date must have format YYYY-MM-DD');
  }

  if (to && !isValidDate(to)) {
    errors.push('To date must have format YYYY-MM-DD');
  }

  if (from && to && isValidDate(from) && isValidDate(to) && from > to) {
    errors.push('From date cannot be greater than to date');
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};

module.exports = {
  validateRegisterUser,
  validateLogin,
  validateIdParam,
  validateParkingIdParam,
  validateUserStatus,
  validateVehicle,
  validatePlateParam,
  validateCheckIn,
  validateCheckOut,
  validatePayment,
  validateIncomeReport,
  validateUserIdParam
};