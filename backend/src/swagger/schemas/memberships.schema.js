export const ProjectMemberSchema = {
  type: 'object',
  properties: {
    User: {
      type: 'object',
      properties: {
        first_name: {
          type: 'string',
          example: 'Alejandro'
        },
        last_name: {
          type: 'string',
          example: 'Montañez'
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'ale@mail.com'
        }
      }
    },
    role: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: '3'
        },
        name: {
          type: 'string',
          example: 'admin'
        }
      }
    }
  }
}

export const UserSearchResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    first_name: {
      type: 'string',
      example: 'Alejandro'
    },
    last_name: {
      type: 'string',
      example: 'Montañez'
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'ale@mail.com'
    }
  }
}

export const AddMemberSchema = {
  type: 'object',
  properties: {
    memberId: {
      type: 'string',
      format: 'uuid',
      example: ''
    }
  },
  required: ['memberId']
}