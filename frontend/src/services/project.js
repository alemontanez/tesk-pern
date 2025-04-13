import api from './api'

export const createProject = (project) => {
  return api.post('/projects', project)
}

export const getProjects = () => {
  return api.get('/projects')
}

export const getProject = (projectId) => {
  return api.get(`/projects/${projectId}`)
}

export const searchProjectBoards = async (projectId, query) => {
  return api.get(`/projects/${projectId}/boards?search=${query}`)
}

export const getProjectMembers = async (projectId) => {
  return api.get(`/projects/${projectId}/memberships`)
}

export const fetchUsers = async (projectId, query) => {
  return api.get(`/projects/${projectId}/memberships/users?search=${query}`)
}

export const addProjectMember = (projectId, memberId) => {
  return api.post(`/projects/${projectId}/memberships`, {memberId})
}

export const updateProjectService = async (projectId, data) => {
  return api.patch(`/projects/${projectId}`, data)
}

export const fetchPermissions = async (projectId) => {
  return api.get(`/projects/${projectId}/permissions`)
}