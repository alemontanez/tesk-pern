import { Router } from 'express'
import { permissionMiddleware } from '../middlewares/permission.middleware.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { memberSchema } from '../schemas/memberships.schema.js'
import {
  addMemberToProject,
  getProjectMembers,
  findPotentialMembers
} from '../controllers/memberships.controller.js'

const router = Router()
/**
 * @swagger
 * tags:
 *   name: Memberships
 *   description: Endpoints para las membresías de usuarios dentro de proyectos
 */

/**
 * @swagger
 * /projects/{projectId}/memberships:
 *   get:
 *     summary: Obtiene los miembros de un proyeto y sus roles.
 *     tags: [Memberships]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto requerido.
 *     responses:
 *       200:
 *         description: Lista de miembros del proyecto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectMemberSchema'
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
  '/projects/:projectId/memberships',
  permissionMiddleware('can_view'),
  getProjectMembers
)

/**
 * @swagger
 * /projects/{projectId}/memberships/users:
 *   get:
 *     summary: Busca y filtra los usuario que no pertenecen al proyecto para poder agregarlos.
 *     tags: [Memberships]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto requerido.
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Opción para filtrar usuarios que no pertenezcan ya al proyecto.
 *     responses:
 *       200:
 *         description: Lista de miembros del proyecto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserSearchResultSchema'
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
  '/projects/:projectId/memberships/users',
  permissionMiddleware('can_manage'),
  findPotentialMembers
)

/**
 * @swagger
 * /projects/{projectId}/memberships:
 *   post:
 *     summary: Permite añadir un miembro a un proyecto.
 *     tags: [Memberships]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto requerido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMemberSchema'
 *     responses:
 *       201:
 *         description: Tarea creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: Task created successfully
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
 *                     - 'Member id is required'
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
 *                     - 'Forbidden'
 *       404:
 *         description: Proyecto y/o tablero no encontrado.
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
 *                     -  'User not found'
 *       409:
 *         description: Error al validar existencia del usuario en el proyecto.
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
 *                     -  'Member already exists'
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
  '/projects/:projectId/memberships',
  permissionMiddleware('can_manage'),
  validateSchema(memberSchema),
  addMemberToProject
)

export default router


