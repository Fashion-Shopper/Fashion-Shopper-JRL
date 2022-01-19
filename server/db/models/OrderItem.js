const { INTEGER, STRING } = require('sequelize');
const db = require('../db');

///////////////// ORDERITEM MODEL /////////////////
const OrderItem = db.define('orderitem', {
    // itemName: {
    //     type: STRING,
    // },
    quantity: {
        type: INTEGER
    }
    // ,
    // size: {
    //     type: INTEGER,
    // },
    //maybe 3 colors to pick
    // color: {
    //     type: 
    // }
})

///////////////// EXPORTING /////////////////
module.exports = OrderItem;