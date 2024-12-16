const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Gallery = sequelize.define('Gallery', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Gallery;
