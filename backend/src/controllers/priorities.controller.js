import { fetchPriorities } from '../services/priorities.service.js'

export const getPriorities = async (req, res) => {
  try {
    const priorities = await fetchPriorities()
    res.status(200).json(priorities)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: ['Internal error'] })
  }
}