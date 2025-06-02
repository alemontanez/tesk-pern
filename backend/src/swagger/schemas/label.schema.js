export const LabelSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    color: {
      type: 'string',
      example: 'blue'
    },
    hex_code: {
      type: 'string',
      example: '#13488f'
    }
  }
}