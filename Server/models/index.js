const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config").development;

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.VehicleType = require("./vehicleType")(sequelize, DataTypes);
db.Vehicle = require("./vehicle")(sequelize, DataTypes);
db.Booking = require("./booking")(sequelize, DataTypes);

// Associations
db.VehicleType.hasMany(db.Vehicle);
db.Vehicle.belongsTo(db.VehicleType);

db.Vehicle.hasMany(db.Booking);
db.Booking.belongsTo(db.Vehicle);

module.exports = db;
