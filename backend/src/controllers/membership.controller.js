import {
  findAllMembersOfProject,
  searchUsersNotInProject,
  createMembership,
} from '../services/membership.service.js'

export const getProjectMembers = async (req, res) => {
  const { projectId } = req.params
  try {
    const members = await findAllMembersOfProject(projectId)
    res.status(200).json(members)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const findPotentialMembers = async (req, res) => {
  const { projectId } = req.params
  try {
    const users = await searchUsersNotInProject(projectId, req.query.search)
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const addMemberToProject = async (req, res) => {
  const { projectId } = req.params
  const { memberId } = req.body
  try {
    await createMembership(projectId, memberId)
    res.status(201).json('Membership created')
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