import { LabelSchema } from './label.schema.js'

export const BoardSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    name: {
      type: 'string',
      example: 'Pending'
    },
    project_id: {
      type: 'integer',
      example: 1
    },
    label_id: {
      type: 'integer',
      example: 1
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: '2025-03-12 01:25:32.565-03'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2025-03-12 01:25:32.565-03'
    },
    taskCount: {
      type: 'integer',
      example: 10
    },
    Label: LabelSchema
  }
}