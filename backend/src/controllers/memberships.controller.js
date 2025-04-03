import { getMembersService } from '../services/memberships.service.js'

export const getMembers = async (req, res) => {
  const { projectId } = req.params
  try {
    const members = await getMembersService(projectId)
    res.status(200).json(members)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: ['Internal error'] })
  }
}