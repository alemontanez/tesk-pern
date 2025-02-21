import { getRoleDetails } from '../services/role.service.js'

export const getRole = async (req, res) => {
  const { id } = req.params
  try {
    const role = await getRoleDetails(id)
    res.status(200).json(role)
  } catch (error) {
    console.log(error)
    if (error.message === 'Role not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}