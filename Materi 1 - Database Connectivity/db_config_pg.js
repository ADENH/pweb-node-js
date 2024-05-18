const { Client } = require('pg');

// Database connection parameters
const connectionParams = {
    user: 'postgres', // Replace with your PostgreSQL username
    host: '192.168.1.7', // Replace with your PostgreSQL host -> ip server
    database: 'praktisi_mengajar', // Replace with your PostgreSQL database name
    password: 'postgres', // Replace with your PostgreSQL password
    port: 5432 // Replace with your PostgreSQL port (default is 5432)
};

// Create a new PostgreSQL client
const client = new Client(connectionParams);

// Connect to the database
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
        // Test the connection by running a sample query
        client.query('SELECT NOW()', (err, res) => {
            if (err) {
                console.error('Error executing query:', err);
            } else {
                console.log('Current timestamp from the database:', res.rows[0].now);
            }
            // Close the connection
            client.end();
        });
    })
    .catch(err => console.error('Error connecting to PostgreSQL database:', err));