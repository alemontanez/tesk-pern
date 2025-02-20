import { Router } from 'express'
import { getProject, getProjects, createProject, updateProject, deleteProject } from '../controllers/project.controller.js'

const router = Router()

router.post('/projects', createProject)
router.get('/projects', getProjects)
router.get('/projects/:id', getProject)
router.patch('/projects/:id', updateProject)
router.delete('/projects', deleteProject)

export default router