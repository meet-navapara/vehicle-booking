const db = require("../models");
const { Op } = require("sequelize");

exports.submitBooking = async (req, res) => {
  const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

  try {
    const overlap = await db.Booking.findOne({
      where: {
        VehicleId: vehicleId,
        [Op.or]: [
          {
            startDate: { [Op.between]: [startDate, endDate] },
          },
          {
            endDate: { [Op.between]: [startDate, endDate] },
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: startDate } },
              { endDate: { [Op.gte]: endDate } },
            ],
          },
        ],
      },
    });

    if (overlap) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "The vehicle is already booked for the selected dates",
        data: null
      });
    }

    const booking = await db.Booking.create({
      firstName,
      lastName,
      startDate,
      endDate,
      VehicleId: vehicleId,
    });

    return res.status(201).json({
      success: true,
      error: false,
      message: "Booking successful",
      data: booking
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
      data: null
    });
  }
};
