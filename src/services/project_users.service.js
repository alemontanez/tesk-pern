import Project_users from '../models/project_users.model.js'
import User from '../models/user.model.js'
import Project from '../models/project.model.js'
import Role from '../models/role.model.js'

export const createMember = async (userId, projectId, roleId) => {
  const user = await User.findByPk(userId)
  if (!user) throw new Error('User not found')

  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')

  const role = await Role.findByPk(roleId)
  if (!role) throw new Error('Role not found')

  const existingMember = await Project_users.findOne({
    where: { user_id: userId, project_id: projectId }
  })
  if (existingMember) throw new Error('The user already belongs to this project')

  const member = await Project_users.create({
    user_id: userId,
    project_id: projectId,
    role_id: roleId
  })
  return member
}

export const updateMember = async (userId, projectId, newRoleId) => {
  const member = await findMember(userId, projectId)

  const role = await Role.findByPk(newRoleId)
  if (!role) throw new Error('Role not found')

  await member.update({
    role_id: newRoleId
  })
}

export const deleteMember = async (userId, projectId) => {
  const member = await findMember(userId, projectId)
  await member.destroy({ force: true })
}

const findMember = async (userId, projectId) => {
  const user = await User.findByPk(userId)
  if (!user) throw new Error('User not found')

  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')

  const member = await Project_users.findOne({
    where: { user_id: userId, project_id: projectId }
  })
  if (!member) throw new Error('Membership not found')
  return member
}