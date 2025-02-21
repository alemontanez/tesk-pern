import Role from '../models/role.model.js'

export const getRoleDetails = async (roleId) => {
  const role = await Role.findByPk(roleId)
  if (!role) throw new Error('Role not found')

  return role
}