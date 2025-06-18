import { Router } from 'express'
import { getRole, getRoles } from '../controllers/role.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Endpoints para los roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtiene un array con todos los roles posibles que se puede asignar a un usuario.
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleSchema'
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
router.get('/', getRoles)

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtiene un rol en específico por id.
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del rol requerido.
 *     responses:
 *       200:
 *         description: Rol buscado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleSchema'
 *       404:
 *         description: Rol no encontrado.
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
 *                     -  'Role not found'
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
router.get('/:id', getRole)

export default router