import { Router } from 'express'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyToken
} from '../controllers/auth.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Permite registrar un usuario.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterSchema'
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente. Se devuelve el token en una cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: User created successfully
 *       400:
 *         description: Error al validar los datos recibidos
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
 *                     - 'Username is required'
 *                     - 'Invalid email'
 *                     - 'First name can only contain letters'
 *                     - 'Password must be at least 6 characters'
 *       409:
 *         description: Usuario o email ya utilizados
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
 *                     - 'Username already exists'
 *                     - 'Email already exists'
 *       500:
 *         description: Error interno del servidor
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
router.post('/register', validateSchema(registerSchema), registerUser)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Permite iniciar sesión.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginSchema'
 *     responses:
 *       200:
 *         description: Sesión iniciada correctamente. El token se devuelve en una cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User ale logged successfully
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
 *                     - 'Email is required'
 *                     - 'Password is required'
 *       401:
 *         description: Credenciales inválidas.
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
 *                     -  'Invalid credentials'
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
router.post('/login', validateSchema(loginSchema), loginUser)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Permite cerrar sesión.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión cerrada.
 *         content:
 *           text/plain:
 *             schema:
 *               type: text
 *               example: OK
 */
router.post('/logout', logoutUser)

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verifica el token del usuario autenticado.
 *     description: Verifica si el token JWT presente en las cookies es válido y devuelve los datos del usuario.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token válido. Devuelve los datos del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSchema'
 *       401:
 *         description: Token inválido o expirado.
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
 *                     -  'Unauthorized'
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
router.get('/verify', verifyToken)

export default router