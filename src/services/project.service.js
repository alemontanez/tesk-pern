import Project from '../models/project.model.js'
import User from '../models/user.model.js'

export const createProjectWithOwner = async (projectData, ownerId) => {
  const { name, description } = projectData
  const project = await Project.create({
    name,
    description,
    owner_id: ownerId
  })
  return project
}

export const listUserProjects = async (userId) => {
  // Obtiene todos los proyectos del usuario (con posibles joins complejos)
  // Solo trae proyectos por owner, no por participar
  const projects = await Project.findAll({
    include: [{
      model: User,
      as: 'owner',
      attributes: [
        'username',
      ]
    }],
    where: { owner_id: userId }
  })
  if (!projects) throw new Error('No projects found')

  return projects
}

export const getProjectDetails = async (projectId, userId) => {
  // Trae un proyecto específico + verifica que el usuario tenga acceso
  // Solo para owner por ahora
  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')

  if (project.owner_id !== userId) throw new Error('Unauthorized, user is not owner')

  return project
}

export const updateProjectData = async (projectId, updateData, userId) => {
  // Actualiza campos no críticos (nombre, descripción)
  // Solo hecho con owner por ahora

  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')

  if (project.owner_id !== userId) throw new Error('Unauthorized, user is not owner')

  await project.update(updateData)
  return project
}

export const deleteProjectWithDependencies = async (projectId) => {
  // Borrado físico en cascada (tasks, comments, etc)
  // Modificar cascada en el modelo
}