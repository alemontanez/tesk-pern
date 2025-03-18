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