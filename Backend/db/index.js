const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB using Mongoose");
}

async function closeDatabaseConnection() {
  await mongoose.connection.close();
}

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
};