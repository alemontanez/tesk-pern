import Project_users from '../models/project_users.model.js'
import Role from '../models/role.model.js'

export const permissionMiddleware = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id
      const { projectId } = req.params

      const projectUser = await Project_users.findOne({
        where: { user_id: userId, project_id: projectId },
        include: [{
          model: Role,
          as: 'role'
        }]
      })

      if (!projectUser) {
        return res.status(403).json({ error: 'Access denied: insufficient permissions' })
      }

      if (!projectUser.role[requiredPermission]) {
        return res.status(403).json({ error: 'Access denied: insufficient permissions' })
      }

      req.role = projectUser.role
      next()
    } catch (error) {
      next(error)
    }
  }
}