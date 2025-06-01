import swaggerJSDoc from 'swagger-jsdoc'
import { LoginSchema, RegisterSchema, UserSchema } from './schemas/auth.schema.js'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tesk',
      version: '1.0.0',
      description: 'Documentación de los endpoints de la API de Tesk'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local'
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
        LoginSchema,
        RegisterSchema,
        UserSchema
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js']
}

export const swaggerSpec = swaggerJSDoc(options)