const { Client } = require('pg');
const db = require("../models");

const dbName = process.env.DB_NAME || 'vehicle';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;

async function ensureDatabaseExists() {
  const client = new Client({
    user: dbUser,
    host: dbHost,
    password: dbPassword,
    port: dbPort,
    database: 'postgres',
  });

  await client.connect();

  // Check if database exists
  const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);
  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database "${dbName}" created!`);
  } else {
    console.log(`Database "${dbName}" already exists.`);
  }

  await client.end();
}

const seed = async () => {
  await db.sequelize.sync({ force: true });

  const bikeType = await db.VehicleType.create({ name: "Cruiser", wheels: 2 });
  const scooterType = await db.VehicleType.create({ name: "Scooter", wheels: 2 });
  const carTypes = await Promise.all([
    db.VehicleType.create({ name: "Hatchback", wheels: 4 }),
    db.VehicleType.create({ name: "SUV", wheels: 4 }),
    db.VehicleType.create({ name: "Sedan", wheels: 4 }),
  ]);

  // Bikes
  await db.Vehicle.create({ id: 443, model: "Amza", VehicleTypeId: bikeType.id });
  await db.Vehicle.create({ id: 334343, model: "Splendor (Model 1)", VehicleTypeId: bikeType.id });
  await db.Vehicle.create({ id: 32324, model: "Pulsar (Model 2)", VehicleTypeId: bikeType.id });
  await db.Vehicle.create({ id: 1001, model: "Apache (Model 3)", VehicleTypeId: bikeType.id });
  await db.Vehicle.create({ id: 1002, model: "FZ (Model 4)", VehicleTypeId: bikeType.id });
  await db.Vehicle.create({ id: 1003, model: "Duke (Model 5)", VehicleTypeId: bikeType.id });
  await db.Vehicle.create({ id: 1004, model: "CB Shine (Model 6)", VehicleTypeId: bikeType.id });
  await db.Vehicle.create({ id: 1005, model: "Activa (Model 7)", VehicleTypeId: bikeType.id });
  await db.Vehicle.create({ id: 1006, model: "Access (Model 8)", VehicleTypeId: bikeType.id });
  await db.Vehicle.create({ id: 1007, model: "Jupiter (Model 9)", VehicleTypeId: bikeType.id });

  // Scooters
  await db.Vehicle.create({ id: 5001, model: "Honda Activa", VehicleTypeId: scooterType.id });
  await db.Vehicle.create({ id: 5002, model: "TVS Jupiter", VehicleTypeId: scooterType.id });
  await db.Vehicle.create({ id: 5003, model: "Suzuki Access", VehicleTypeId: scooterType.id });
  await db.Vehicle.create({ id: 5004, model: "Hero Maestro", VehicleTypeId: scooterType.id });
  await db.Vehicle.create({ id: 5005, model: "Yamaha Fascino", VehicleTypeId: scooterType.id });
  await db.Vehicle.create({ id: 5006, model: "Vespa LX", VehicleTypeId: scooterType.id });
  await db.Vehicle.create({ id: 5007, model: "Aprilia SR 125", VehicleTypeId: scooterType.id });
  await db.Vehicle.create({ id: 5008, model: "Honda Dio", VehicleTypeId: scooterType.id });
  await db.Vehicle.create({ id: 5009, model: "TVS Scooty Pep+", VehicleTypeId: scooterType.id });
  await db.Vehicle.create({ id: 5010, model: "Suzuki Burgman", VehicleTypeId: scooterType.id });

  // Hatchbacks
  await db.Vehicle.create({ id: 2001, model: "Maruti Swift", VehicleTypeId: carTypes[0].id });
  await db.Vehicle.create({ id: 2002, model: "Hyundai i20", VehicleTypeId: carTypes[0].id });
  await db.Vehicle.create({ id: 2003, model: "Tata Tiago", VehicleTypeId: carTypes[0].id });
  await db.Vehicle.create({ id: 2004, model: "Honda Brio", VehicleTypeId: carTypes[0].id });
  await db.Vehicle.create({ id: 2005, model: "Ford Figo", VehicleTypeId: carTypes[0].id });
  await db.Vehicle.create({ id: 2006, model: "Volkswagen Polo", VehicleTypeId: carTypes[0].id });
  await db.Vehicle.create({ id: 2007, model: "Renault Kwid", VehicleTypeId: carTypes[0].id });
  await db.Vehicle.create({ id: 2008, model: "Datsun Go", VehicleTypeId: carTypes[0].id });
  await db.Vehicle.create({ id: 2009, model: "Chevrolet Beat", VehicleTypeId: carTypes[0].id });
  await db.Vehicle.create({ id: 2010, model: "Nissan Micra", VehicleTypeId: carTypes[0].id });

  // SUVs
  await db.Vehicle.create({ id: 3001, model: "Hyundai Creta", VehicleTypeId: carTypes[1].id });
  await db.Vehicle.create({ id: 3002, model: "Kia Seltos", VehicleTypeId: carTypes[1].id });
  await db.Vehicle.create({ id: 3003, model: "Tata Harrier", VehicleTypeId: carTypes[1].id });
  await db.Vehicle.create({ id: 3004, model: "MG Hector", VehicleTypeId: carTypes[1].id });
  await db.Vehicle.create({ id: 3005, model: "Mahindra XUV700", VehicleTypeId: carTypes[1].id });
  await db.Vehicle.create({ id: 3006, model: "Toyota Fortuner", VehicleTypeId: carTypes[1].id });
  await db.Vehicle.create({ id: 3007, model: "Jeep Compass", VehicleTypeId: carTypes[1].id });
  await db.Vehicle.create({ id: 3008, model: "Ford EcoSport", VehicleTypeId: carTypes[1].id });
  await db.Vehicle.create({ id: 3009, model: "Renault Duster", VehicleTypeId: carTypes[1].id });
  await db.Vehicle.create({ id: 3010, model: "Honda WR-V", VehicleTypeId: carTypes[1].id });

  // Sedans
  await db.Vehicle.create({ id: 4001, model: "Honda City (Model 1)", VehicleTypeId: carTypes[2].id });
  await db.Vehicle.create({ id: 4002, model: "Hyundai Verna", VehicleTypeId: carTypes[2].id });
  await db.Vehicle.create({ id: 4003, model: "Maruti Ciaz", VehicleTypeId: carTypes[2].id });
  await db.Vehicle.create({ id: 4004, model: "Skoda Rapid", VehicleTypeId: carTypes[2].id });
  await db.Vehicle.create({ id: 4005, model: "Volkswagen Vento", VehicleTypeId: carTypes[2].id });
  await db.Vehicle.create({ id: 4006, model: "Toyota Yaris", VehicleTypeId: carTypes[2].id });
  await db.Vehicle.create({ id: 4007, model: "Honda Amaze", VehicleTypeId: carTypes[2].id });
  await db.Vehicle.create({ id: 4008, model: "Tata Tigor", VehicleTypeId: carTypes[2].id });
  await db.Vehicle.create({ id: 4009, model: "Ford Aspire", VehicleTypeId: carTypes[2].id });
  await db.Vehicle.create({ id: 4010, model: "Nissan Sunny", VehicleTypeId: carTypes[2].id });

  console.log("Seed complete!");
};

// Ensure DB exists, then seed
ensureDatabaseExists().then(seed).catch(err => {
  console.error('Error ensuring database exists or seeding:', err);
});
