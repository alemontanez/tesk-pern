import Project from '../models/project.model.js'
import Project_users from '../models/project_users.model.js'
import Role from '../models/role.model.js'
import { Op } from 'sequelize'

export const createProjectService = async (userId, name, description) => {
  const project = await Project.create({
    name,
    description,
    owner_id: userId
  })
  return project
}

export const getUserProjectsService = async (userId) => {
  const projects = await Project_users.findAll({
    where: { user_id: userId },
    include: Project
  })
  if (!projects) throw new Error('No projects found')
  return projects
}

export const getProjectService = async (projectId, userId) => {
  const project = await Project_users.findOne({
    where: { [Op.and]: [{ project_id: projectId }, { user_id: userId }] },
    include: Project
  })
  if (!project) throw new Error('Project not found')
  return project
}

export const updateProjectData = async (projectId, userId, name, description) => {
  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')

  const verifyPermissions = await Project_users.findOne({
    where: { [Op.and]: [{ project_id: projectId }, { user_id: userId }] }
  })
  if (!verifyPermissions) throw new Error('The user does not have permissions')
  const role = await Role.findOne({
    where: { id: verifyPermissions.role_id }
  })
  if (role.name === 'admin' || role.name === 'owner') {
    await project.update({
      name,
      description
    })
    return project
  } else {
    throw new Error('The user does not have permissions')
  }
}

export const deleteProjectWithDependencies = async (projectId, userId) => {
  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')

  const verifyPermissions = await Project_users.findOne({
    where: { [Op.and]: [{ project_id: projectId }, { user_id: userId }] }
  })
  if (!verifyPermissions) throw new Error('The user does not have permissions')
  const role = await Role.findOne({
    where: { id: verifyPermissions.role_id }
  })
  if (role.name === 'owner') {
    await project.destroy({ force: true })
  } else {
    throw new Error('The user does not have permissions')
  }
}