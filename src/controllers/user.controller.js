import { passwordService, updateProfile, userProfile } from '../services/user.service.js'

export const getUser = async (req, res) => {
  const { id } = req.user
  try {
    const user = await userProfile(id)
    res.json(user)
  } catch (error) {
    console.log(error)
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message })
    }
    res.status(500).json({ message: 'Internal error' })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.user
  try {
    const user = await updateProfile(id, req.body)
    res.status(200).json({
      message: 'User updated successfully',
      user
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message })
    }
    if (error.message === 'Email already exists' || error.message === 'Username already exists') {
      return res.status(409).json({ message: error.message })
    }
    res.status(500).json({ message: 'Internal error' })
  }
}

export const changePassword = async (req, res) => {
  const { id } = req.user
  const { password, newPassword } = req.body
  try {
    await passwordService(id, password, newPassword)
    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message })
    }
    if (error.message === 'Invalid current password' || error.message === 'New password cannot be the same as the previous one') {
      return res.status(409).json({ message: error.message })
    }
    res.status(500).json({ message: 'Internal error' })
  }
}