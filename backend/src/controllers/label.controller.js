import { fetchLabels } from '../services/label.service.js'

export const getLabels = async (req, res) => {
  try {
    const labels = await fetchLabels()
    res.status(200).json(labels)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: ['Internal error'] })
  }
}