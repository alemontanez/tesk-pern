import { Router } from 'express'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { createTask, getTask, getTasks, updateTask } from '../controllers/task.controller.js'
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema.js'

const router = Router()

router.get('/tasks/:taskId', getTask)
router.get('/boards/:boardId/tasks', getTasks)
router.post('/boards/:boardId/tasks', validateSchema(createTaskSchema), createTask)
router.patch('/tasks/:taskId', validateSchema(updateTaskSchema), updateTask)
router.delete('/tasks/:taskId')

export default router