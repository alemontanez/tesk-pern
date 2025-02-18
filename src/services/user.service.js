import User from '../models/user.model.js'

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