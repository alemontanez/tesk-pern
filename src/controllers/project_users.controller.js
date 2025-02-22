// (getMembershipInfo, createMembership, updateMembership, deleteMembership)
import { createMember, updateMember, deleteMember } from '../services/project_users.service.js'

export const createMembership = async (req, res) => {
  const { user_id, project_id, role_id } = req.body
  try {
    const member = await createMember(user_id, project_id, role_id)
    res.status(201).json({
      message: 'Membership created successfully',
      member
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'User not found' || error.message === 'Project not found' || error.message === 'Role not found') {
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
  const { user_id, project_id, role_id } = req.body
  try {
    await updateMember(user_id, project_id, role_id)
    res.status(200).json({ message: 'Member role updated successfully' })
  } catch (error) {
    console.log(error)
    if (error.message === 'Membership not found' || error.message === 'Role not found' || error.message === 'User not found' || error.message === 'Project not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const deleteMembership = async (req, res) => {
  const { user_id, project_id } = req.body
  try {
    await deleteMember(user_id, project_id)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    if (error.message === 'Membership not found' || error.message === 'User not found' || error.message === 'Project not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}