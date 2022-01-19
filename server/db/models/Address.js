const {  TEXT } = require('sequelize');
const db = require('../db');

///////////////// ORDER MODEL /////////////////
const Address = db.define('address', {
    place: {
        type: TEXT,
        allowNull: false 
    }
})

///////////////// EXPORTING /////////////////
module.exports = Address;