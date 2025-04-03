import { Router } from 'express'
import { getMembers } from '../controllers/memberships.controller.js'
import { permissionMiddleware } from '../middlewares/permission.middleware.js'

const router = Router()

router.get('/projects/:projectId/memberships', permissionMiddleware('can_view'), getMembers)

export default router