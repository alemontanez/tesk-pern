import { Router } from 'express'
import { getLabels } from '../controllers/label.controller.js'

const router = Router()

router.get('/labels', getLabels)


export default router