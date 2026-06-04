const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IntelliPark API',
      version: '1.0.0',
      description: 'API REST para sistema de gestión de parqueaderos IntelliPark'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local de desarrollo'
      }
    ],
    tags: [
      {
        name: 'Health',
        description: 'Verificación del estado de la API'
      },
      {
        name: 'Auth',
        description: 'Registro, login y usuario autenticado'
      },
      {
        name: 'Users',
        description: 'Gestión de usuarios'
      },
      {
        name: 'Vehicles',
        description: 'Gestión de vehículos'
      },
      {
        name: 'Parking',
        description: 'Ingreso y salida de vehículos'
      },
      {
        name: 'Payments',
        description: 'Registro y consulta de pagos'
      },
      {
        name: 'Reports',
        description: 'Reportes básicos de ingresos'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        RegisterUserRequest: {
          type: 'object',
          required: ['user_first_name', 'user_last_name', 'user_email', 'user_password'],
          properties: {
            user_first_name: {
              type: 'string',
              example: 'Mauricio'
            },
            user_last_name: {
              type: 'string',
              example: 'Patiño'
            },
            user_email: {
              type: 'string',
              example: 'mauricio@test.com'
            },
            user_password: {
              type: 'string',
              example: '123456'
            },
            user_role: {
              type: 'string',
              enum: ['administrador', 'operador', 'cliente'],
              example: 'administrador'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['user_email', 'user_password'],
          properties: {
            user_email: {
              type: 'string',
              example: 'mauricio@test.com'
            },
            user_password: {
              type: 'string',
              example: '123456'
            }
          }
        },
        VehicleRequest: {
          type: 'object',
          required: ['plate'],
          properties: {
            plate: {
              type: 'string',
              example: 'ABC123'
            },
            type: {
              type: 'string',
              enum: ['carro', 'moto', 'camioneta', 'otro'],
              example: 'carro'
            },
            brand: {
              type: 'string',
              example: 'Renault'
            },
            color: {
              type: 'string',
              example: 'Gris'
            }
          }
        },
        CheckOutRequest: {
          type: 'object',
          required: ['plate'],
          properties: {
            plate: {
              type: 'string',
              example: 'ABC123'
            }
          }
        },
        PaymentRequest: {
          type: 'object',
          required: ['parkingId'],
          properties: {
            parkingId: {
              type: 'integer',
              example: 1
            },
            paymentMethod: {
              type: 'string',
              enum: ['efectivo', 'transferencia', 'tarjeta', 'otro'],
              example: 'efectivo'
            },
            paymentReference: {
              type: 'string',
              example: 'REF-12345'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Validation error'
            }
          }
        }
      }
    }
  },
  apis: [
    './src/app.js',
    './src/routes/*.routes.js'
  ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;