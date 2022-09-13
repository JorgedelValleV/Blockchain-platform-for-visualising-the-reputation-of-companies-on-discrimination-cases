const swaggerJSDoc = require('swagger-jsdoc'); //Para generar un documento de Swagger

//Swagger (Se define el nombre del documento, descripción, licencia del proyecto, documento que contiene los endpoints...)
const options = {
    swaggerDefinition : { 
      openapi: '3.0.3',
      info: {
        title: 'TFG Blockchain Swagger',
        version: '3.0.0',
        description: 'Este documento contiene los endpoints de la API del Servidor de forma que queden explicados y registrados.',
        license: {
          name: 'Licencia GPL',
          url: 'https://www.gnu.org/licenses/gpl-3.0.html',
        },
        contact: {
          name: 'Soporte Proyecto',
          email: 'tfg.blockchain@gmail.com'
        },
      },
      servers: [
        {
          url: 'http://localhost:' +`${process.env.PORT}`,
          description: 'Servidor de la app',
        },
      ],
    },
    // Paths to files containing OpenAPI definitions
    apis: ['./index.js'],
  };
  
  const swaggerSpecification = swaggerJSDoc(options);
  module.exports = swaggerSpecification;
