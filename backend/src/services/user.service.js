import { User } from '../models/index.js'
import bcrypt from 'bcryptjs'

export const findUserProfileById = async (id) => {
  const user = await User.findByPk(id)
  if (!user) throw new Error('User not found')
  return user
}

export const editUserProfile = async (id, data) => {
  const { username, email, firstName, lastName } = data
  const user = await User.findByPk(id)
  if (!user) throw new Error('User not found')
  const existingUsername = await User.findOne({ where: { username: username } })
  if (existingUsername && username !== user.username) throw new Error('Username already exists')
  const existingEmail = await User.findOne({ where: { email: email } })
  if (existingEmail && email !== user.email) throw new Error('Email already exists')
  await user.update({
    username,
    email,
    firstName,
    lastName
  })
  return user
}

export const changeUserPassword = async (id, currentPassword, newPassword) => {
  const user = await User.findByPk(id)
  if (!user) throw new Error('User not found')
  const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!isPasswordValid) throw new Error('Invalid current password')
  const isCurrentPassword = await bcrypt.compare(newPassword, user.passwordHash)
  if (isCurrentPassword) throw new Error('New password cannot be the same as the previous one')
  const newPasswordHash = await bcrypt.hash(newPassword, 10)
  await user.update({
    passwordHash: newPasswordHash
  })
}