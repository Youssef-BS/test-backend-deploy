const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Import your Sequelize instance
const User = require('./User')
const Wishlist = sequelize.define('Wishlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1
  },

}, {
  sequelize,
  modelName: 'wishlist',
  tableName: 'wishlits'
});

module.exports = Wishlist;
