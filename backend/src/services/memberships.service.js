import Project_users from '../models/project_users.model.js'
import User from '../models/user.model.js'
import Role from '../models/role.model.js'
import { Op } from 'sequelize'

export const findAllMembersOfProject = async (projectId) => {
  const members = await Project_users.findAll({
    where: { project_id: projectId },
    attributes: [],
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name', 'email']
      },
      {
        model: Role,
        as: 'role',
        attributes: ['id', 'name']
      }
    ],
    order: [
      ['role', 'id', 'DESC']
    ]
  })
  return members
}

export const searchUsersNotInProject = async (projectId, query) => {
  const users = await User.findAll({
    subQuery: false,
    include: [{
      model: Project_users,
      required: false,
      where: {
        project_id: projectId
      },
      attributes: []
    }],
    where: { 
      '$Project_users.user_id$': { [Op.is]: null },
      email: { [Op.like]: `%${query}%`}
    },
    attributes: ['id', 'first_name', 'last_name', 'email'],
    limit: 6,
  })
  return users
}

export const createMembership = async (projectId, memberId) => {
  const userExists = await User.findByPk(memberId)
  if (!userExists) throw new Error('User not found')
  
  const memberExists = await Project_users.findOne({
    where: {
      project_id: projectId,
      user_id: memberId
    }
  })
  if (memberExists) throw new Error('Member already exists')

  const role = await Role.findOne({
    where: { name: 'viewer'}
  })

  await Project_users.create({
    user_id: memberId,
    project_id: projectId,
    role_id: role.id
  })
}

