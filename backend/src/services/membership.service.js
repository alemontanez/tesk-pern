import {
  Membership,
  User,
  Role,
} from '../models/index.js'
import { Op } from 'sequelize'

export const findAllMembersOfProject = async (projectId) => {
  const members = await Membership.findAll({
    where: { projectId: projectId },
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
      model: Membership,
      required: false,
      where: {
        projectId: projectId
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
  
  const memberExists = await Membership.findOne({
    where: {
      projectId: projectId,
      userId: memberId
    }
  })
  if (memberExists) throw new Error('Member already exists')

  const role = await Role.findOne({
    where: { name: 'viewer'}
  })

  await Membership.create({
    userId: memberId,
    projectId: projectId,
    roleId: role.id
  })
}

