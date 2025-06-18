export const CommentSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    content: {
      type: 'string',
      example: 'This is a comment'
    },
    task_id: {
      type: 'integer',
      example: 1
    },
    user_id: {
      type: 'string',
      format: 'uuid'
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time'
    },
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
        }
      }
    }
  }
}

export const CommentPayloadSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      example: 'Creating a comment'
    }
  }
}