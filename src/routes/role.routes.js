import { Router } from 'express'
import { getRole } from '../controllers/role.controller.js'

const router = Router()

router.get('/roles/:id', getRole)

export default router