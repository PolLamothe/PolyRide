const db = require('../db');

const userDAO = {
  // Crée un nouvel utilisateur
  async createUser({ email, passwordHash }) {
    const queryText = `
      INSERT INTO users (email, password) 
      VALUES ($1, $2) 
      RETURNING id, email, created_at
    `;
    const values = [email, passwordHash];
    const { rows } = await db.query(queryText, values);
    return rows[0];
  },

  // Trouve un utilisateur par son email (pour le login)
  async findUserByEmail(email) {
    const queryText = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(queryText, [email]);
    return rows[0] || null;
  },

  async findUserByEmailAndPassword(email, password){
    const queryText = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const { rows } = await db.query(queryText, [email, password]);
    return rows[0] || null;
  }
};

module.exports = userDAO;