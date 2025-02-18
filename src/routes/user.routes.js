import { Router } from 'express'
import { authRequired } from '../middlewares/jwtValidator.middleware.js'
import { getUser, updateUser } from '../controllers/user.controller.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { updateProfileSchema } from '../schemas/user.schema.js'

const router = Router()


router.get('/profile', authRequired, getUser)
router.patch('/profile', authRequired, validateSchema(updateProfileSchema), updateUser)

export default router