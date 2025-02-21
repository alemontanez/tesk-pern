import { Router } from 'express'
import { createMembership, updateMembership } from '../controllers/project_users.controller.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { memberSchema } from '../schemas/project_users.schema.js'

const router = Router()

router.post('/memberships', validateSchema(memberSchema), createMembership)
router.patch('/memberships', validateSchema(memberSchema), updateMembership)

export default router