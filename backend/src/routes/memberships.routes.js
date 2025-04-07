import { Router } from 'express'
import { addMember, getMembers, searchUsers } from '../controllers/memberships.controller.js'
import { permissionMiddleware } from '../middlewares/permission.middleware.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { memberSchema } from '../schemas/memberships.schema.js'

const router = Router()

router.get('/projects/:projectId/memberships', permissionMiddleware('can_view'), getMembers)
router.get('/projects/:projectId/memberships/users', permissionMiddleware('can_manage'), searchUsers)
router.post('/projects/:projectId/memberships', permissionMiddleware('can_manage'), validateSchema(memberSchema), addMember)

export default router


