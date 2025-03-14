import Label from '../models/label.model.js'

export const fetchLabels = async () => {
  const labels = await Label.findAll()
  return labels
}