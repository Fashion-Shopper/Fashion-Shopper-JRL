const { INTEGER } = require('sequelize');
const db = require('../db');

///////////////// ORDER MODEL /////////////////
const OrderItem = db.define('orderitem', {
    quantity: {
        type: INTEGER
    }
})

///////////////// EXPORTING /////////////////
module.exports = OrderItem;