import { Router } from 'express'
import { getProject, getUserProjects, createProject, updateProject, deleteProject, getUserRole } from '../controllers/project.controller.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema.js'
import { permissionMiddleware } from '../middlewares/permission.middleware.js'

const router = Router()

router.post('/projects', validateSchema(createProjectSchema), createProject)
router.get('/projects', getUserProjects)
router.get('/projects/:projectId', getProject)
router.patch('/projects/:projectId', validateSchema(updateProjectSchema), updateProject)
router.delete('/projects/:projectId', deleteProject)
router.get('/projects/:projectId/permissions', permissionMiddleware('can_view'), getUserRole)


export default router