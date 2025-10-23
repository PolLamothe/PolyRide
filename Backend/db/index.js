const { Pool } = require('pg');

// Utilise les variables d'environnement (à mettre dans .env)
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Exporte une méthode 'query' pour que le DAO puisse l'utiliser
module.exports = {
  query: (text, params) => pool.query(text, params),
};