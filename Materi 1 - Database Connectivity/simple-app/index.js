// Import required modules
const express = require('express');
const poolMysql = require('./db_connection_mysql');
const sequelize = require('./sequelize'); // Import Sequelize configuration
const User = require('./user'); // Import the User model

// Create an Express application
const app = express();

/// Define a route that queries the database
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// without ORM
app.get('/getDataFromTable', (req, res) => {
    getDataFromTable(req, res);
});
// Route to handle inserting data
app.get('/postDataToTableUser', (req, res) => {
    postDataToTableUser(req, res);
});

//----------------------------------------------------------------------------//

// ORM Sequelize
app.get('/postDataToTableUserSequelize', async (req, res) => {
    await postDataToTableUserSequelize(req, res);
});
app.get('/getDataToTableUserSequelize', async (req, res) => {
    await getDataToTableUserSequelize(res);
});
app.get('/getDataToTableUserSequelizeById', async (req, res) => {
    await getDataToTableUserSequelizeBy(res);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


async function postDataToTableUserSequelize(req, res) {
    try {
        const nama = req.query.nama;
        const alamat = req.query.alamat;
        const umur = req.query.umur;
        // Create a new user using the User model
        const newUser = await User.create({ nama, alamat, umur });

        // Send a success response
        res.status(201).json(newUser);
    } catch (error) {
        // Handle any errors
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Error inserting data' });
    }
}

async function getDataToTableUserSequelize(res) {
    try {
        const users = await User.findAll();

        // Send the retrieved users in the response
        res.status(200).json(users);
    } catch (error) {
        // Handle any errors
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Error retrieving data' });
    }
}

async function getDataToTableUserSequelizeBy(req,res) {
    try {
        const users = await User.findAndCountAll();

        // Send the retrieved users in the response
        res.status(200).json(users);
    } catch (error) {
        // Handle any errors
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Error retrieving data' });
    }
}

function postDataToTableUser(req, res) {
    const nama = req.query.nama;
    const alamat = req.query.alamat;
    const umur = req.query.umur;

    // Perform the insert query
    const query = 'INSERT INTO user (nama, alamat, umur) VALUES (?, ?, ?)';
    poolMysql.query(query, [nama, alamat, umur], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        console.log('Data inserted successfully');
        res.status(200).json({ message: 'Data inserted successfully' });
    });
}

function getDataFromTable(req, res) {
    const table = req.query.table;

    // Get a connection from the pool
    poolMysql.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Example query
        const query = 'SELECT * FROM ' + table;
        
        // Execute the query
        connection.query(query, (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Send the query result to the client
            res.json(results);
        });
    });
}

// Sync models with the database
async function syncModels() {
    try {
        await sequelize.sync({ force: true }); // Use { force: true } only for development
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync models:', error);
    }
}

syncModels(); // Call the function to sync models with the database