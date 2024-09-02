const { getRepository } = require("typeorm");
const Airport = require("../entities/Airport");
const City = require("../entities/City");
const Country = require("../entities/Country");

// GET Airport by IATA code
const getAirportByIataCode = async (req, res) => {
  try {
    const { iata_code } = req.params;
    const airportRepository = getRepository(Airport);
    const cityRepository = getRepository(City);
    const countryRepository = getRepository(Country);

    // Fetch airport without relations
    const airport = await airportRepository.findOne({
      where: { iata_code },
    });

    if (!airport) {
      return res.status(404).json({ message: "Airport not found" });
    }

    // Fetch city data if city_id is present
    let city = null;
    if (airport.city_id) {
      city = await cityRepository.findOne({
        where: { id: airport.city_id },
      });
    }

    // Fetch country data if country_id is present
    let country = null;
    if (city && city.country_id) {
      country = await countryRepository.findOne({
        where: { id: city.country_id },
      });
    }

    // Map the fetched data to the desired format
    const response = {
      airport: {
        id: airport.id,
        icao_code: airport.icao_code,
        iata_code: airport.iata_code,
        name: airport.name,
        type: airport.type,
        latitude_deg: parseFloat(airport.latitude_deg), // Ensure float value
        longitude_deg: parseFloat(airport.longitude_deg), // Ensure float value
        elevation_ft: airport.elevation_ft,
        address: {
          city: city ? {
            id: city.id,
            name: city.name,
            country_id: city.country_id,
            is_active: city.is_active,
            lat: parseFloat(city.lat), // Ensure float value
            long: parseFloat(city.long), // Ensure float value
          } : null,
          country: country ? {
            id: country.id,
            name: country.name,
            country_code_two: country.country_code_two,
            country_code_three: country.country_code_three,
            mobile_code: country.mobile_code,
            continent_id: country.continent_id,
          } : null,
        },
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching airport:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAirportByIataCode };
