const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Country",
  tableName: "country",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
    },
    country_code_two: {
      type: "varchar",
      length: 2,
    },
    country_code_three: {
      type: "varchar",
      length: 3,
    },
    mobile_code: {
      type: "int",
    },
    continent_id: {
      type: "int",
    }
  },
});
