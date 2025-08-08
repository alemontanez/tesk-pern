import Board from '../models/board.model.js'
import BoardColor from '../models/boardColor.model.js'
import Project from '../models/project.model.js'
import Membership from '../models/membership.model.js'
import Role from '../models/role.model.js'
import Task from '../models/task.model.js'
import { Sequelize } from 'sequelize'

export const findProjectsByUserId = async (userId) => {
  const projects = await Project.findAll({
    attributes: ['id', 'name', 'description', 'ownerId', 'createdAt', 'updatedAt'],
    include: [{
      model: Membership,
      where: {
        userId
      },
      attributes: []
    }]
  })
  if (!projects) throw new Error('No projects found')
  return projects
}

export const findProjectById = async (userId, projectId) => {
  const project = await Project.findOne({
    where: { id: projectId },
    attributes: ['id', 'name', 'description', 'ownerId', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Membership,
        where: { userId: userId },
        attributes: []
      },
      {
        model: Board,
        where: { project_id: projectId },
        include: [
          {
            model: BoardColor,
            attributes: ['hex_code']
          },
          {
            model: Task,
            attributes: [],
            required: false
          }
        ],
        attributes: {
          include: [
            [Sequelize.literal(`(
              SELECT COUNT(*)
              FROM tasks
              WHERE tasks.board_id = "Boards"."id"
              )`), 'taskCount']
          ]
        }
      }
    ]
  })
  if (!project) throw new Error('Project not found')
  return project
}

export const findUserRoleForProject = async (userId, projectId) => {
  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')

  const getRole = await Membership.findOne({
    where: {
      userId: userId,
      projectId: projectId
    },
    attributes: [],
    include: [{
      model: Role,
      as: 'role',
    }]
  })
  if (!getRole) throw new Error('Member not found')

  return getRole.role
}

export const initializeNewProject = async (userId, name, description) => {
  const checkName = await Project.findOne({
    where: {
      ownerId: userId,
      name: name
    }
  })
  if (checkName) throw new Error('Project name already exists')
  const project = await Project.create({
    name,
    description,
    ownerId: userId
  })
  return project
}

export const editProject = async (userId, projectId, name, description) => {
  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')
  const checkName = await Project.findOne({
    where: {
      ownerId: userId,
      name: name
    }
  })
  if (checkName) throw new Error('Project name already exists')
  const updatedProject = await project.update({
    name,
    description
  })
  return updatedProject
}

export const removeProjectWithDependencies = async (projectId) => {
  const project = await Project.findByPk(projectId)
  if (!project) throw new Error('Project not found')
  await project.destroy({ force: true })
}

