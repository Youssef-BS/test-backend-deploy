const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const ProductRelation = sequelize.define('ProductRelation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
});

module.exports = ProductRelation;
