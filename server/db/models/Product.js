const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;
// *ATTENTION: Temporary Database for syncing data, replace once team decides on how to store data.
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/fashion-shopper-JRL-db"
);

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
  // *ATTENTION: This is a placeholder, will need to make association to have this column.
  designerId: {},
});

///////////////// BRAND MODEL /////////////////

// *ATTENTION: Migrate Brand model to seperate file, then import into Product.js.
const Brand = db.define("brand", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
