export const PrioritiesSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    name: {
      type: 'string',
      example: 'Low'
    }
  }
}