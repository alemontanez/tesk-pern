import { Router } from 'express'
import { permissionMiddleware } from '../middlewares/permission.middleware.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema.js'
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  searchTasks
} from '../controllers/task.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints para las tareas
 */

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}/tasks:
 *   get:
 *     summary: Obtiene las tareas del tablero.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto requerido.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del tablero requerido.
 *       - in: query
 *         name: sort
 *         required: true
 *         schema:
 *           type: string
 *         description: Opción para clasificar el orden de las tareas.
 *       - in: query
 *         name: order
 *         required: true
 *         schema:
 *           type: string
 *         description: Opción ordenar las tareas por ascendente o descendente.
 *     responses:
 *       200:
 *         description: Lista de tareas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoardWithTasksSchema'
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
 *                     -  'Forbidden'
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
 *                     -  'Board not found'
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
router.get('/projects/:projectId/boards/:boardId/tasks', permissionMiddleware('can_view'), getTasks)

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}/tasks:
 *   post:
 *     summary: Permite crear una tarea.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto requerido.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del tablero requerido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskSchema'
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
 *                     - 'Title is required'
 *                     - 'Description is required'
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
router.post('/projects/:projectId/boards/:boardId/tasks', validateSchema(createTaskSchema), createTask)

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}/tasks/{taskId}:
 *   patch:
 *     summary: Permite actualizar una tarea por id.
 *     tags: [Tasks]
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
 *         description: Id del tablero donde se encuentra la tarea.
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id de la tarea a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskSchema'
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
 *                   example: Task updated successfully
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
 *                     - 'Title must be at least 2 characters'
 *                     - 'Description must not exceed 500 characters'
 *                     - 'Priority id must be a number'
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
 *         description: Proyecto/Tablero/Tarea no encontrado.
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
 *       409:
 *         description: Error al asignar un usuario que no participa en el proyecto.
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
 *                     - 'Assigned user does not belong to this project'
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
router.patch('/projects/:projectId/boards/:boardId/tasks/:taskId', validateSchema(updateTaskSchema), updateTask)

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}/tasks/{taskId}:
 *   delete:
 *     summary: Permite eliminar una tarea por id.
 *     tags: [Tasks]
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
 *         description: Id del tablero donde se encuentra la tarea.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id de la tarea a eliminar.
 *     responses:
 *       204:
 *         description: Tarea eliminada correctamente.
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
 *         description: Tarea no encontrada.
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
router.delete('/projects/:projectId/boards/:boardId/tasks/:taskId', deleteTask)

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}/tasks/{taskId}:
 *   get:
 *     summary: Obtiene una tarea.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto requerido.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del tablero requerido.
 *       - in: query
 *         name: sort
 *         required: true
 *         schema:
 *           type: string
 *         description: Opción para clasificar el orden de las tareas.
 *       - in: query
 *         name: order
 *         required: true
 *         schema:
 *           type: string
 *         description: Opción ordenar las tareas por ascendente o descendente.
 *     responses:
 *       200:
 *         description: Lista de tareas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskDetailedSchema'
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
 *                     -  'Forbidden'
 *       404:
 *         description: Tarea no encontrada.
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
router.get('/projects/:projectId/boards/:boardId/tasks/:taskId', getTaskById)

/**
 * @swagger
 * /projects/{projectId}/boards/{boardId}/tasks-search:
 *   get:
 *     summary: Busca y filtra las tareas del tablero.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del proyecto requerido.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del tablero requerido.
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Opción para filtrar el título de las tareas.
 *       - in: query
 *         name: sort
 *         required: true
 *         schema:
 *           type: string
 *         description: Opción para clasificar el orden de las tareas.
 *       - in: query
 *         name: order
 *         required: true
 *         schema:
 *           type: string
 *         description: Opción ordenar las tareas por ascendente o descendente.
 *     responses:
 *       200:
 *         description: Lista de tareas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskPreviewSchema'
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
 *                     -  'Forbidden'
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
router.get('/projects/:projectId/boards/:boardId/tasks-search', permissionMiddleware('can_view'), searchTasks)

export default router