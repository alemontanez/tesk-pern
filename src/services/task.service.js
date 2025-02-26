import Task from '../models/task.model.js'
import Board from '../models/board.model.js'
import Priority from '../models/priority.model.js'


export const fetchTasks = async (boardId) => {
  const board = await Board.findByPk(boardId)
  if (!board) throw new Error('Board not found')
  const tasks = await Task.findAll({ where: { board_id: boardId } })
  if (!tasks) throw new Error('Tasks not found')
  return tasks
}

export const fetchTask = async (taskId) => {
  const task = await Task.findByPk(taskId)
  if (!task) throw new Error('Task not found')

  return task
}

export const createTaskService = async (creatorId, boardId, title, description, due_date, priority_id) => {
  const board = await Board.findByPk(boardId)
  if (!board) throw new Error('Board not found')

  const priority = await Priority.findByPk(priority_id)
  if (!priority) throw new Error('Priority not found')

  const newTask = await Task.create({
    title,
    description,
    created_by: creatorId,
    assigned_to: creatorId,
    board_id: boardId,
    due_date: new Date(due_date),
    priority_id
  })
  return newTask
}

export const updateTaskService = async (taskId, title, description, assigned_to, due_date, priority_id, label_id) => {
  const task = await Task.findByPk(taskId)
  if (!task) throw new Error('Task not found')

  const priority = await Priority.findByPk(priority_id)
  if (!priority) throw new Error('Priority not found')

  const updatedTask = await task.update({
    title,
    description,
    assigned_to,
    due_date,
    priority_id,
    label_id
  })
  return updatedTask
}

export const deleteTaskService = async (taskId) => {
  const task = await Task.findByPk(taskId)
  if (!task) throw new Error('Task not found')

  await task.destroy({ force: true })
  // Modificar cascada del model para que funcione
}