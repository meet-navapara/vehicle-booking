const express = require("express");
const router = express.Router();
const { submitBooking } = require("../controllers/bookingController");

router.post("/book", submitBooking);

module.exports = router;
