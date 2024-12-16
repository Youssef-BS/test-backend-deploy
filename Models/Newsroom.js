const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Newsroom = sequelize.define('Newsroom', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
});


module.exports = Newsroom;