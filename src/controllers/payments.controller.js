const {
  registerPayment,
  getAllPayments,
  getPaymentById,
  getPaymentByParkingId
} = require('../services/payments.service');

const create = async (req, res) => {
  try {
    const payment = await registerPayment(req.body, req.user);

    res.status(201).json({
      message: 'Payment registered successfully',
      data: payment
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const findAll = async (req, res) => {
  try {
    const payments = await getAllPayments();

    res.status(200).json({
      message: 'Payments retrieved successfully',
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const findById = async (req, res) => {
  try {
    const payment = await getPaymentById(req.params.id);

    res.status(200).json({
      message: 'Payment retrieved successfully',
      data: payment
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

const findByParkingId = async (req, res) => {
  try {
    const payment = await getPaymentByParkingId(req.params.parkingId);

    res.status(200).json({
      message: 'Payment retrieved successfully',
      data: payment
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

module.exports = {
  create,
  findAll,
  findById,
  findByParkingId
};