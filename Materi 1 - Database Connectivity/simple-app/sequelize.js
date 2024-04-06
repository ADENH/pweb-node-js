// sequelize.js
const { Sequelize } = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize('praktisi_mengajar', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // Change this to your database dialect (e.g., postgres, sqlite)
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection(); // Call the function to test the connection

module.exports = sequelize;
