import Board from '../models/board.model.js'
import Label from '../models/label.model.js'
import Task from '../models/task.model.js'
import { checkPermissions } from '../utils/checkPermissions.js'

export const getProjectBoards = async (userId, projectId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_view) throw new Error('Forbidden')
  const boards = await Board.findAll({
    where: { project_id: projectId }
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

export const createProjectBoard = async (userId, projectId, name) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_manage) throw new Error('Forbidden')
  const verifyName = await Board.findOne({
    where: { name: name, project_id: projectId }
  })
  if (verifyName) throw new Error('The selected name is already in use')
  const board = await Board.create({
    name,
    project_id: projectId
  })
  return board
}

export const updateBoardName = async (userId, projectId, boardId, newName) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_manage) throw new Error('Forbidden')
  const board = await Board.findByPk(boardId)
  if (!board) throw new Error('Board not found')
  const existingBoardName = await Board.findOne({ where: { name: newName } })
  if (existingBoardName) throw new Error('Board name already exists')
  await board.update({
    name: newName
  })
  return board
}

export const changeLabel = async (userId, projectId, boardId, labelId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_manage) throw new Error('Forbidden')
  const board = await Board.findByPk(boardId)
  if (!board) throw new Error('Board not found')
  const label = await Label.findByPk(labelId)
  if (!label) throw new Error('Label not found')
  await board.update({
    label_id: labelId
  })
}

export const deleteBoardService = async (userId, projectId, boardId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_manage) throw new Error('Forbidden')
  const board = await Board.findByPk(boardId)
  if (!board) throw new Error('Board not found')
  board.destroy({ force: true })
}