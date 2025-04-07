import { addMemberService, getMembersService, searchUsersService } from '../services/memberships.service.js'

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

export const searchUsers = async (req, res) => {
  const { projectId } = req.params
  try {
    const users = await searchUsersService(projectId, req.query.search)
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const addMember = async (req, res) => {
  const { projectId } = req.params
  const { memberId } = req.body
  try {
    await addMemberService(projectId, memberId)
    console.log(req.body)
    res.status(200).json('Membership created')
  } catch (error) {
    console.log(error)
    if (error.message === 'User not found') {
      return res.status(404).json({ error: [error.message] })
    }
    if (error.message === 'Member already exists') {
      return res.status(409).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}