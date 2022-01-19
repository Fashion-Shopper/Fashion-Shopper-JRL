const { BOOLEAN, INTEGER, STRING, TEXT } = require('sequelize');
const db = require('../db');

///////////////// ORDER MODEL /////////////////
const Order = db.define('order', {
    isCart: {
        type: BOOLEAN,
        defaultValue: true,
    },
    shippingName: {
        type: STRING,
        defaultValue: 'Guess User'
    },
    shippingAddress: {
        type: TEXT,
    }
})

///////////////// EXPORTING /////////////////
module.exports = Order;