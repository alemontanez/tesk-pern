import { Router } from 'express'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { commentSchema } from '../schemas/comment.schema.js'
import { createComment, deleteComment, getComments, updateComment } from '../controllers/comment.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints para los comentarios
 */

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}/tasks/{taskId}/comments:
 *   get:
 *     summary: Obtiene los comentarios de una tarea.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del board.
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id de la tarea.
 *     responses:
 *       200:
 *         description: Lista de boards del proyecto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommentSchema'
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
 *       404:
 *         description: Tablero o tarea no encontrado.
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
 *                     -  'Task not found'
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
router.get('/projects/:projectId/boards/:boardId/tasks/:taskId/comments', getComments) // no se usa

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}/tasks/{taskId}/comments:
 *   post:
 *     summary: Permite crear un comentario asociado a una tarea.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del board.
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id de la tarea.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentPayloadSchema'
 *     responses:
 *       201:
 *         description: Comentario creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: Comment created successfully
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
 *                     - 'Content is required'
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
 *         description: Tablero o tarea no encontrado.
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
 *                     - 'Task not found'
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
router.post('/projects/:projectId/boards/:boardId/tasks/:taskId/comments', validateSchema(commentSchema), createComment)

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}/tasks/{taskId}/comments/{commentId}:
 *   patch:
 *     summary: Permite actualizar un comentario por id.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del board.
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id de la tarea.
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del comentario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentPayloadSchema'
 *     responses:
 *       200:
 *         description: Comentario actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: Comment updated successfully
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
 *                     - 'Content is required'
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
 *         description: Tablero, tarea o comentario no encontrado.
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
 *                     - 'Comment not found'
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
router.patch('/projects/:projectId/boards/:boardId/tasks/:taskId/comments/:commentId', validateSchema(commentSchema), updateComment)

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}/tasks/{taskId}/comments/{commentId}:
 *   delete:
 *     summary: Permite eliminar un comentario por id.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del board.
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id de la tarea.
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del comentario.
 *     responses:
 *       204:
 *         description: Comentario eliminado correctamente.
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
 *         description: Tablero, tarea o comentario no encontrado.
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
 *                     - 'Comment not found'
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
router.delete('/projects/:projectId/boards/:boardId/tasks/:taskId/comments/:commentId', deleteComment)

export default router