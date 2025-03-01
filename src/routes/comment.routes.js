import { Router } from 'express'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { commentSchema } from '../schemas/comment.schema.js'
import { createComment, deleteComment, getComments, updateComment } from '../controllers/comment.controller.js'

const router = Router()

router.get('/tasks/:taskId/comments', getComments)
router.post('/tasks/:taskId/comments', validateSchema(commentSchema), createComment)
router.patch('/comments/:commentId', validateSchema(commentSchema), updateComment)
router.delete('/comments/:commentId', deleteComment)

export default router