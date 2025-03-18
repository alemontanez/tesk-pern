import Board from '../models/board.model.js'
import Project from '../models/project.model.js'
import Project_users from '../models/project_users.model.js'
import Role from '../models/role.model.js'

export const createProjectService = async (userId, name, description) => {
  const checkName = await Project.findOne({
    where: {
      owner_id: userId,
      name: name
    }
  })
  if (checkName) throw new Error('Project name already exists')
  const project = await Project.create({
    name,
    description,
    owner_id: userId
  })
  return project
}

export const getUserProjectsService = async (userId) => {
  const projects = await Project.findAll({
    include: [{
      model: Project_users,
      where: {
        user_id: userId
      },
      attributes: []
    }]
  })
  if (!projects) throw new Error('No projects found')
  return projects
}

export const getProjectService = async (userId, projectId) => {
  const project = await Project.findOne({
    where: {
      id: projectId
    },
    include: [{
      model: Project_users,
      where: {
        user_id: userId
      },
      attributes: []
    }],
    include: [{
      model: Board,
      where: {
        project_id: projectId
      }
    }],
  })
  if (!project) throw new Error('Project not found')
  return project
}

export const updateProjectData = async (userId, projectId, name, description) => {
  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')

  const verifyPermissions = await Project_users.findOne({
    where: { project_id: projectId, user_id: userId }
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

export const deleteProjectWithDependencies = async (userId, projectId) => {
  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')

  const verifyPermissions = await Project_users.findOne({
    where: { project_id: projectId, user_id: userId }
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