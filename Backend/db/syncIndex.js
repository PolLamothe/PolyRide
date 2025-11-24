const { connectToDatabase, closeDatabaseConnection } = require('./index');
const User = require('./user.schema');
const Trajet = require('./trajet.schema');

async function syncDatabase() {
  try {
    await connectToDatabase();
    console.log('Database connection successful. Models are being synchronized.');

    // By virtue of requiring the model files, the models are registered with Mongoose.
    // Mongoose will automatically create any defined indexes on connection.
    // For example, the '2dsphere' index on the User model.
    console.log('User model is registered.');
    console.log('Trajet model is registered.');

    // You can optionally force index creation if needed, but it's often automatic.
    await User.createIndexes();
    await Trajet.createIndexes();
    // console.log('Indexes have been ensured.');

  } catch (error) {
    console.error('Error during database synchronization:', error);
    process.exit(1); // Exit with error
  } finally {
    await closeDatabaseConnection();
    console.log('Database connection closed.');
  }
}

syncDatabase();
