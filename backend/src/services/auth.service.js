import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config/config.js'
import { User } from '../models/index.js'

export const createUserAccount = async ({ username, email, firstName, lastName, password }) => {
  const passwordHash = await bcrypt.hash(password, 10)
  const existingUsername = await User.findOne({ where: { username: username } })
  if (existingUsername) throw new Error('Username already exists')

  const existingEmail = await User.findOne({ where: { email: email } })
  if (existingEmail) throw new Error('Email already exists')

  const user = await User.create({
    username,
    email,
    firstName,
    lastName,
    passwordHash
  })
  return user
}

export const authenticateUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ where: { email: email } })
  if (!existingUser) throw new Error('Invalid credentials')

  const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash)
  if (!isPasswordValid) throw new Error('Invalid credentials')

  return existingUser
}

export const validateAndDecodeToken = async (token) => {
  const user = jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) throw new Error('Unauthorized')

    const userFound = await User.findByPk(user.id)
    if (!userFound) throw new Error('Unauthorized')

    return userFound
  })

  return user
}