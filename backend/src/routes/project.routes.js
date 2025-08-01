import { Router } from 'express'
import { permissionMiddleware } from '../middlewares/permission.middleware.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import {
  createProjectSchema,
  updateProjectSchema
} from '../schemas/project.schema.js'
import {
  getUserProjects,
  getProjectById,
  getUserRoleInProject,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Endpoints para los proyectos
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Obtiene todos los proyetos en los que el usuario participe.
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Lista de proyectos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectSchema'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 
 *                     -  'Internal error'
 */
router.get(
  '/',
  getUserProjects
)

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     summary: Obtiene un proyecto por id.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto requerido.
 *     responses:
 *       200:
 *         description: Información del proyecto con sus tableros.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectWithBoardsSchema'
 *       404:
 *         description: Proyecto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 
 *                     -  'Project not found'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 
 *                     -  'Internal error'
 */
router.get(
  '/:projectId',
  permissionMiddleware('can_view'),
  getProjectById
)

/**
 * @swagger
 * /projects/{projectId}/permissions:
 *   get:
 *     summary: Obtiene el rol de un usuario en un proyecto.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto requerido.
 *     responses:
 *       200:
 *         description: Información del rol y los permisos del usuario en el proyecto.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleSchema'
 *       403:
 *         description: Usuario sin permisos para realizar la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 
 *                     -  'Forbidden'
 *       404:
 *         description: Proyecto no encontrado / Miembro no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 
 *                     -  'Project not found'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 
 *                     -  'Internal error'
 */
router.get(
  '/:projectId/permissions',
  permissionMiddleware('can_view'),
  getUserRoleInProject
)

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Permite crear un proyecto.
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProjectSchema'
 *     responses:
 *       201:
 *         description: Proyecto creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: Project created successfully
 *       400:
 *         description: Error al validar los datos recibidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'Name is required'
 *                     - 'Description is required'
 *       409:
 *         description: Error al validar la disponibilidad del nombre para el proyecto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'Project name already exists'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 
 *                     -  'Internal error'
 */
router.post(
  '/',
  validateSchema(createProjectSchema),
  createProject
)

/**
 * @swagger
 * /projects/{projectId}:
 *   patch:
 *     summary: Permite actualizar un proyecto por id.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProjectSchema'
 *     responses:
 *       200:
 *         description: Proyecto actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: Project updated successfully
 *       400:
 *         description: Error al validar los datos recibidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'Name must be at least 2 characters'
 *                     - 'Description must not exceed 255 characters'
 *       403:
 *         description: Falta de permisos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'The user does not have permissions'
 *       404:
 *         description: Proyecto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'Project not found'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 
 *                     -  'Internal error'
 */
router.patch(
  '/:projectId',
  permissionMiddleware('can_edit'),
  validateSchema(updateProjectSchema),
  updateProject
)

/**
 * @swagger
 * /projects/{projectId}:
 *   delete:
 *     summary: Permite eliminar un proyecto por id.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto a eliminar.
 *     responses:
 *       204:
 *         description: Proyecto eliminado correctamente (sin contenido).
 *       403:
 *         description: Falta de permisos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'The user does not have permissions'
 *       404:
 *         description: Proyecto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'Project not found'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 
 *                     -  'Internal error'
 */
router.delete(
  '/:projectId',
  permissionMiddleware('is_owner'),
  deleteProject
)


export default router