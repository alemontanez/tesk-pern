import { Router } from 'express'
import { createBoard, getBoards, updateBoard, updateBoardLabel } from '../controllers/board.controller.js'
// importar controladores
// importar middleware para validaciones
// importa esquemas

const router = Router()

router.get('/boards', getBoards)
router.post('/boards', createBoard)
router.patch('/boards/:id', updateBoard)
router.patch('/boards/:id/change-label', updateBoardLabel)

export default router