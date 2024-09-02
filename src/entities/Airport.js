const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Airport",
  tableName: "airport",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    icao_code: {
      type: "varchar",
      length: 10,
    },
    iata_code: {
      type: "varchar",
      length: 3,
    },
    name: {
      type: "varchar",
    },
    type: {
      type: "varchar",
    },
    latitude_deg: {
      type: "decimal",
      precision: 15,
      scale: 10,
    },
    longitude_deg: {
      type: "decimal",
      precision: 15,
      scale: 10,
    },
    elevation_ft: {
      type: "int",
      nullable: true,
    },
    city_id: {
      type: "int",
      nullable: true,
    },
    country_id: {
      type: "int",
      nullable: true,
    },
  },
});
