import { CommentSchema } from './comment.schema.js'

export const TaskPreviewSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    title: {
      type: 'string',
      example: 'Deploy server on a hosting'
    },
    description: {
      type: 'string',
      example: 'The server can be deployed in Render or Railway'
    },
    due_date: {
      type: 'string',
      format: 'date-time'
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time'
    },
    priority_id: {
      type: 'integer',
      example: 1
    },
    assigned_to: {
      type: 'string',
      format: 'uuid'
    },
    created_by: {
      type: 'string',
      format: 'uuid'
    },
    Label: {
      type: 'object',
      properties: {
        hex_code: {
          type: 'string',
          example: '#1030ab'
        }
      }
    },
    Priority: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Low'
        }
      }
    },
    assignedTo: {
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
    },
    createdBy: {
      type: 'object',
      properties: {
        first_name: {
          type: 'string',
          example: 'Gabriel'
        },
        last_name: {
          type: 'string',
          example: 'Montañez'
        }
      }
    }
  }
}

export const TaskDetailedSchema = {
  type: 'object',
  properties: {
    task: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        description: { type: 'string' },
        created_by: { type: 'string', format: 'uuid' },
        assigned_to: { type: 'string', format: 'uuid' },
        board_id: { type: 'integer' },
        due_date: { type: 'string', format: 'date-time' },
        priority_id: { type: 'integer' },
        label_id: { type: 'integer' },
        position: { type: 'integer' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        Comments: {
          type: 'array',
          items: CommentSchema
        }
      }
    },
    users: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' }
        }
      }
    },
    priorities: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' }
        }
      }
    },
    creator: {
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    },
    assignedUser: {
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    }
  }
}

export const CreateTaskSchema = {
  type: 'object',
  required: ['title', 'description', 'dueDate', 'priorityId'],
  properties: {
    title: {
      type: 'string',
      example: 'Deploy server on a hosting'
    },
    description: {
      type: 'string',
      example: 'The server can be deployed in Render or Railway'
    },
    dueDate: {
      type: 'string',
      format: 'date-time'
    },
    priorityId: {
      type: 'integer',
      example: 1
    }
  }
}

export const UpdateTaskSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      example: 'Deploy server on a new hosting'
    },
    description: {
      type: 'string',
      example: 'The server can be deployed on another platform'
    },
    assignedTo: {
      type: 'string',
      format: 'uuid'
    },
    dueDate: {
      type: 'string',
      format: 'date-time',
    },
    priorityId: {
      type: 'integer',
      example: 1
    },
    labelId: {
      type: 'integer',
      example: 1
    }
  },
}