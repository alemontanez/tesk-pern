import { Router } from 'express'
import { changePassword, getUser, updateUser } from '../controllers/user.controller.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { changePasswordSchema, updateProfileSchema } from '../schemas/user.schema.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints para la información del usuario
 */

router.get('/', getUser)
router.patch('/', validateSchema(updateProfileSchema), updateUser)
router.patch('/change-password', validateSchema(changePasswordSchema), changePassword)

export default router