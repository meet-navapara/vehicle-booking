const db = require("../models");

exports.getTypes = async (req, res) => {
  try {
    const types = await db.VehicleType.findAll({
      where: { wheels: req.params.wheels },
    });
    return res.status(200).json({
      success: true,
      error: false,
      message: "Vehicle types fetched successfully",
      data: types
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Failed to fetch vehicle types",
      data: null
    });
  }
};

exports.getModels = async (req, res) => {
  try {
    const models = await db.Vehicle.findAll({
      where: { VehicleTypeId: req.params.typeId },
    });
    return res.status(200).json({
      success: true,
      error: false,
      message: "Vehicle models fetched successfully",
      data: models
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Failed to fetch vehicle models",
      data: null
    });
  }
};
