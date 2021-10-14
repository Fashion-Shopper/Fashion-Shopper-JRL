const { BOOLEAN } = require('sequelize');
const db = require('../db');

///////////////// ORDER MODEL /////////////////
const Order = db.define('order', {
    isCart: {
        type: BOOLEAN,
        defaultValue: true,
    }
})

///////////////// EXPORTING /////////////////
module.exports = Order;