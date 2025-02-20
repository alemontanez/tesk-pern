import { createProjectWithOwner, getProjectDetails, listUserProjects, updateProjectData } from "../services/project.service.js"

export const createProject = async (req, res) => {
  const { id } = req.user
  const data = req.body
  try {
    const project = await createProjectWithOwner(data, id)
    res.status(201).json({
      message: 'Project created successfully',
      project
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal error' })
  }
}

export const getProjects = async (req, res) => {
  // funcion para traer todos los proyectos a los que pertenece el usuario (sirve para listarlos en el aside)
  const { id } = req.user
  try {
    const projects = await listUserProjects(id)
    res.status(200).json({ projects })
  } catch (error) {
    console.log(error)
    if (error.message === 'No projects found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const getProject = async (req, res) => {
  // función para traer un solo proyecto (para cuando entramos a un proyecto)
  const projectId = req.params.id
  const userId = req.user.id
  try {
    const project = await getProjectDetails(projectId, userId)
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
  // función para editar datos de un proyecto
  // Solo para owner
  const projectId = req.params.id
  const userId = req.user.id
  const data = req.body
  try {
    const project = await updateProjectData(projectId, data, userId)
    res.status(200).json({ message: 'Project updated successfully' })
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

export const deleteProject = async (req, res) => {
  // función para eliminar un proyecto
  // va a hacer falta modificar en el modelo para que borre en cascada
}