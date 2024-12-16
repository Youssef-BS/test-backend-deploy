const { DataTypes, Sequelize } = require('sequelize'); // Import Sequelize

const sequelize = require('../config');

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW 
    } , 
    isAdmin : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    } , 
    isVerified : { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    } , 
    acceptRequest : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    } ,
    verificationCode: {
      type: DataTypes.STRING(6),
      allowNull: true
  },
  }, {
  });
  
  console.log(User === sequelize.models.User); 
  
  module.exports = User;
