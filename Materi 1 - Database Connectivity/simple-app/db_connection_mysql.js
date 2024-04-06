const mysql = require('mysql');

// Database connection parameters
const connectionParams = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'praktisi_mengajar'
};

// Create a MySQL connection pool
const pool = mysql.createPool(connectionParams);

module.exports = pool;
