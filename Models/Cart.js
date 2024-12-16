const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Import your Sequelize instance
const User = require('./User')
const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  totale: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1
  },

}, {
  sequelize,
  modelName: 'Cart',
  tableName: 'carts'
});

module.exports = Cart;
