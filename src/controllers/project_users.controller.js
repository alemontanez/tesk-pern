import { createMember, updateMember, deleteMember } from '../services/project_users.service.js'

export const createMembership = async (req, res) => {
  const { userId, projectId, roleId } = req.body
  const requesterId = req.user.id
  try {
    const member = await createMember(requesterId, userId, projectId, roleId)
    res.status(201).json({
      message: 'Membership created successfully',
      member
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Requester does not have permissions') {
      return res.status(401).json({ message: error.message })
    }
    if (error.message === 'User not found' || error.message === 'Role not found') {
      return res.status(404).json({ message: error.message })
    }
    if (error.message === 'The user already belongs to this project') {
      return res.status(409).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const getMembershipInfo = async (req, res) => {

}

export const updateMembership = async (req, res) => {
  const requesterId = req.user.id
  const { userId, projectId, roleId } = req.body
  try {
    await updateMember(requesterId, userId, projectId, roleId)
    res.status(200).json({
      message: 'Member role updated successfully',
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Requester does not have permissions') {
      return res.status(401).json({ message: error.message })
    }
    if (error.message === 'Member not found' || error.message === 'Role not found' || error.message === 'User not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const deleteMembership = async (req, res) => {
  const requesterId = req.user.id
  const { userId, projectId } = req.body
  try {
    await deleteMember(requesterId, userId, projectId)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    if (error.message === 'Requester does not have permissions') {
      return res.status(401).json({ message: error.message })
    }
    if (error.message === 'User not found' || error.message === 'Member not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}