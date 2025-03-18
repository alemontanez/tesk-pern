import api from './api'

export const getBoard = async (projectId, boardId) => {
  return api.get(`/projects/${projectId}/boards/${boardId}/tasks`)
}