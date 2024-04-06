const mongoose = require('mongoose');

// MongoDB connection URL
const url = 'mongodb://0.0.0.0:27017/praktisi_mengajar'; // Replace 'mydatabase' with your database name

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event handlers for connection events
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');

    // Define a schema
    const Schema = mongoose.Schema;
    const personSchema = new Schema({
        name: String,
        age: Number
    });

    // Define a model
    const Person = mongoose.model('users', personSchema);

    // Create a new document
    const person = new Person({ name: 'green', age: 30 });

    // Save the document to the database


    person.save()
        .then(function (person) {
            console.log('Document saved successfully:',person);
             // Close the connection
            mongoose.connection.close();

        })
        .catch(function (err) {
            console.error('Error saving document:', err);
            return;
        });
       
});
