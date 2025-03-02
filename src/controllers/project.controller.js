import { createProjectService, deleteProjectWithDependencies, getProjectService, getUserProjectsService, updateProjectData } from '../services/project.service.js'

export const createProject = async (req, res) => {
  const { id } = req.user
  const { name, description } = req.body
  try {
    const project = await createProjectService(id, name, description)
    res.status(201).json({
      message: 'Project created successfully',
      project
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal error' })
  }
}

export const getUserProjects = async (req, res) => {
  const { id } = req.user
  try {
    const projects = await getUserProjectsService(id)
    res.status(200).json(projects)
  } catch (error) {
    console.log(error)
    if (error.message === 'No projects found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const getProject = async (req, res) => {
  const projectId = req.params.id
  const userId = req.user.id
  try {
    const project = await getProjectService(projectId, userId)
    res.status(200).json({ project })
  } catch (error) {
    if (error.message === 'Project not found') {
      return res.status(404).json({ message: error.message })
    }
    if (error.message === 'Unauthorized, user is not owner') {
      return res.status(401).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const updateProject = async (req, res) => {
  const projectId = req.params.id
  const userId = req.user.id
  const { name, description } = req.body
  try {
    const project = await updateProjectData(projectId, userId, name, description)
    res.status(200).json({
      message: 'Project updated successfully',
      project
    })
  } catch (error) {
    if (error.message === 'Project not found') {
      return res.status(404).json({ message: error.message })
    }
    if (error.message === 'The user does not have permissions') {
      return res.status(401).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const deleteProject = async (req, res) => {
  const projectId = req.params.id
  const userId = req.user.id
  try {
    await deleteProjectWithDependencies(projectId, userId)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    if (error.message === 'Project not found') {
      return res.status(404).json({ message: error.message })
    }
    if (error.message === 'The user does not have permissions') {
      return res.status(401).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}