import Board from '../models/board.model.js'
import Task from '../models/task.model.js'
import TaskPriority from '../models/taskPriority.model.js'
import User from '../models/user.model.js'
import Comment from '../models/comment.model.js'
import Membership from '../models/membership.model.js'
import Role from '../models/role.model.js'
import { Op, fn, col } from 'sequelize'

import { checkPermissions } from '../utils/checkPermissions.js'

export const findAllTasks = async (projectId, boardId, sort, order) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      project_id: projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const allowedSortFields = ['id', 'title', 'due_date', 'createdAt', 'updatedAt', 'priority_id', 'assigned_to', 'created_by']
  const sortField = sort?.toString().trim()
  const filter = allowedSortFields.includes(sortField) ? sort : 'id'
  const direction = order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
  const tasks = await Board.findOne({
    where: { id: boardId },
    include: [
      {
        model: Task,
        where: { board_id: boardId },
        required: false,
        attributes: ['id', 'title', 'description', 'due_date', 'createdAt', 'updatedAt', 'priority_id', 'assigned_to', 'created_by'],
        include: [
          { model: TaskPriority, attributes: ['name'] },
          { model: User, attributes: ['first_name', 'last_name'], as: 'assignedTo' },
          { model: User, attributes: ['first_name', 'last_name'], as: 'createdBy' }
        ]
      }
    ],
    order: [[{ model: Task }, filter, direction]]
  })
  return tasks
}

export const addNewTask = async (userId, projectId, boardId, title, description, dueDate, priorityId) => {
  const boardValidation = await Board.findOne({
    where: {
      id: boardId,
      project_id: projectId
    }
  })
  if (!boardValidation) throw new Error('Board not found')
  const priority = await TaskPriority.findByPk(priorityId)
  if (!priority) throw new Error('Priority not found')
  const task = await Task.create({
    title,
    description,
    created_by: userId,
    assigned_to: userId,
    board_id: boardId,
    due_date: new Date(dueDate),
    priority_id: priorityId
  })
  return task
}

export const editTask = async (projectId, boardId, taskId, title, description, assignedTo, dueDate, priorityId) => {
  const verifyAssignedUser = await checkPermissions(assignedTo, projectId)
  if (!verifyAssignedUser.can_edit) throw new Error('Access denied: insufficient permissions')
  const task = await Task.findOne({
    where: {
      id: taskId
    },
    include: [{
      model: Board,
      where: {
        id: boardId,
        project_id: projectId
      },
      attributes: []
    }]
  })
  if (!task) throw new Error('Task not found')
  const priority = await TaskPriority.findByPk(priorityId)
  if (!priority) throw new Error('Priority not found')
  const updatedTask = await task.update({
    title,
    description,
    assigned_to: assignedTo,
    due_date: new Date(dueDate),
    priority_id: priorityId,
  })
  return updatedTask
}

export const removeTask = async (projectId, boardId, taskId) => {
  const task = await Task.findOne({
    where: {
      id: taskId
    },
    include: [{
      model: Board,
      where: {
        id: boardId,
        project_id: projectId
      },
      attributes: []
    }]
  })
  if (!task) throw new Error('Task not found')
  await task.destroy({ force: true })
}

export const findTaskById = async (projectId, boardId, taskId) => {
  const task = await Task.findOne({
    where: {
      id: taskId
    },
    include: [
      {
        model: Board,
        where: {
          id: boardId,
          project_id: projectId
        },
        attributes: []
      },
      {
        model: Comment,
        where: { task_id: taskId },
        required: false,
        include: [{
          model: User,
          attributes: ['first_name', 'last_name']
        }]
      }
    ]
  })
  if (!task) throw new Error('Task not found')
  const viewerRole = await Role.findOne({
    where: { name: 'viewer' }
  })
  const users = await User.findAll({
    attributes: ['id', [fn('CONCAT', col('first_name'), ' ', col('last_name')), 'name']],
    include: [{
      model: Membership,
      where: {
        projectId: projectId,
        [Op.not]: [{ roleId: viewerRole.id }]
      },
      attributes: []
    }]
  })
  const priorities = await TaskPriority.findAll({
    attributes: ['id', 'name']
  })
  const creator = await User.findOne({
    where: { id: task.created_by },
    attributes: [[fn('CONCAT', col('first_name'), ' ', col('last_name')), 'name']]
  })
  if (!creator) throw new Error('Creator user not found')
  const assignedUser = await User.findOne({
    where: { id: task.assigned_to },
    attributes: [[fn('CONCAT', col('first_name'), ' ', col('last_name')), 'name']]
  })
  if (!assignedUser) throw new Error('Assigned user not found')
  return {
    task,
    users,
    priorities,
    creator,
    assignedUser
  }
}

export const searchTasksByCriteria = async (boardId, criteria) => {
  const allowedSortFields = ['id', 'title', 'due_date', 'createdAt', 'updatedAt', 'priority_id', 'assigned_to', 'created_by']
  const sortField = criteria.sort?.toString().trim()
  const filter = allowedSortFields.includes(sortField) ? criteria.sort : 'id'
  const direction = criteria.order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
  const tasks = await Task.findAll({
    where: {
      board_id: boardId,
      title: { [Op.iLike]: `%${criteria.query}%` }
    },
    attributes: ['id', 'title', 'description', 'due_date', 'createdAt', 'updatedAt', 'priority_id', 'assigned_to', 'created_by'],
    include: [
      { model: TaskPriority, attributes: ['name'] },
      { model: User, attributes: ['first_name', 'last_name'], as: 'assignedTo' },
      { model: User, attributes: ['first_name', 'last_name'], as: 'createdBy' }
    ],
    order: [[filter, direction]]
  })
  return tasks
}