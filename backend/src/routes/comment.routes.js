import { Router } from 'express'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { commentSchema } from '../schemas/comment.schema.js'
import { createComment, deleteComment, getComments, updateComment } from '../controllers/comment.controller.js'

const router = Router()

router.get('/projects/:projectId/boards/:boardId/tasks/:taskId/comments', getComments) // no se usa
router.post('/projects/:projectId/boards/:boardId/tasks/:taskId/comments', validateSchema(commentSchema), createComment)
router.patch('/projects/:projectId/boards/:boardId/tasks/:taskId/comments/:commentId', validateSchema(commentSchema), updateComment)
router.delete('/projects/:projectId/boards/:boardId/tasks/:taskId/comments/:commentId', deleteComment)

export default router