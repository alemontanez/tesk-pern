import { Router } from 'express'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { boardSchema, updateBoardLabelSchema } from '../schemas/board.schema.js'
import {
  createBoard,
  deleteBoard,
  getBoards,
  updateBoard,
  updateBoardLabel
} from '../controllers/board.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Endpoints para los tableros (boards)
 */

/**
 * @swagger
 * /projects/{projectId}/boards:
 *   get:
 *     summary: Busca y filtra los tableros de un proyecto por nombre.
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto requerido.
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Texto para buscar en los nombres de los boards.
 *     responses:
 *       200:
 *         description: Lista de boards del proyecto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoardSchema'
 *       403:
 *         description: Permisos insuficientes.
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
 *                     -  'Access denied: insufficient permissions'
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
router.get('/:projectId/boards', getBoards) 

/**
 * @swagger
 * /projects/{projectId}/boards:
 *   post:
 *     summary: Permite crear un tablero (board).
 *     tags: [Boards]
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
 *             $ref: '#/components/schemas/BoardPayloadSchema'
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
 *                   example: Board created successfully
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
 *                     - 'Access denied: insufficient permissions'
 *       409:
 *         description: Error al validar la disponibilidad del nombre para el tablero.
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
 *                     - 'Board name already exists'
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
router.post('/:projectId/boards', validateSchema(boardSchema), createBoard) 

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}:
 *   patch:
 *     summary: Permite actualizar un tablero por id.
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto en que se encuentra el tablero.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del tablero a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardPayloadSchema'
 *     responses:
 *       200:
 *         description: Tablero actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: Board updated successfully
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
 *                     - 'Access denied: insufficient permissions'
 *       404:
 *         description: Tablero no encontrado.
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
 *                     - 'Board not found'
 *       409:
 *         description: Error al validar el cambio de nombre del tablero.
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
 *                     - 'Board name already exists'
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
router.patch('/:projectId/boards/:boardId', validateSchema(boardSchema), updateBoard) 

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}:
 *   delete:
 *     summary: Permite eliminar un tablero por id.
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto donde se encuentra el tablero.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del tablero a eliminar.
 *     responses:
 *       204:
 *         description: Tablero eliminado correctamente (sin contenido).
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
 *                     - 'Access denied: insufficient permissions'
 *       404:
 *         description: Tablero no encontrado.
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
 *                     - 'Board not found'
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
router.delete('/:projectId/boards/:boardId', deleteBoard) 

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}/change-label:
 *   patch:
 *     summary: Permite actualizar el label de un tablero por id.
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto en que se encuentra el tablero.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del tablero a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBoardLabelSchema'
 *     responses:
 *       200:
 *         description: Tablero actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: Board updated successfully
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
 *                     - 'Label id is required'
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
 *                     - 'Access denied: insufficient permissions'
 *       404:
 *         description: Tablero no encontrado / Label no encontrado.
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
 *                     - 'Board not found'
 *                     - 'Label not found'
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
router.patch('/:projectId/boards/:boardId/change-label', validateSchema(updateBoardLabelSchema), updateBoardLabel) 

export default router