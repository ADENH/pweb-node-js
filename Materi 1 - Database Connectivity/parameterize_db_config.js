const http = require('http');
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

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Parse URL and extract query parameters
  const url = new URL(req.url, `http://${req.headers.host}`);
  const firstName = url.searchParams.get('firstName');
  const lastName = url.searchParams.get('lastName');

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
      return;
    }

    // Prepare SQL query with input parameters
    const sql = 'SELECT * FROM users WHERE firstName = ? AND lastName = ?';
    const params = [firstName, lastName];

    // Execute the query with input parameters
    connection.query(sql, params, (err, results) => {
      // Release the connection back to the pool
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      // Send the query result to the client
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
    });
  });
});

// Start the HTTP server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
