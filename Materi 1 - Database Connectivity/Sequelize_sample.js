const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with database connection details
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/praktisi_mengajar');

// Define a model representing a User table
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Synchronize the model with the database
async function syncModel() {
  try {
    await sequelize.sync();
    console.log('User model synchronized with database.');
  } catch (error) {
    console.error('Error synchronizing model:', error);
  }
}

// Function to create a new user
async function createUser() {
  try {
    const newUser = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });
    console.log('New user created:', newUser.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Function to fetch all users
async function findAllUsers() {
  try {
    const users = await User.findAll();
    console.log('All users:', users.map(user => user.toJSON()));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Function to update a user
async function updateUser() {
  try {
    const user = await User.findOne({ where: { firstName: 'John' } });
    if (user) {
      user.lastName = 'Smith';
      await user.save();
      console.log('User updated successfully:', user.toJSON());
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

// Function to delete a user
async function deleteUser() {
  try {
    const user = await User.findOne({ where: { firstName: 'John' } });
    if (user) {
      await user.destroy();
      console.log('User deleted successfully.');
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

// Test the database operations
async function testDatabaseOperations() {
  await syncModel(); // Sync the model with the database

  await createUser(); // Create a new user
  await findAllUsers(); // Fetch all users

  await updateUser(); // Update the user
  await findAllUsers(); // Fetch all users after update

  await deleteUser(); // Delete the user
  await findAllUsers(); // Fetch all users after deletion
}

// Run the test
testDatabaseOperations();
