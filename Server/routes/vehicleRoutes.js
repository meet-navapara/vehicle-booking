const express = require("express");
const router = express.Router();
const { getTypes, getModels } = require("../controllers/vehicleController");

router.get("/types/:wheels", getTypes);
router.get("/models/:typeId", getModels);

module.exports = router;
