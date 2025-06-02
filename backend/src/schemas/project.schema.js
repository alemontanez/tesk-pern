import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must not exceed 50 characters' }),
  description: z
    .string({ required_error: 'Description is required' })
    .trim()
    .max(255, { message: 'Description must not exceed 255 characters' })
})

export const updateProjectSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must not exceed 50 characters' }),
  description: z
    .string({ required_error: 'Description is required' })
    .trim()
    .max(255, { message: 'Description must not exceed 255 characters' })
})
// Sacar los required de updateproject y verificar funcionamiento