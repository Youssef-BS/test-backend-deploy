// models/Market.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Market = sequelize.define('Market', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
module.exports = Market;
