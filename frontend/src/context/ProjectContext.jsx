import { createProject, getProjects, getProject, searchProjectBoards } from '../services/project'
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
      setErrors([])
      const res = await getProjects()
      setProjects(res.data)
    } catch (error) {
      setErrors(error.response.data.error)
    }
  }

  const createNewProject = async (project) => {
    try {
      setErrors([])
      await createProject(project)
      fetchProjects()
    } catch (error) {
      setErrors(error.response.data.error)
    }
  }

  const fetchProject = async (projectId) => {
    try {
      setErrors([])
      const res = await getProject(projectId)
      return res
    } catch (error) {
      setErrors(error.response.data.error)
    }
  }

  const searchBoards = async (projectId, query) => {
    try {
      setErrors([])
      const res = await searchProjectBoards(projectId, query)
      return res.data
    } catch (error) {
      console.log(error)
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
      searchBoards,
      projects,
      errors
    }}>
      {children}
    </ProjectContext.Provider>
  )
}