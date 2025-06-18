import { Router } from 'express'
import { getPriorities } from '../controllers/priorities.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Priorities
 *   description: Endpoints para las prioridades de las tareas
 */

/**
 * @swagger
 * /priorities:
 *   get:
 *     summary: Obtiene un array con todas las prioridades posibles a asignar a las tareas.
 *     tags: [Priorities]
 *     responses:
 *       200:
 *         description: Lista de prioridades.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrioritiesSchema'
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
router.get('/', getPriorities)


export default router