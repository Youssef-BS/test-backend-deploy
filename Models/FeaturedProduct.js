// FeaturedProduct.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const FeaturedProduct = sequelize.define('FeaturedProduct', {});


module.exports = FeaturedProduct;
