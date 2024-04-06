// models/User.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import the Sequelize instance

const User = sequelize.define('User_sequelize', {
  // Model attributes are defined here
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  umur: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  // Other model options go here
});

// `sequelize.define` creates a table 'users' by default
// with columns 'id', 'firstName', 'lastName', and 'email'

module.exports = User;