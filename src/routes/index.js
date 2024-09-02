const express = require("express");
const { getAirportByIataCode } = require("../controllers/airportController");

const router = express.Router();

// Define route for getting airport by IATA code
router.get("/airport/:iata_code", getAirportByIataCode);

module.exports = router;
