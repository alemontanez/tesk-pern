import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const userProfile = async (id) => {
  const user = await User.findByPk(id)
  if (!user) throw new Error('User not found')

  return user
}

export const updateProfile = async (id, data) => {
  const { username, email, first_name, last_name } = data
  const user = await User.findByPk(id)
  if (!user) throw new Error('User not found')

  const existingUsername = await User.findOne({ where: { username: username } })
  if (existingUsername && username !== user.username) throw new Error('Username already exists')

  const existingEmail = await User.findOne({ where: { email: email } })
  if (existingEmail && email !== user.email) throw new Error('Email already exists')

  await user.update({
    username,
    email,
    first_name,
    last_name
  })
  return user
}

export const passwordService = async (id, currentPassword, newPassword) => {
  const user = await User.findByPk(id)
  if (!user) throw new Error('User not found')

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash)
  if (!isPasswordValid) throw new Error('Invalid current password')

  const isCurrentPassword = await bcrypt.compare(newPassword, user.password_hash)
  if (isCurrentPassword) throw new Error('New password cannot be the same as the previous one')

  const newPassword_hash = await bcrypt.hash(newPassword, 10)

  await user.update({
    password_hash: newPassword_hash
  })
}