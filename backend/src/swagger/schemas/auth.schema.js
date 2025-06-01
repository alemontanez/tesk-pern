export const LoginSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: 'user@example.com'
    },
    password: {
      type: 'string',
      example: 'Password1234'
    }
  }
}

export const RegisterSchema = {
  type: 'object',
  required: ['username', 'email', 'firstName', 'lastName', 'password'],
  properties: {
    username: {
      type: 'string',
      example: 'user'
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'user@example.com'
    },
    firstName: {
      type: 'string',
      example: 'Demo'
    },
    lastName: {
      type: 'string',
      example: 'User'
    },
    password: {
      type: 'string',
      example: 'Password1234'
    }
  }
}

export const UserSchema = {
  type: 'object',
  sacar: ['id', 'username', 'email', 'first_name', 'last_name', 'password_hash', 'is_active', 'createdAt', 'updatedAt'],
  properties: {
    id: {
      type: 'uuid',
      example: '"c708cd82-81a9-45b2-a92e-89d980fe8fe8"'
    },
    username: {
      type: 'string',
      example: 'user'
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'user@example.com'
    },
    first_name: {
      type: 'string',
      example: 'Demo'
    },
    last_name: {
      type: 'string',
      example: 'User'
    },
    is_active: {
      type: 'boolean',
      example: true
    },
    createdAt: {
      type: 'string',
      example: '2025-03-01T20:04:24.382Z'
    },
    updatedAt: {
      type: 'string',
      example: '2025-03-05T19:08:08.833Z'
    }
  }
}