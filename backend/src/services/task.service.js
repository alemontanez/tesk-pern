import Board from '../models/board.model.js'
import Task from '../models/task.model.js'
import Priority from '../models/priority.model.js'
import Label from '../models/label.model.js'
import User from '../models/user.model.js'
import Comment from '../models/comment.model.js'
import Project_users from '../models/project_users.model.js'
import Role from '../models/role.model.js'
import { checkPermissions } from '../utils/checkPermissions.js'
import { Op, fn, col } from 'sequelize'

export const fetchTasks = async (projectId, boardId, sort, order) => {
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
          { model: Label, attributes: ['hex_code'] },
          { model: Priority, attributes: ['name'] },
          { model: User, attributes: ['first_name', 'last_name'], as: 'assignedTo' },
          { model: User, attributes: ['first_name', 'last_name'], as: 'createdBy' }
        ]
      }
    ],
    order: [[{ model: Task }, filter, direction]]
  })

  return tasks
}

export const searchTasksService = async (boardId, query, sort, order) => {
  const allowedSortFields = ['id', 'title', 'due_date', 'createdAt', 'updatedAt', 'priority_id', 'assigned_to', 'created_by']
  const sortField = sort?.toString().trim()
  const filter = allowedSortFields.includes(sortField) ? sort : 'id'

  const direction = order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

  const tasks = await Task.findAll({
    where: {
      board_id: boardId,
      title: { [Op.iLike]: `%${query}%` }
    },
    attributes: ['id', 'title', 'description', 'due_date', 'createdAt', 'updatedAt', 'priority_id', 'assigned_to', 'created_by'],
    include: [
      { model: Label, attributes: ['hex_code'] },
      { model: Priority, attributes: ['name'] },
      { model: User, attributes: ['first_name', 'last_name'], as: 'assignedTo' },
      { model: User, attributes: ['first_name', 'last_name'], as: 'createdBy' }
    ],
    order: [[filter, direction]]
  })
  return tasks
}

export const fetchTask = async (userId, projectId, boardId, taskId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_view) throw new Error('Forbidden')
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
      model: Project_users,
      where: {
        project_id: projectId,
        [Op.not]: [{ role_id: viewerRole.id }]
      },
      attributes: []
    }]
  })

  const priorities = await Priority.findAll({
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

export const createTaskService = async (userId, projectId, boardId, title, description, dueDate, priorityId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_edit) throw new Error('Forbidden')
  const boardValidation = await Board.findOne({
    where: {
      id: boardId,
      project_id: projectId
    }
  })
  if (!boardValidation) throw new Error('Board not found')
  const priority = await Priority.findByPk(priorityId)
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

export const updateTaskService = async (userId, projectId, boardId, taskId, title, description, assignedTo, dueDate, priorityId, labelId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_edit) throw new Error('Forbidden')
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

  const priority = await Priority.findByPk(priorityId)
  if (!priority) throw new Error('Priority not found')
  const label = await Label.findByPk(labelId)
  if (!label) throw new Error('Label not found')

  const updatedTask = await task.update({
    title,
    description,
    assigned_to: assignedTo,
    due_date: new Date(dueDate),
    priority_id: priorityId,
    label_id: labelId
  })
  return updatedTask
}

export const deleteTaskService = async (userId, projectId, boardId, taskId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_manage) throw new Error('Forbidden')
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