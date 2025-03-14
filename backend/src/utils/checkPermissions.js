import Project_users from '../models/project_users.model.js'
import Role from '../models/role.model.js'

export const checkPermissions = async (userId, projectId) => {
  const user = await Project_users.findOne({
    where: { user_id: userId, project_id: projectId },
    include: [{
      model: Role,
      as: 'role'
    }]
  })
  if (!user) throw new Error('Forbidden')
  return user.role
}