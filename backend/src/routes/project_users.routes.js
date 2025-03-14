import { Router } from 'express'
import { createMembership, deleteMembership, updateMembership } from '../controllers/project_users.controller.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { deleteMemberSchema, memberSchema } from '../schemas/project_users.schema.js'

const router = Router()

router.post('/memberships', validateSchema(memberSchema), createMembership)
router.patch('/memberships', validateSchema(memberSchema), updateMembership)
router.delete('/memberships', validateSchema(deleteMemberSchema), deleteMembership)

export default router