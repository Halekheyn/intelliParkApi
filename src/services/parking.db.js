const {
  createVehicle,
  findVehicleByPlate
} = require('../database/vehicles.db');

const {
  createParkingRecord,
  findActiveParkingByVehicleId,
  findActiveParkingRecords
} = require('../database/parking.db');

const checkInVehicle = async (checkInData, authenticatedUser) => {
  const { plate } = checkInData;

  if (!plate) {
    throw new Error('La placa del vehículo es requerido.');
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
    throw new Error('Vehículo inactivo');
  }

  const activeParking = await findActiveParkingByVehicleId(vehicle.vehicle_id);

  if (activeParking) {
    throw new Error('Actualmente el vehículo esta registrado como parqueado.');
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

const getActiveParkingRecords = async () => {
  return await findActiveParkingRecords();
};

module.exports = {
  checkInVehicle,
  getActiveParkingRecords
};