const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PolyRide API',
      version: '1.0.0',
      description: 'API pour l\'application PolyRide',
    },
    tags: [
      {
        name: 'auth',
        description: 'Authentication routes'
      },
      {
        name: 'profile',
        description: 'Profile routes'
      }
    ],
    servers: [
      {
        url: 'http://localhost:'+process.env.PORT || 3001,
      },
    ],
    components: {
      securitySchemes: {
        tokenAuth: { 
          type: 'apiKey',         // Le type est 'apiKey'
          in: 'header',           // L'emplacement est 'header'
          name: 'Authorization',  // Le nom de l'en-tête est 'Authorization'
          description: "Entrez le token JWT seul (SANS le préfixe 'Bearer')"
        }
      }
    },

    // 2. Appliquer ce schéma de sécurité globalement à toutes les routes
    security: [
      {
        tokenAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

module.exports = specs;
