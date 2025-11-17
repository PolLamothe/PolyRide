const User = require('../db/user.schema.js');

const userDAO = {
	// Crée un nouvel utilisateur
	async createUser({ email, passwordHash, firstName, lastName }) {
		return await User.create({ email, password: passwordHash, firstName, lastName });
	},

	// Trouve un utilisateur par son email (pour le login)
	async findUserByEmail(email) {
		return await User.findOne({ email });
	},

	async findUserByEmailAndPassword(email, password) {
		return await User.findOne({ email, password });
	},

	async updateProfile(email, newUsage, newCalendarLink, adresse, position, phoneNumber) {
		const updateData = {};
		if (newUsage != null) updateData.usage = newUsage;
		if (newCalendarLink != null) updateData.calendarLink = newCalendarLink;
		if (adresse != null) updateData.adresse = adresse;
		if (position && position.lon != null && position.lat != null) {
			updateData.position = {
				type: "Point",
				coordinates: [position.lon, position.lat]
			};
		}
		if (phoneNumber != null) updateData.phoneNumber = phoneNumber;

		return await User.updateOne({ email: email }, { $set: updateData });
	},

	async removeAll(){
		return await User.deleteMany({});
	},

	async getNearestDriver(user,page = 0){
		const limit = 10;
		const skip = page * limit;
		return await User.find({
			_id : {$ne : user._id},
			usage : {$in : ["Conducteur","Conducteur et Passager"]},
			position : {
				$nearSphere: {
					$geometry: {
						type: "Point",
						coordinates: [user.position.coordinates[0], user.position.coordinates[1]] // Toujours [lon, lat]
					}
				}
			}
		}).skip(skip).limit(limit);
	},
	deleteUser(email){
		return User.deleteOne({email : email})
	}
};

module.exports = userDAO;