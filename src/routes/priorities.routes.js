import { Router } from 'express'
import { getPriorities } from '../controllers/priorities.controller.js'

const router = Router()

router.get('/priorities', getPriorities)


export default router