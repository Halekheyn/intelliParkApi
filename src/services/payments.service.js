const {
  createPayment,
  findPaymentById,
  findPaymentByParkingId,
  findAllPayments,
  findParkingRecordForPayment
} = require('../database/payments.db');

const VALID_PAYMENT_METHODS = [
  'efectivo',
  'transferencia',
  'tarjeta',
  'otro'
];

const registerPayment = async (paymentData, authenticatedUser) => {
  const { parkingId, paymentMethod, paymentReference } = paymentData;

  if (!parkingId) {
    throw new Error('Parqueo ID requerido.');
  }

  const selectedPaymentMethod = paymentMethod || 'efectivo';

  if (!VALID_PAYMENT_METHODS.includes(selectedPaymentMethod)) {
    throw new Error('Método de pago invalido.');
  }

  const parkingRecord = await findParkingRecordForPayment(parkingId);

  if (!parkingRecord) {
    throw new Error('No se encontró el registro de estacionamiento.');
  }

  if (parkingRecord.parking_status !== 'finalizado') {
    throw new Error('Solo se pueden pagar los registros de estacionamiento finalizados.');
  }

  if (!parkingRecord.parking_total_amount) {
    throw new Error('El registro de estacionamiento no tiene una cantidad calculada.');
  }

  const existingPayment = await findPaymentByParkingId(parkingId);

  if (existingPayment) {
    throw new Error('Payment already exists for this parking record');
  }

  const payment = await createPayment({
    parkingId,
    paymentMethod: selectedPaymentMethod,
    paymentAmount: parkingRecord.parking_total_amount,
    paymentReference,
    createdBy: authenticatedUser.userId
  });

  return {
    paymentId: payment.payment_id,
    parkingId: payment.parking_id,
    plate: parkingRecord.vehicle_plate,
    vehicleType: parkingRecord.vehicle_type,
    paymentMethod: payment.payment_method,
    paymentAmount: payment.payment_amount,
    paymentReference: payment.payment_reference,
    totalMinutes: parkingRecord.parking_total_minutes,
    entryTime: parkingRecord.parking_entry_time,
    exitTime: parkingRecord.parking_exit_time,
    createdBy: payment.payment_created_by,
    createdAt: payment.payment_created_at
  };
};

const getAllPayments = async () => {
  return await findAllPayments();
};

const getPaymentById = async (paymentId) => {
  if (!paymentId) {
    throw new Error('Se requiere el ID de pago.');
  }

  const payment = await findPaymentById(paymentId);

  if (!payment) {
    throw new Error('Pago no encontrado');
  }

  return payment;
};

const getPaymentByParkingId = async (parkingId) => {
  if (!parkingId) {
    throw new Error('Se requiere el ID de pago.');
  }

  const payment = await findPaymentByParkingId(parkingId);

  if (!payment) {
    throw new Error('No se encontró el pago para este registro de estacionamiento.');
  }

  return payment;
};

module.exports = {
  registerPayment,
  getAllPayments,
  getPaymentById,
  getPaymentByParkingId
};