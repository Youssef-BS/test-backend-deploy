const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Subcategory = require('./Subcategory');

const SubSubcategory = sequelize.define('SubSubcategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

module.exports = SubSubcategory;