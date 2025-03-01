import { Router } from 'express'
import { getProject, getProjects, createProject, updateProject, deleteProject } from '../controllers/project.controller.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema.js'

const router = Router()

router.post('/projects', validateSchema(createProjectSchema), createProject)
router.get('/projects', getProjects)
router.get('/projects/:id', getProject)
router.patch('/projects/:id', validateSchema(updateProjectSchema), updateProject)
router.delete('/projects/:id', deleteProject)

export default router