const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

// Endpoint pour l'inscription (Tâche Sprint 1)
router.post('/register', authController.registerUser);

// Endpoint pour la connexion (Tâche Sprint 1)
router.post('/login', authController.loginUser);

module.exports = router;