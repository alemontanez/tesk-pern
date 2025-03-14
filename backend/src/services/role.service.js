import Role from '../models/role.model.js'
import { Op } from 'sequelize'

export const fetchRoles = async () => {
  const roles = await Role.findAll({
    where: { [Op.not]: {name: 'owner'}}
  })
  if (!roles) throw new Error('Roles not found')
  return roles
}

export const getRoleDetails = async (roleId) => {
  const role = await Role.findByPk(roleId)
  if (!role) throw new Error('Role not found')
  return role
}