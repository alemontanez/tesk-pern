import { Router } from 'express'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import {
  changePasswordSchema,
  updateProfileSchema
} from '../schemas/user.schema.js'
import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword
} from '../controllers/user.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints para la información del usuario logueado (utiliza el userId guardado en el payload del token de sesión JWT)
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Obtiene el perfil del usuario.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Perfil del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSchema'
 *       404:
 *         description: Usuario no encontrado.
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
  getUserProfile

)

/**
 * @swagger
 * /profile:
 *   patch:
 *     summary: Permite al usuario actualizar su perfil.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileSchema'
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: User profile updated successfully
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
 *                     - 'Username must be at least 3 characters'
 *                     - 'First name can only contain letters'
 *                     - 'Invalid email'
 *       404:
 *         description: Usuario no encontrado.
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
 *                     - 'User not found'
 *       409:
 *         description: Conflicto con validación de email/username.
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
 *                     - 'Email already exists'
 *                     - 'Username already exists'
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
  '/',
  validateSchema(updateProfileSchema),
  updateUserProfile
)

/**
 * @swagger
 * /profile/change-password:
 *   patch:
 *     summary: Permite al usuario cambiar su contraseña.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordSchema'
 *     responses:
 *       200:
 *         description: Contraseña cambiada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: Password changed successfully
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
 *                     - 'Password is required'
 *                     - 'New password must be at least 6 characters'
 *                     - 'New password must contain at least one uppercase letter'
 *                     - 'New password must contain at least one number'
 *       404:
 *         description: Usuario no encontrado.
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
 *                     - 'User not found'
 *       409:
 *         description: Conflicto con validación de las contraseñas.
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
 *                     - 'Invalid current password'
 *                     - 'New password cannot be the same as the previous one'
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
  '/change-password',
  validateSchema(changePasswordSchema),
  updateUserPassword
)

// estos endpoints no se usan todavía, pero son útiles para futuro

export default router