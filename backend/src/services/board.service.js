import Board from '../models/board.model.js'
import Label from '../models/label.model.js'
import Task from '../models/task.model.js'
import { Op } from 'sequelize'

export const findAllBoards = async (projectId, query) => {
  const boards = await Board.findAll({
    where: {
      project_id: projectId,
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
      project_id: projectId
    }
  })
  if (verifyName) throw new Error('Board name already exists')
  const board = await Board.create({
    name,
    project_id: projectId
  })
  return board
}

export const updateBoardDetails = async (projectId, boardId, newName) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      project_id: projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const existingBoardName = await Board.findOne({
    where: {
      name: newName,
      project_id: projectId,
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
      project_id: projectId
    }
  })
  if (!board) throw new Error('Board not found')
  board.destroy({ force: true })
}

export const updateLabelOnBoard = async (projectId, boardId, labelId) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      project_id: projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const label = await Label.findByPk(labelId)
  if (!label) throw new Error('Label not found')
  await board.update({
    label_id: labelId
  })
}
