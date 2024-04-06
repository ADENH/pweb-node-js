const mysql = require('mysql');

// Database connection parameters
const connectionParams = {
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'praktisi_mengajar' // Replace with your MySQL database name
};

// Create a new MySQL connection
const connection = mysql.createConnection(connectionParams);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Test the connection by running a sample query
  connection.query('SELECT LOCALTIME()', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Current timestamp from the database:', results[0]);
    
    // Close the connection
    connection.end();
  });
});
