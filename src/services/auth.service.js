import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const registerUser = async ({ username, email, first_name, last_name, password }) => {
  const password_hash = await bcrypt.hash(password, 10)
  const existingUsername = await User.findOne({ where: { username: username } })
  if (existingUsername) throw new Error('Username already exists')

  const existingEmail = await User.findOne({ where: { email: email } })
  if (existingEmail) throw new Error('Email already exists')
    
  const user = await User.create({
    username,
    email,
    first_name,
    last_name,
    password_hash
  })
  return user
}

export const loginUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ where: { email: email } })
  if (!existingUser) throw new Error('Invalid credentials')

  const isPasswordValid = await bcrypt.compare(password, existingUser.password_hash)
  if (!isPasswordValid) throw new Error('Invalid credentials')

  return existingUser
}