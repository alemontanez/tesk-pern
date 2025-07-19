import {
  findUserProfileById,
  editUserProfile,
  changeUserPassword
} from '../services/user.service.js'

export const getUserProfile = async (req, res) => {
  const { id } = req.user
  try {
    const user = await findUserProfileById(id)
    res.json(user)
  } catch (error) {
    console.log(error)
    if (error.message === 'User not found') {
      return res.status(404).json({ error: [error.message] })
    }
    res.status(500).json({ error: ['Internal error'] })
  }
}

export const updateUserProfile = async (req, res) => {
  const { id } = req.user
  try {
    await editUserProfile(id, req.body)
    res.status(200).json({ message: 'User profile updated successfully' })
  } catch (error) {
    console.log(error)
    if (error.message === 'User not found') {
      return res.status(404).json({ error: [error.message] })
    }
    if (error.message === 'Email already exists' || error.message === 'Username already exists') {
      return res.status(409).json({ error: [error.message] })
    }
    res.status(500).json({ error: ['Internal error'] })
  }
}

export const updateUserPassword = async (req, res) => {
  const { id } = req.user
  const { password, newPassword } = req.body
  try {
    await changeUserPassword(id, password, newPassword)
    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ error: [error.message] })
    }
    if (error.message === 'Invalid current password' || error.message === 'New password cannot be the same as the previous one') {
      return res.status(409).json({ error: [error.message] })
    }
    res.status(500).json({ error: ['Internal error'] })
  }
}