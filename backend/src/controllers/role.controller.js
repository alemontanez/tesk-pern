import { fetchRoles, getRoleDetails } from '../services/role.service.js'

export const getRoles = async (req, res) => {
  try {
    const roles = await fetchRoles()
    res.status(200).json(roles)
  } catch (error) {
    console.log(error)
    if (error === 'Roles not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const getRole = async (req, res) => {
  const { id } = req.params
  try {
    const role = await getRoleDetails(id)
    res.status(200).json(role)
  } catch (error) {
    console.log(error)
    if (error.message === 'Role not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}