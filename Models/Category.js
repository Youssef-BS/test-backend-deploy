const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Market = require('./Market');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

module.exports = Category;