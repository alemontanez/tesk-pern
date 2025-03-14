import { Router } from 'express'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/task.controller.js'
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema.js'

const router = Router()

router.get('/projects/:projectId/boards/:boardId/tasks', getTasks)
router.get('/projects/:projectId/boards/:boardId/tasks/:taskId', getTask)
router.post('/projects/:projectId/boards/:boardId/tasks', validateSchema(createTaskSchema), createTask)
router.patch('/projects/:projectId/boards/:boardId/tasks/:taskId', validateSchema(updateTaskSchema), updateTask)
router.delete('/projects/:projectId/boards/:boardId/tasks/:taskId', deleteTask)

export default router