import api from './api'

export const getBoard = async (projectId, boardId) => {
  api.get(`/projects/${projectId}/boards/${boardId}`)
}