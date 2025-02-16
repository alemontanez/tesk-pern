// Controlador que llama al servicio de autenticación y lo ejecuta.
// Controla respuestas http al cliente.
import { registerUser } from '../services/auth.service.js'
import { createAccessToken } from '../utils/jwt.js'

export const register = async (req, res) => {
  const { username, email, first_name, last_name, password } = req.body
  try {
    const user = await registerUser({ username, email, first_name, last_name, password })
    const token = await createAccessToken({ id: user.id })
    res.cookie('token', token)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        is_active: user.is_active,
      }
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Username already exists' || error.message === 'Email already exists') {
      return res.status(409).json({ message: error.message })
    }
    res.status(500).json({ message: 'Internal error' })
  }
}

export const login = async (req, res) => {

}