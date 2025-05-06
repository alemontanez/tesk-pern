import { createProject, getProjects, getProject, searchProjectBoards, getProjectMembers, fetchUsers, addProjectMember, updateProjectService, fetchPermissions, deleteProjectService } from '../services/project'
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
      return res.data
    } catch (error) {
      console.log(error)
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

  const getMembers = async (projectId) => {
    try {
      setErrors([])
      const res = await getProjectMembers(projectId)
      return res.data
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.error)
    }
  }

  const searchUsers = async (projectId, query) => {
    try {
      setErrors([])
      const res = await fetchUsers(projectId, query)
      return res.data
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.error)
    }
  }

  const addMember = (projectId, memberId) => {
    try {
      setErrors([])
      addProjectMember(projectId, memberId)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.error)
    }
  }

  const updateProject = async (projectId, data) => {
    try {
      await updateProjectService(projectId, data)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.error)
    }
  }

  const deleteProject = async (projectId) => {
    try {
      await deleteProjectService(projectId)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.error)
    }
  }

  const clearErrors = () => {
    setErrors([])
  }

  const getPermissions = async (projectId) => {
    try {
      const res = await fetchPermissions(projectId)
      return res.data
    } catch (error) {
      setErrors(error.response.data.error)
    }
  }

  return (
    <ProjectContext.Provider value={{
      fetchProjects,
      createNewProject,
      fetchProject,
      searchBoards,
      getMembers,
      searchUsers,
      addMember,
      updateProject,
      deleteProject,
      clearErrors,
      getPermissions,
      errors
    }}>
      {children}
    </ProjectContext.Provider>
  )
}