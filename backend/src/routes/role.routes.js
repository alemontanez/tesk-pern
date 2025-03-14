import { Router } from 'express'
import { getRole, getRoles } from '../controllers/role.controller.js'

const router = Router()

router.get('/roles', getRoles)
router.get('/roles/:id', getRole)

export default router