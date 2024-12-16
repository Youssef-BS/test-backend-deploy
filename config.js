const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shoping', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
});

module.exports = sequelize;
