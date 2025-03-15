import { Router } from 'express'
import { login, logout, register, verifyToken } from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/auth/register', validateSchema(registerSchema), register)
router.post('/auth/login', validateSchema(loginSchema), login)
router.post('/auth/logout', logout)
router.get('/auth/verify', verifyToken)

export default router