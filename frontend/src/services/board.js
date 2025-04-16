import api from './api'

export const getBoard = async (projectId, boardId) => {
  return api.get(`/projects/${projectId}/boards/${boardId}/tasks`)
}

export const createBoard = async (projectId, board) => {
  return api.post(`/projects/${projectId}/boards`, board)
}

export const searchBoardTasks = async (projectId, boardId, query) => {
  return api.get(`/projects/${projectId}/boards/${boardId}/tasks/search?query=${query}`)
}