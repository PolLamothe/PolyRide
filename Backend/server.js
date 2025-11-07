require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db');

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

// --- Swagger ---
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./utils/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// --- Démarrage ---
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`[BACKEND] Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('[BACKEND] Erreur de démarrage du serveur:', error);
    process.exit(1);
  }
}

startServer();