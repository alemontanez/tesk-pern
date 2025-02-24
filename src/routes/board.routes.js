import { Router } from 'express'
import { createBoard, getBoards, updateBoard, updateBoardLabel } from '../controllers/board.controller.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { createBoardSchema, getBoardsSchema, updateBoardLabelSchema, updateBoardSchema } from '../schemas/board.schema.js'

const router = Router()

router.get('/boards', validateSchema(getBoardsSchema), getBoards)
router.post('/boards', validateSchema(createBoardSchema), createBoard)
router.patch('/boards/:id', validateSchema(updateBoardSchema), updateBoard)
router.patch('/boards/:id/change-label', validateSchema(updateBoardLabelSchema), updateBoardLabel)

export default router