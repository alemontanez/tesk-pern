export const CommentSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    content: { type: 'string' },
    task_id: { type: 'integer' },
    user_id: { type: 'string', format: 'uuid' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    User: {
      type: 'object',
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' }
      }
    }
  }
}