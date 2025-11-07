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
    servers: [
      {
        url: 'http://localhost:'+process.env.PORT || 3001,
      },
    ],
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

module.exports = specs;
