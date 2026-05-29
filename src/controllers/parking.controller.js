const {
  checkInVehicle,
  getActiveParkingRecords
} = require('../services/parking.service');

const checkIn = async (req, res) => {
  try {
    const parkingRecord = await checkInVehicle(req.body, req.user);

    res.status(201).json({
      message: 'Vehículo parqueado con éxito.',
      data: parkingRecord
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const findActive = async (req, res) => {
  try {
    const activeRecords = await getActiveParkingRecords();

    res.status(200).json({
      message: 'Vehículos parqueados actualmente.',
      data: activeRecords
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  checkIn,
  findActive
};