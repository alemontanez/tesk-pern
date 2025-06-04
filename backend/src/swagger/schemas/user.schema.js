export const UpdateProfileSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      example: 'updateduser'
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'updated@example.com'
    },
    first_name: {
      type: 'string',
      example: 'Updated'
    },
    last_name: {
      type: 'string',
      example: 'User'
    },
  }
}

export const ChangePasswordSchema = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      example: 'Password1234'
    },
    newPassword: {
      type: 'string',
      example: 'NewPassword789'
    }
  }
}