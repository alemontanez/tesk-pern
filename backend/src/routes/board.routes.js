import { Router } from 'express'
import { countBoardTasks, createBoard, deleteBoard, getBoards, updateBoard, updateBoardLabel } from '../controllers/board.controller.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { createBoardSchema, updateBoardLabelSchema, updateBoardSchema } from '../schemas/board.schema.js'

const router = Router()

router.get('/projects/:projectId/boards', getBoards)
router.post('/projects/:projectId/boards', validateSchema(createBoardSchema), createBoard)
router.patch('/projects/:projectId/boards/:boardId', validateSchema(updateBoardSchema), updateBoard)
router.patch('/projects/:projectId/boards/:boardId/change-label', validateSchema(updateBoardLabelSchema), updateBoardLabel)
router.delete('/projects/:projectId/boards/:boardId', deleteBoard)

export default router