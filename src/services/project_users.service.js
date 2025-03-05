import Project_users from '../models/project_users.model.js'
import User from '../models/user.model.js'
import Role from '../models/role.model.js'

export const createMember = async (requesterId, userId, projectId, roleId) => {
  const verifyRequester = await Project_users.findOne({
    where: { user_id: requesterId, project_id: projectId },
    include: Role
  })
  if (!verifyRequester) throw new Error('Requester does not have permissions')
  const user = await User.findByPk(userId)
  if (!user) throw new Error('User not found')
  const userRole = await Role.findByPk(roleId)
  if (!userRole || userRole.name === 'owner') throw new Error('Role not found')
  const existingMember = await Project_users.findOne({
    where: { user_id: userId, project_id: projectId }
  })
  if (existingMember) throw new Error('The user already belongs to this project')
  if (!(verifyRequester.Role.name === 'admin' || verifyRequester.Role.name === 'owner')) {
    throw new Error('Requester does not have permissions')
  }
  if (verifyRequester.Role.name === 'admin') {
    if (userRole.name === 'admin') {
      throw new Error('Requester does not have permissions')
    }
  }
  const member = await Project_users.create({
    user_id: userId,
    project_id: projectId,
    role_id: roleId
  })
  return member
}

export const updateMember = async (requesterId, userId, projectId, newRoleId) => {
  const verifyRequester = await Project_users.findOne({
    where: { user_id: requesterId, project_id: projectId },
    include: [{
      model: Role,
      attributes: ['name']
    }]
  })
  if (!verifyRequester) throw new Error('Requester does not have permissions')
  const user = await User.findByPk(userId)
  if (!user) throw new Error('User not found')
  const userRole = await Role.findByPk(newRoleId)
  if (!userRole || userRole.name === 'owner') throw new Error('Role not found')
  const member = await Project_users.findOne({
    where: { user_id: userId, project_id: projectId },
    include: [{
      model: Role,
      attributes: ['name']
    }]
  })
  if (!member) throw new Error('Member not found')
  if (!(verifyRequester.Role.name === 'admin' || verifyRequester.Role.name === 'owner')) {
    throw new Error('Requester does not have permissions')
  }
  if (verifyRequester.Role.name === 'admin') {
    if (member.Role.name === 'admin') {
      throw new Error('Requester does not have permissions')
    }
  }
  if (member.Role.name === 'admin') {
    if (!verifyRequester.Role.name === 'owner') {
      throw new Error('Requester does not have permissions')
    }
  }
  await member.update({
    role_id: newRoleId
  })
}

export const deleteMember = async (requesterId, userId, projectId) => {
  const verifyRequester = await Project_users.findOne({
    where: { user_id: requesterId, project_id: projectId },
    include: [{
      model: Role,
      attributes: ['name']
    }]
  })
  if (!verifyRequester) throw new Error('Requester does not have permissions')
  const user = await User.findByPk(userId)
  if (!user) throw new Error('User not found')
  const member = await Project_users.findOne({
    where: { user_id: userId, project_id: projectId },
    include: [{
      model: Role,
      attributes: ['name']
    }]
  })
  if (!member) throw new Error('Member not found')
  if (!(verifyRequester.Role.name === 'admin' || verifyRequester.Role.name === 'owner')) {
    throw new Error('Requester does not have permissions')
  }
  if (verifyRequester.Role.name === 'admin') {
    if (member.Role.name === 'admin' || member.Role.name === 'owner') {
      throw new Error('Requester does not have permissions')
    }
  }
  if (member.Role.name === 'admin') {
    if (!verifyRequester.Role.name === 'owner') {
      throw new Error('Requester does not have permissions')
    }
  }
  await member.destroy({ force: true })
}