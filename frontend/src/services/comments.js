import api from './api'

export const createComment = async (projectId, boardId, taskId) => {
  return api.post(`/projects/${projectId}/boards/${boardId}/tasks/${taskId}/comments`)
}