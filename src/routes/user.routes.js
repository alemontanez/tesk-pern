import { Router } from 'express'
import { changePassword, getUser, updateUser } from '../controllers/user.controller.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { changePasswordSchema, updateProfileSchema } from '../schemas/user.schema.js'

const router = Router()

router.get('/profile', getUser)
router.patch('/profile', validateSchema(updateProfileSchema), updateUser)
router.patch('/profile/change-password', validateSchema(changePasswordSchema), changePassword)

export default router