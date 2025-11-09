const { getDb } = require('../db');

const userDAO = {
	// Crée un nouvel utilisateur
	async createUser({ email, passwordHash }) {
		const db = getDb();
		const result = await db.collection('users').insertOne({ email, password: passwordHash });
		const insertedUser = await db.collection('users').findOne({ _id: result.insertedId });
		return insertedUser;
	},

	// Trouve un utilisateur par son email (pour le login)
	async findUserByEmail(email) {
		const db = getDb();
		return await db.collection('users').findOne({ email });
	},

	async findUserByEmailAndPassword(email, password) {
		const db = getDb();
		return await db.collection('users').findOne({ email, password });
	},

	async updateProfile(email, newUsage, newCalendarLink,adresse){
		const db = getDb();
		db.collection("users").updateOne({ email: email }, { $set: { calendarLink: newCalendarLink, usage : newUsage,adresse : adresse} })
	}
};

module.exports = userDAO;