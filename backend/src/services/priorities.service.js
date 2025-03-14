import Priority from '../models/priority.model.js'

export const fetchPriorities = async (prioId) => {
  const priorities = await Priority.findAll()
  if (!priorities) throw new Error('Priorities not found')
  return priorities
}