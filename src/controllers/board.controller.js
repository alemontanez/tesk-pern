import { changeLabel, createProjectBoard, getProjectBoards, updateBoardName } from '../services/board.service.js'

export const getBoards = async (req, res) => {
  const { project_id } = req.body
  try {
    const boards = await getProjectBoards(project_id)
    res.status(200).json(boards)
  } catch (error) {
    console.log(error)
    if (error.message === 'Project not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const createBoard = async (req, res) => {
  const { name, project_id } = req.body
  try {
    const board = await createProjectBoard(name, project_id)
    res.status(201).json({
      message: 'Board created successfully',
      board
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Project not found') {
      return res.status(404).json({ message: error.message })
    }
    if (error.message === 'The selected name is already in use') {
      return res.status(409).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const updateBoard = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const updatedBoard = await updateBoardName(id, name)
    res.status(200).json({
      message: 'Board updated successfully',
      updateBoard
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Board not found') {
      return res.status(404).json({ message: error.message })
    }
    if (error.message === 'Board name already exists') {
      return res.status(409).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const updateBoardLabel = async (req, res) => {
  const { id } = req.params
  const { label_id } = req.body
  try {
    await changeLabel(id, label_id)
    res.status(200).json({ message: 'Label changed successfully' })
  } catch (error) {
    console.log(error)
    if (error.message === 'Board not found' || error.message === 'Label not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}