const {
  createVehicle,
  findAllVehicles,
  findVehicleById,
  findVehicleByPlate
} = require('../database/vehicles.db');

const registerVehicle = async (vehicleData, authenticatedUser) => {
  const { plate } = vehicleData;

  if (!plate) {
    throw new Error('La placa del vehículo ya esta registrada.');
  }

  const normalizedPlate = plate.trim().toUpperCase();

  const existingVehicle = await findVehicleByPlate(normalizedPlate);

  if (existingVehicle) {
    throw new Error('El veh');
  }

  const newVehicle = await createVehicle({
    plate: normalizedPlate,
    type: vehicleData.type || 'carro',
    brand: vehicleData.brand,
    color: vehicleData.color,
    createdBy: authenticatedUser.userId
  });

  return newVehicle;
};

const getAllVehicles = async () => {
  return await findAllVehicles();
};

const getVehicleById = async (vehicleId) => {
  const vehicle = await findVehicleById(vehicleId);

  if (!vehicle) {
    throw new Error('Vehículo no encontrado.');
  }

  return vehicle;
};

const getVehicleByPlate = async (plate) => {
  if (!plate) {
    throw new Error('La placa del vehiculo es requerida');
  }

  const normalizedPlate = plate.trim().toUpperCase();

  const vehicle = await findVehicleByPlate(normalizedPlate);

  if (!vehicle) {
    throw new Error('Vehículo no enctrado');
  }

  return vehicle;
};

module.exports = {
  registerVehicle,
  getAllVehicles,
  getVehicleById,
  getVehicleByPlate
};