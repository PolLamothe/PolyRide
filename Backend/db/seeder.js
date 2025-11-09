const axios = require('axios');
const seeder = require('./seeder.json');
const { connectToDatabase, closeDatabaseConnection } = require('../db');
const userDAO = require('../dao/user.dao');

const BASE_URL = 'http://localhost:3000'; // Assuming the server runs on port 3000

const api = axios.create({
  baseURL: BASE_URL,
});

async function seedDatabase() {
  try {
    // 1. Connect to DB and clear users
    await connectToDatabase();
    await userDAO.removeAll();
    console.log('Previous users removed.');

    // 2. Seed users via API
    for (const userData of seeder.users) {
      // Register user
      await api.post('/api/auth/register', {
        email: userData.email,
        password: userData.password,
      });
      console.log(`User ${userData.email} registered.`);

      // Login to get token
      const loginResponse = await api.post('/api/auth/login', {
        email: userData.email,
        password: userData.password,
      });
      const token = loginResponse.data.token;
      console.log(`User ${userData.email} logged in.`);

      // Update profile
      await api.post(
        '/api/profile/profile',
        {
          usage: userData.usage,
          calendarLink: userData.calendarLink,
          address: userData.address,
          phoneNumber: userData.phoneNumber,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(`User ${userData.email} profile updated.`);
    }

    console.log('Database seeding complete!');
    await closeDatabaseConnection();
    process.exit(0);
  } catch (error) {
    console.error(
      'Error seeding database:',
      error.response ? error.response.data : error.message
    );
    await closeDatabaseConnection();
    process.exit(1);
  }
}

seedDatabase();
