import { Router } from 'express'
import { createMembership, updateMembership } from '../controllers/project_users.controller.js'

const router = Router()

router.get('/memberships', (req, res) => {
  res.json('hola project users')
})
router.post('/memberships', createMembership)
router.patch('/memberships', updateMembership)

export default router