const bcrypt = require('bcrypt');
const seeder = require('./seeder.json');
const { connectToDatabase, closeDatabaseConnection } = require('../db');
const userDAO = require('../dao/user.dao');

async function seedDatabase() {
  try {
    // 1. Connect to DB and clear users
    await connectToDatabase();
    await userDAO.removeAll();
    console.log('Previous users removed.');

    // 2. Seed users directly into the database
    for (const userData of seeder.users) {
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user
      const newUser = await userDAO.createUser({
        email: userData.email,
        passwordHash: hashedPassword,
      });
      console.log(`User ${userData.email} created.`);

      // Update profile
      await userDAO.updateProfile(
        newUser.email,
        userData.usage,
        userData.calendarLink,
        userData.address,
        userData.position,
        userData.phoneNumber
      );
      console.log(`User ${userData.email} profile updated.`);
    }

    console.log('Database seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    await closeDatabaseConnection();
    process.exit(0);
  }
}

seedDatabase();
