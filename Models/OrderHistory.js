const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Order = require('./Order');

const OrderHistory = sequelize.define('OrderHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true
  },
  attachmentUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'OrderHistory',
  tableName: 'order_history'
});

// Define associations

module.exports = OrderHistory;
