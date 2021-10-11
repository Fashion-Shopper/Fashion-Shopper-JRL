const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;
const db = require("../db");

///////////////// PRODUCT MODEL /////////////////

const Product = db.define("product", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageURL: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: INTEGER,
    allowNull: false,
  },
  category: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  gender: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  size: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  rating: {
    type: INTEGER,
    allowNull: false,
  },
  description: {
    // Note: description has limit of 10,000 characters.
    type: STRING(10000),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

///////////////// EXPORTING /////////////////

module.exports = Product;
