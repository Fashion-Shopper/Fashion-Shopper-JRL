const Sequelize = require("sequelize");
const { STRING } = Sequelize;
const db = require("../db");

///////////////// BRAND MODEL /////////////////

const Brand = db.define("brand", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

///////////////// EXPORTING /////////////////

module.exports = Brand;
