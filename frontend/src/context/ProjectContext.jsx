import { createProject, getProjects, getProject } from '../services/projects'
import { useState, createContext, useContext, useEffect } from 'react'

const ProjectContext = createContext()

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('UseProject must be used within an ProjectProvider')
  }
  return context
}

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [errors, setErrors] = useState([])

  const fetchProjects = async () => {
    try {
      const res = await getProjects()
      setProjects(res.data)
    } catch (error) {
      setErrors(error.response.data.error)
    }
  }

  const createNewProject = async (project) => {
    try {
      await createProject(project)
    } catch (error) {
      setErrors(error.response.data.error)
    }
  }

  const fetchProject = async (projectId) => {
    try {
      const res = await getProject(projectId)
      return res
    } catch (error) {
      setErrors(error.response.data.error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <ProjectContext.Provider value={{
      createNewProject,
      fetchProject,
      projects,
      errors
    }}>
      {children}
    </ProjectContext.Provider>
  )
}