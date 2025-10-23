require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importe les routes
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors()); 
app.use(express.json()); // Permet de lire le req.body en JSON

// --- Routes principales ---
// Toutes les routes d'authentification seront préfixées par /api/auth
app.use('/api/auth', authRoutes);

// Route de test
app.get('/api', (req, res) => {
  res.send('API PolyRide - OK');
});

// --- Démarrage ---
app.listen(PORT, () => {
  console.log(`[BACKEND] Serveur démarré sur http://localhost:${PORT}`);
});