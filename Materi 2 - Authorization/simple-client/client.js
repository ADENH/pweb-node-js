const axios = require('axios');

// URL of the JSONPlaceholder API
const BASE_URL = 'http://localhost:5000/api/auth';

async function registerUser() {
    try {
        const response = await axios.post(`${BASE_URL}/register`, {
            username: 'footatato',
            password: 'barbarian',
        });
        console.log(response.data.user._id)
        return response.data.user._id
    } catch (error) {
        console.error('Error creating User:', error.message);
        console.error('Error creating User:', error.response.data);
    }
}

async function loginUser() {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            username: 'admins',
            password: 'admins',
        });
        return response.data.token
    } catch (error) {
        console.error('Error creating User:', error.message);
        console.error('Error creating User:', error.response.data);
    }
}

async function deleteUser(token, id) {
    try {
        console.log("id-ini " + id)
        console.log("token-ini " + token)

        var deleteData = {
            id: `${id}`,
            role: 'Basic',
        };


        const options = {
            headers: {
                Authorization: `${token}`
            }
          };
                
        const response = await axios.post(`${BASE_URL}/deleteUser`, deleteData, options);
        console.log('Delete User Response:', response.data);
    } catch (error) {
        console.error('Error Delete User:', error.message);
        console.error('Error Delete User:', error.response.data);
    }
}

// Execute the functions
async function run() {
    const id = await registerUser();
    const token = await loginUser();
    await deleteUser(token, id);
}

run();
