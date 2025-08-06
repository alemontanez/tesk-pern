import Membership from '../models/membership.model.js'
import Role from '../models/role.model.js'

export const checkPermissions = async (userId, projectId) => {
  const user = await Membership.findOne({
    where: { userId: userId, projectId: projectId },
    include: [{
      model: Role,
      as: 'role'
    }]
  })
  if (!user) throw new Error('Forbidden')
  return user.role
}