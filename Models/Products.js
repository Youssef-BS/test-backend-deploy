const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Category = require('./Category');
const Market = require('./Market');
const Subcategory = require('./Subcategory');
const SubSubcategory = require('./SubSubcategory');
const Project = require('./Project');

const Product = sequelize.define('Product', {
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  extra_image: {
    type: DataTypes.JSON,
    allowNull: true 
  },
  extra_video: {
    type: DataTypes.JSON,
    allowNull: true 
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock_eta: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  features: {
    type: DataTypes.STRING,
    allowNull: false
  },
  technical_details: {
    type: DataTypes.JSON, 
    allowNull: true 
  },
 

});


module.exports = Product;