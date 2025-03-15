import { loginUser, registerUser, verifyTokenService } from '../services/auth.service.js'
import { createAccessToken } from '../utils/jwt.js'

export const register = async (req, res) => {
  const { username, email, first_name, last_name, password } = req.body
  try {
    const user = await registerUser({ username, email, first_name, last_name, password })
    const token = await createAccessToken({ id: user.id })
    res.cookie('token', token)
    res.status(201).json({
      message: 'User created successfully',
      user
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Username already exists' || error.message === 'Email already exists') {
      return res.status(409).json({ error: [error.message] })
    }
    res.status(500).json({ error: ['Internal error'] })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await loginUser({ email, password })
    const token = await createAccessToken({ id: user.id })
    res.cookie('token', token)
    res.status(200).json({ message: `User ${user.username} logged successfully` })
  } catch (error) {
    console.log(error)
    if (error.message === 'Invalid credentials') {
      return res.status(400).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const logout = (req, res) => {
  res.clearCookie('token')
  return res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.send(false)

  try {
    const user = await verifyTokenService(token)
    return res.json(user)
  } catch (error) {
    console.log(error)
    if (error.message === 'Unauthorized') {
      return res.status(401).json({ error: [error.message] })
    }
    return res.stats(500).json({ error: ['Internal error'] })
  }
}

