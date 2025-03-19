import api from './api'

export const createTask = async (projectId, boardId, task) => {
  return api.post(`/projects/${projectId}/boards/${boardId}/tasks`, task)
}

export const getTask = async (projectId, boardId, taskId) => {
  return api.get(`/projects/${projectId}/boards/${boardId}/tasks/${taskId}`)
}

export const updateTaskRequest = async (projectId, boardId, taskId, task) => {
  return api.patch(`/projects/${projectId}/boards/${boardId}/tasks/${taskId}`, task)
}

export const deleteTaskRequest = async (projectId, boardId, taskId) => {
  return api.delete(`/projects/${projectId}/boards/${boardId}/tasks/${taskId}`)
}
