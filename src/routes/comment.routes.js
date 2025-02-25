import { Router }from 'express'

const router = Router()

router.get('/tasks/:taskId/comments')
router.post('/tasks/:taskId/comments')
router.patch('/tasks/:taskId/comments/:commentId')

export default router