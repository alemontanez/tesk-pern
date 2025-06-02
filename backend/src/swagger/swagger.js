import swaggerJSDoc from 'swagger-jsdoc'
import { LoginSchema, RegisterSchema, UserSchema } from './schemas/auth.schema.js'
import { CreateProjectSchema, ProjectSchema, ProjectWithBoardsSchema } from './schemas/project.schema.js'
import { BoardSchema } from './schemas/board.schema.js'
import { LabelSchema } from './schemas/label.schema.js'
import { RoleSchema } from './schemas/role.schema.js'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tesk',
      version: '1.0.0',
      description: 'Documentación de los endpoints utilizados en el backend de la aplicación Tesk'
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
        RegisterSchema,
        LoginSchema,
        UserSchema,
        CreateProjectSchema,
        ProjectSchema,
        ProjectWithBoardsSchema,
        BoardSchema,
        LabelSchema,
        RoleSchema
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