const { TEXT, STRING } = require("sequelize");
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
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

///////////////// EXPORTING /////////////////
module.exports = Brand;
