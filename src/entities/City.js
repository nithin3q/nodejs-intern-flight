const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "City",
  tableName: "city",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
    },
    lat: {
      type: "float",  // Changed from "decimal" to "float"
    },
    long: {
      type: "float",  // Changed from "decimal" to "float"
    },
    country_id: {
      type: "int",
      nullable: true,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
  },
  relations: {
    country: {
      target: "Country",
      type: "many-to-one",
      joinColumn: { name: "country_id" },
    },
  },
});
