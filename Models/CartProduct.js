const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Import your Sequelize instance
const Product = require('./Products'); // Import the Product model
const Cart = require('./Cart');

const CartProduct = sequelize.define('CartProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },

}, {
  sequelize,
  modelName: 'CartProduct',
  tableName: 'cart_products'
});

// Define associations

module.exports = CartProduct;
