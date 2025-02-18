import { Router } from 'express'
import { changePassword, getUser, updateUser } from '../controllers/user.controller.js'
import { authRequired } from '../middlewares/jwtValidator.middleware.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { changePasswordSchema, updateProfileSchema } from '../schemas/user.schema.js'

const router = Router()


router.get('/profile', authRequired, getUser)
router.patch('/profile', authRequired, validateSchema(updateProfileSchema), updateUser)
router.patch('/profile/change-password', authRequired, validateSchema(changePasswordSchema), changePassword)

export default router