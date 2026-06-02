const {
  createVehicle,
  findVehicleByPlate
} = require('../database/vehicles.db');

const {
  createParkingRecord,
  findActiveParkingByVehicleId,
  findActiveParkingRecords,
  updateParkingRecordCheckOut
} = require('../database/parking.db');

const PARKING_RATES = {
  carro: 3000,
  moto: 2000,
  camioneta: 4000,
  otro: 3000
};

const calculateParkingFee = (entryTime, exitTime, vehicleType) => {
  const entryDate = new Date(entryTime);
  const exitDate = new Date(exitTime);

  const differenceInMilliseconds = exitDate.getTime() - entryDate.getTime();

  const totalMinutes = Math.max(
    1,
    Math.ceil(differenceInMilliseconds / 60000)
  );

  const chargedHours = Math.max(
    1,
    Math.ceil(totalMinutes / 60)
  );

  const ratePerHour = PARKING_RATES[vehicleType] || PARKING_RATES.otro;

  const totalAmount = chargedHours * ratePerHour;

  return {
    totalMinutes,
    chargedHours,
    ratePerHour,
    totalAmount
  };
};

const checkInVehicle = async (checkInData, authenticatedUser) => {
  const { plate } = checkInData;

  if (!plate) {
    throw new Error('Vehicle plate is required');
  }

  const normalizedPlate = plate.trim().toUpperCase();

  let vehicle = await findVehicleByPlate(normalizedPlate);

  if (!vehicle) {
    vehicle = await createVehicle({
      plate: normalizedPlate,
      type: checkInData.type || 'carro',
      brand: checkInData.brand,
      color: checkInData.color,
      createdBy: authenticatedUser.userId
    });
  }

  if (!vehicle.vehicle_active) {
    throw new Error('Vehicle is inactive');
  }

  const activeParking = await findActiveParkingByVehicleId(vehicle.vehicle_id);

  if (activeParking) {
    throw new Error('Vehicle already has an active parking record');
  }

  const parkingRecord = await createParkingRecord({
    vehicleId: vehicle.vehicle_id,
    createdBy: authenticatedUser.userId
  });

  return {
    parkingId: parkingRecord.parking_id,
    vehicleId: vehicle.vehicle_id,
    plate: vehicle.vehicle_plate,
    type: vehicle.vehicle_type,
    brand: vehicle.vehicle_brand,
    color: vehicle.vehicle_color,
    entryTime: parkingRecord.parking_entry_time,
    status: parkingRecord.parking_status,
    createdBy: parkingRecord.parking_created_by
  };
};

const checkOutVehicle = async (checkOutData) => {
  const { plate } = checkOutData;

  if (!plate) {
    throw new Error('Vehicle plate is required');
  }

  const normalizedPlate = plate.trim().toUpperCase();

  const vehicle = await findVehicleByPlate(normalizedPlate);

  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  if (!vehicle.vehicle_active) {
    throw new Error('Vehicle is inactive');
  }

  const activeParking = await findActiveParkingByVehicleId(vehicle.vehicle_id);

  if (!activeParking) {
    throw new Error('Vehicle does not have an active parking record');
  }

  const exitTime = new Date();

  const paymentCalculation = calculateParkingFee(
    activeParking.parking_entry_time,
    exitTime,
    vehicle.vehicle_type
  );

  const updatedParkingRecord = await updateParkingRecordCheckOut({
    parkingId: activeParking.parking_id,
    exitTime,
    totalMinutes: paymentCalculation.totalMinutes,
    totalAmount: paymentCalculation.totalAmount
  });

  return {
    parkingId: updatedParkingRecord.parking_id,
    vehicleId: vehicle.vehicle_id,
    plate: vehicle.vehicle_plate,
    type: vehicle.vehicle_type,
    brand: vehicle.vehicle_brand,
    color: vehicle.vehicle_color,
    entryTime: updatedParkingRecord.parking_entry_time,
    exitTime: updatedParkingRecord.parking_exit_time,
    status: updatedParkingRecord.parking_status,
    totalMinutes: updatedParkingRecord.parking_total_minutes,
    chargedHours: paymentCalculation.chargedHours,
    ratePerHour: paymentCalculation.ratePerHour,
    totalAmount: updatedParkingRecord.parking_total_amount
  };
};

const getActiveParkingRecords = async () => {
  return await findActiveParkingRecords();
};

module.exports = {
  checkInVehicle,
  checkOutVehicle,
  getActiveParkingRecords
};