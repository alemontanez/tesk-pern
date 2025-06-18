import { Router } from 'express'
import { getLabels } from '../controllers/label.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Labels
 *   description: Endpoints para el modelo Label
 */

/**
 * @swagger
 * /labels:
 *   get:
 *     summary: Obtiene todos los registros del modelo Label.
 *     tags: [Labels]
 *     responses:
 *       200:
 *         description: Lista de labels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LabelSchema'
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
router.get('/', getLabels)


export default router