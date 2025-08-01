import {
  findAllBoards,
  createProjectBoard,
  updateBoardDetails,
  removeBoard,
  updateLabelOnBoard,
} from '../services/board.service.js'


export const getBoards = async (req, res) => {
  const { projectId } = req.params
  const { search } = req.query
  try {
    const boards = await findAllBoards(projectId, search)
    res.status(200).json(boards)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const createBoard = async (req, res) => {
  const { projectId } = req.params
  const { name } = req.body
  try {
    await createProjectBoard(projectId, name)
    res.status(201).json({ message: 'Board created successfully' })
  } catch (error) {
    console.log(error)
    if (error.message === 'Board name already exists') {
      return res.status(409).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const updateBoard = async (req, res) => {
  const { projectId, boardId } = req.params
  const { name } = req.body
  try {
    const updatedBoard = await updateBoardDetails(projectId, boardId, name)
    res.status(200).json({
      message: 'Board updated successfully',
      updatedBoard
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Board not found') {
      return res.status(404).json({ error: [error.message] })
    }
    if (error.message === 'Board name already exists') {
      return res.status(409).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}


export const deleteBoard = async (req, res) => {
  const { projectId, boardId } = req.params
  try {
    await removeBoard(projectId, boardId)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    if (error.message === 'Board not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const updateBoardLabel = async (req, res) => {
  const { projectId, boardId } = req.params
  const { labelId } = req.body
  try {
    await updateLabelOnBoard(projectId, boardId, labelId)
    res.status(200).json({ message: 'Label changed successfully' })
  } catch (error) {
    console.log(error)
    if (error.message === 'Board not found' || error.message === 'Label not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}