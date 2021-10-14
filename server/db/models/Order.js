const { BOOLEAN } = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    isCart: {
        type: BOOLEAN,
        defaultValue: true,
    }
})