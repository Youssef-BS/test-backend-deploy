const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const ProjectProduct = sequelize.define('ProjectProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

});

module.exports = ProjectProduct;
