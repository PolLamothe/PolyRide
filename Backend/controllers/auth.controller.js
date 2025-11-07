// /controllers/auth.controller.js
const userDAO = require('../dao/user.dao.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const utils = require('../utils/utils.js');

const authController = {
  
  //
  async registerUser(req, res) {
	try {
	  const { email } = req.body;

	  // 1. Valider le format de l'email et le domaine
	  if (!validator.isEmail(email) || !email.endsWith('@etu.univ-nantes.fr')) {
		return res.status(400).json({ 
		  message: "Veuillez fournir une adresse email étudiante de l'Université de Nantes valide (@etu.univ-nantes.fr)." 
		});
	  }

	  // 2. Vérifier si l'utilisateur existe déjà
	  const existingUser = await userDAO.findUserByEmail(email);
	  if (existingUser) {
		return res.status(409).json({ message: "Un utilisateur avec cet email existe déjà." });
	  }

	  if (!utils.verifyPassword(req.body.password)) {
		return res.status(410).json({message : "Votre mot de passe doit contenir au moins un chiffre et faire au moins 0 caractères"})
	  }

	  const hashedPassword = await bcrypt.hash(req.body.password, 10); // Salage avec un coût de 10

	  const newUser = await userDAO.createUser({ email, passwordHash: hashedPassword });

	        const token = jwt.sign(
	  		{ userId: newUser._id, email: newUser.email },
	  		process.env.JWT_SECRET,
	  		{ expiresIn: '24h' }
	  	  );
	  
	  	  res.status(201).json({ 
	  		message: "Inscription réussie.", 
	  		user: { id: newUser._id, email: newUser.email },
	  		token 
	  	  });
	} catch (error) {
	  console.error("[REGISTER ERROR]", error);
	  res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
	}
  },

  // Logique de connexion
  async loginUser(req, res) {
	try {
	  const { email, password } = req.body;

	  // 1. Trouver l'utilisateur par email
	  const user = await userDAO.findUserByEmail(email);
	  if (!user) {
		return res.status(401).json({ message: "La combinaison email/mot de passe est incorrecte." });
	  }

	  // 2. Comparer le mot de passe fourni avec le hash stocké
	  const isMatch = await bcrypt.compare(password, user.password);
	  if (!isMatch) {
		return res.status(401).json({ message: "La combinaison email/mot de passe est incorrecte." });
	  }

	  // 3. Générer le token JWT
	  const token = jwt.sign(
		{ userId: user._id, email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: '24h' }
	  );

	  res.status(200).json({ 
		message: "Connexion réussie.", 
		user: { id: user._id, email: user.email },
		token
	  });

	} catch (error) {
	  console.error("[LOGIN ERROR]", error);
	  res.status(500).json({ message: "Erreur serveur lors de la connexion." });
	}
  }
};

module.exports = authController;