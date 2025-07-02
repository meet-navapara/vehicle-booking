require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
app.use(cors());

const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use(express.json());
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

db.sequelize.authenticate().then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
