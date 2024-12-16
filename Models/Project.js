const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Project;
