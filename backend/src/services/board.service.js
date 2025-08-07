import Board from '../models/board.model.js'
import BoardColor from '../models/boardColor.model.js'
import Task from '../models/task.model.js'
import { Op } from 'sequelize'

export const findAllBoards = async (projectId, query) => {
  const boards = await Board.findAll({
    where: {
      projectId: projectId,
      name: { [Op.iLike]: `${query}%` }
    }
  })
  const boardsWithCount = await Promise.all(
    boards.map(async (board) => {
      const result = await Task.findAndCountAll({
        where: { board_id: board.id }
      })
      return {
        ...board.toJSON(),
        taskCount: result.count
      }
    })
  )
  return boardsWithCount
}

export const createProjectBoard = async (projectId, name) => {
  const verifyName = await Board.findOne({
    where: {
      name: name,
      projectId: projectId
    }
  })
  if (verifyName) throw new Error('Board name already exists')
  const board = await Board.create({
    name,
    projectId: projectId
  })
  return board
}

export const updateBoardDetails = async (projectId, boardId, newName) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      projectId: projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const existingBoardName = await Board.findOne({
    where: {
      name: newName,
      projectId: projectId,
    }
  })
  if (existingBoardName) throw new Error('Board name already exists')
  await board.update({
    name: newName
  })
  return board
}

export const removeBoard = async (projectId, boardId) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      projectId: projectId
    }
  })
  if (!board) throw new Error('Board not found')
  board.destroy({ force: true })
}

export const editBoardColor = async (projectId, boardId, colorId) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      projectId: projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const color = await BoardColor.findByPk(colorId)
  if (!color) throw new Error('Color not found')
  await board.update({
    colorId: colorId
  })
}
