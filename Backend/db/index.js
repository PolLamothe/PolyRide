const { MongoClient } = require('mongodb');
require('dotenv').config();

// Utilise les variables d'environnement (à mettre dans .env)
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
  if (db) {
    return db;
  }
  await client.connect();
  db = client.db("PolyRide");
  console.log("Connected to MongoDB");
  return db;
}

function getDb() {
  if (!db) {
    throw new Error('You must connect to the database first');
  }
  return db;
}

async function closeDatabaseConnection() {
  await client.close();
}

module.exports = {
  connectToDatabase,
  getDb,
  closeDatabaseConnection,
};