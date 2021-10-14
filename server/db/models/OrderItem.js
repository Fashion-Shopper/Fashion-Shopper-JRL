const { INTEGER, STRING } = require('sequelize');
const db = require('../db');

///////////////// ORDERITEM MODEL /////////////////
const OrderItem = db.define('orderitem', {
    itemName: {
        type: STRING,
    },
    quantity: {
        type: INTEGER
    }
})

///////////////// EXPORTING /////////////////
module.exports = OrderItem;