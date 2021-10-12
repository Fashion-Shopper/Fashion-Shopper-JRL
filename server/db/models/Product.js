const Sequelize = require("sequelize");
const { STRING, INTEGER, DECIMAL } = Sequelize;
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
  // Note: the brand column will be used to pair Product with Brand via script/seed.js.
  // john - I comment this out because this is automatically create by the association in the indexjs
  // brand: {
  //   type: STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
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
    type: DECIMAL,
    validate: {
      isNumeric: true,
      min: 0.0,
      max: 5.0,
    },
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
