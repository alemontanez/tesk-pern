import Project_users from '../models/project_users.model.js'
import User from '../models/user.model.js'
import Role from '../models/role.model.js'

export const getMembersService = async (projectId) => {
  const members = await Project_users.findAll({
    where: { project_id: projectId },
    attributes: [],
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name']
      },
      {
        model: Role,
        as: 'role',
        attributes: ['name']
      }
    ]
  })

return members
}