import { Router } from 'express'
import { authRequired } from '../middlewares/jwtValidator.middleware.js'
import { getUser, updateUser } from '../controllers/user.controller.js'

const router = Router()

router.get('/profile', authRequired, getUser)
router.patch('/profile', authRequired, updateUser)

export default router