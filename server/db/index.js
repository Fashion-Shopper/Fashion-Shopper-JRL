const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const Brand = require("./models/Brand");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

///////////////// ASSOCIATIONS /////////////////
Product.belongsTo(Brand);
Brand.hasMany(Product);

Order.belongsTo(User);
User.hasMany(Order);

// OrderItem.belongsTo(Order);
// Order.hasMany(OrderItem);

OrderItem.belongsTo(Product);
Product.hasMany(OrderItem);

module.exports = {
  db,
  models: {
    User,
    Product,
    Brand,
    Order,
    OrderItem,
  },
};
