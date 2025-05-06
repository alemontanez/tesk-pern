import api from './api'

export const getBoard = async (projectId, boardId, sortBy, order) => {
  return api.get(`/projects/${projectId}/boards/${boardId}/tasks?sort=${sortBy}&order=${order}`)
}

export const createBoard = async (projectId, board) => {
  return api.post(`/projects/${projectId}/boards`, board)
}

export const searchBoardTasks = async (projectId, boardId, query, sortBy, order) => {
  return api.get(`/projects/${projectId}/boards/${boardId}/tasks/search?query=${query}&sort=${sortBy}&order=${order}`)
}