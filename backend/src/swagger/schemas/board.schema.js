import { LabelSchema } from './label.schema.js'
import { TaskPreviewSchema } from './task.schema.js'

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

export const BoardPayloadSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Pending tasks'
    }
  }
}

export const UpdateBoardLabelSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'integer',
      example: 1
    }
  }
}


export const BoardWithTasksSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    name: {
      type: 'string',
      example: 'Pendings'
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
      type: 'string', format: 'date-time'
    },
    updatedAt: {
      type: 'string', format: 'date-time'
    },
    Tasks: {
      type: 'array',
      items: TaskPreviewSchema
    }
  }
}