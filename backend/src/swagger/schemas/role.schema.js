export const RoleSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3
    },
    name: {
      type: 'string',
      example: 'admin'
    },
    can_view: {
      type: 'boolean',
      example: true
    },
    can_edit: {
      type: 'boolean',
      example: true
    },
    can_manage: {
      type: 'boolean',
      example: true
    },
    is_owner: {
      type: 'boolean',
      example: false
    }
  }
}