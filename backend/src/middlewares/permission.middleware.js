import Membership from '../models/membership.model.js'
import Role from '../models/role.model.js'

export const permissionMiddleware = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const { id: userId } = req.user
      const { projectId } = req.params

      const membership = await Membership.findOne({
        where: { userId: userId, projectId: projectId },
        include: [{
          model: Role,
          as: 'role'
        }]
      })

      if (!membership) {
        return res.status(403).json({ error: 'Access denied: insufficient permissions' })
      }

      if (!membership.role[requiredPermission]) {
        return res.status(403).json({ error: 'Access denied: insufficient permissions' })
      }

      req.role = membership.role
      next()
    } catch (error) {
      next(error)
    }
  }
}