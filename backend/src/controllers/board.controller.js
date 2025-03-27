import { changeLabel, createProjectBoard, deleteBoardService, getProjectBoards, updateBoardName } from '../services/board.service.js'

export const getBoards = async (req, res) => {
  const { projectId } = req.params
  const userId = req.user.id
  try {
    const boards = await getProjectBoards(userId, projectId)
    res.status(200).json(boards)
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const createBoard = async (req, res) => {
  const { projectId } = req.params
  const { name } = req.body
  const userId = req.user.id
  try {
    const board = await createProjectBoard(userId, projectId, name)
    res.status(201).json({
      message: 'Board created successfully',
      board
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    if (error.message === 'The selected name is already in use') {
      return res.status(409).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const updateBoard = async (req, res) => {
  const { projectId, boardId } = req.params
  const { name } = req.body
  const userId = req.user.id
  try {
    const updatedBoard = await updateBoardName(userId, projectId, boardId, name)
    res.status(200).json({
      message: 'Board updated successfully',
      updatedBoard
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    if (error.message === 'Board not found') {
      return res.status(404).json({ error: [error.message] })
    }
    if (error.message === 'Board name already exists') {
      return res.status(409).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const updateBoardLabel = async (req, res) => {
  const { projectId, boardId } = req.params
  const { labelId } = req.body
  const userId = req.user.id
  try {
    await changeLabel(userId, projectId, boardId, labelId)
    res.status(200).json({ message: 'Label changed successfully' })
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    if (error.message === 'Board not found' || error.message === 'Label not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const deleteBoard = async (req, res) => {
  const { projectId, boardId } = req.params
  const userId = req.user.id
  try {
    await deleteBoardService(userId, projectId, boardId)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    if (error.message === 'Board not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}