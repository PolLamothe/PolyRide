// /controllers/auth.controller.js
const userDAO = require('../dao/user.dao.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const authController = {
  
  // Logique d'inscription
  async registerUser(req, res) {
    try {
      //TODO
    } catch (error) {
      console.error("[REGISTER ERROR]", error);
      res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
    }
  },

  // Logique de connexion
  async loginUser(req, res) {
    try {
      //TODO
    } catch (error) {
      console.error("[LOGIN ERROR]", error);
      res.status(500).json({ message: "Erreur serveur lors de la connexion." });
    }
  }
};

module.exports = authController;