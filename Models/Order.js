const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./User');
const Product = require('./Products');
const OrderHistory = require('./OrderHistory');

const Order = sequelize.define('Order', {
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false    
  },
  orderStatus: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  orderCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: false
  } , 
   comment: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders'
});

// Define associations

module.exports = Order;
