const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Import your Sequelize instance
const Product = require('./Products'); // Import the Product model

const OrderProduct = sequelize.define('OrderProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  sequelize,
  modelName: 'OrderProduct',
  tableName: 'order_products'
});

// Define associations

module.exports = OrderProduct;
