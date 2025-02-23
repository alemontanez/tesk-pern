import Board from '../models/board.model.js'
import Project from '../models/project.model.js'
import Label from '../models/label.model.js'

// getBoards, createBoard, updateBoard, changeBoardLabel, deleteBoard(configurar cascade primero)

export const getProjectBoards = async (projectId) => {
  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')

  const boards = await Board.findAll({ where: { project_id: projectId } })
  return boards
}

export const createProjectBoard = async (name, projectId) => {
  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')

  const verifyName = await Board.findOne({ where: {name: name, project_id: projectId}})
  if (verifyName) throw new Error('The selected name is already in use')

  const board = await Board.create({
    name,
    project_id: projectId
  })
  return board
}

export const updateBoardName = async (boardId, newName) => {
  const board = await Board.findByPk(boardId)
  if (!board) throw new Error('Board not found')

  const existingBoardName = await Board.findOne({ where: { name: newName}})
  if (existingBoardName) throw new Error('Board name already exists')

  await board.update({
    name: newName
  })
  return board
}

export const changeLabel = async (boardId, labelId) => {
  const board = await Board.findByPk(boardId)
  if (!board) throw new Error('Board not found')
  
  const label = await Label.findByPk(labelId)
  if (!label) throw new Error('Label not found')

  await board.update({
    label_id: labelId
  })
}