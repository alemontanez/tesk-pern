import { Router } from 'express'
import { permissionMiddleware } from '../middlewares/permission.middleware.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema.js'
import { createTask, deleteTask, getTask, getTasks, searchTasks, updateTask } from '../controllers/task.controller.js'

const router = Router()

router.get('/projects/:projectId/boards/:boardId/tasks', permissionMiddleware('can_view'), getTasks)
router.get('/projects/:projectId/boards/:boardId/tasks/search', permissionMiddleware('can_view'), searchTasks)
router.get('/projects/:projectId/boards/:boardId/tasks/:taskId', getTask)
router.post('/projects/:projectId/boards/:boardId/tasks', validateSchema(createTaskSchema), createTask)
router.patch('/projects/:projectId/boards/:boardId/tasks/:taskId', validateSchema(updateTaskSchema), updateTask)
router.delete('/projects/:projectId/boards/:boardId/tasks/:taskId', deleteTask)

export default router