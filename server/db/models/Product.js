const db = require("../db");
const { STRING, DECIMAL, TEXT, ENUM } = require("sequelize");

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

  // Another option: just use the association
  // add brand to a product
  // const cdg = await Brand.create({ name: 'comme des garcon' });
  // const shirt = await Product.create({ name: 'some shirt', brandId: cdg.id });

  brandName: {
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
    type: DECIMAL(10,2),
    allowNull: false,
  },
  category: {
    type: ENUM(["jacket","sweatshirt","pants", "tee", "accessory", "bag","shoes"]), //not string
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // gender: {
  //   type: STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
  size: {
    type: ENUM(['XS', 'S','M', 'L', 'XL']),
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
    // john - I changed STRING to TEXT which has a higher limit
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

///////////////// EXPORTING /////////////////
module.exports = Product;
