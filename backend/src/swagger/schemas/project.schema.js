export const CreateProjectSchema = {
  type: 'object',
  required: ['name', 'description'],
  properties: {
    name: {
      type: 'string',
      example: 'My project 1'
    },
    description: {
      type: 'string',
      example: 'This is a project description'
    }
  }
}

export const ProjectSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    name: {
      type: 'string',
      example: 'My project 1'
    },
    description: {
      type: 'string',
      example: 'This is a project description'
    },
    owner_id: {
      type: 'uuid',
      example: 'ed0d570c-e1f1-4bb2-a306-c1ec908185d2'
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: '2025-03-17T19:34:13.225Z'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2025-03-17T19:34:13.225Z'
    }
  }
}

export const ProjectWithBoardsSchema = {
  type: 'object',
  properties: {
    ...ProjectSchema.properties,
    Boards: {
      type: 'array',
      items: {
        $ref: '#components/schemas/BoardSchema'
      }
    }
  }
}