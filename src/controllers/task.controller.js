import { fetchTask, fetchTasks, createTaskService, updateTaskService, deleteTaskService } from '../services/task.service.js'

export const getTasks = async (req, res) => {
  const { boardId } = req.params
  const { board_id } = req.body
  console.log(board_id)
  try {
    const tasks = await fetchTasks(boardId)
    res.json(tasks)
  } catch (error) {
    console.log(error)
    if (error.message === 'Board not found' || error.message === 'Tasks not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const getTask = async (req, res) => {
  const { taskId } = req.params
  try {
    const task = await fetchTask(taskId)
    res.json(task)
  } catch (error) {
    console.log(error)
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const createTask = async (req, res) => {
  const { id } = req.user
  const { boardId } = req.params
  const { title, description, due_date, priority_id } = req.body
  try {
    const task = await createTaskService(id, boardId, title, description, due_date, priority_id)
    res.status(201).json({
      message: 'Task created successfully',
      task
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Board not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const updateTask = async (req, res) => {
  const { id } = req.user
  const { taskId } = req.params
  const { title, description, assigned_to, due_date, priority_id, label_id } = req.body
  try {
    const task = await updateTaskService(taskId, title, description, assigned_to, due_date, priority_id, label_id)
    res.status(200).json({
      message: 'Task updated successfully',
      task
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const deleteTask = async (req, res) => {
  const { id } = req.user
  const { taskId } = req.params
  try {
    await deleteTaskService(taskId)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}