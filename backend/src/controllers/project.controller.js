import {
  initializeNewProject,
  deleteProjectWithDependencies,
  findProjectById,
  findProjectsByUserId,
  findUserRoleForProject,
  updateProjectDetails
} from '../services/project.service.js'

export const getUserProjects = async (req, res) => {
  const userId = req.user.id
  try {
    const projects = await findProjectsByUserId(userId)
    res.status(200).json(projects)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const getProjectById = async (req, res) => {
  const { projectId } = req.params
  const userId = req.user.id
  try {
    const project = await findProjectById(userId, projectId)
    res.status(200).json(project)
  } catch (error) {
    console.log(error)
    if (error.message === 'Project not found' || error.message === 'Forbidden') {
      return res.status(404).json({ error: ['Project not found'] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const getUserRoleInProject = async (req, res) => {
  const { projectId } = req.params
  const userId = req.user.id
  try {
    const data = await findUserRoleForProject(userId, projectId)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    if (error.message === 'Project not found' || error.message === 'Member not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const createProject = async (req, res) => {
  const userId = req.user.id
  const { name, description } = req.body
  try {
    await initializeNewProject(userId, name, description)
    res.status(201).json({ message: 'Project created successfully' })
  } catch (error) {
    console.log(error)
    if (error.message === 'Project name already exists') {
      return res.status(409).json({ error: [error.message] })
    }
    res.status(500).json({ error: ['Internal error'] })
  }
}

export const updateProject = async (req, res) => {
  const { projectId } = req.params
  const userId = req.user.id
  const { name, description } = req.body
  try {
    const project = await updateProjectDetails(userId, projectId, name, description)
    res.status(200).json({
      message: 'Project updated successfully',
      project
    })
  } catch (error) {
    if (error.message === 'The user does not have permissions') {
      return res.status(403).json({ error: [error.message] })
    }
    if (error.message === 'Project not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const deleteProject = async (req, res) => {
  const { projectId } = req.params
  const userId = req.user.id
  try {
    await deleteProjectWithDependencies(userId, projectId)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    if (error.message === 'The user does not have permissions') {
      return res.status(403).json({ error: [error.message] })
    }
    if (error.message === 'Project not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}
