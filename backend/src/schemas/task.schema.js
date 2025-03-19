import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(100, { message: 'Title must not exceed 100 characters' }),
  description: z
    .string({ required_error: 'Description is required' })
    .trim()
    .min(2, { message: 'Description must be at least 2 characters' })
    .max(500, { message: 'Description must not exceed 500 characters' }),
  dueDate: z
    .string({ required_error: 'Due date is required' })
    .date(), // formato YYYY-MM-DD
  priorityId: z
    .number({
      required_error: 'Priority id is required',
      invalid_type_error: 'Priority id must be a number'
    })
    .int()
    .positive(),
})

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(100, { message: 'Title must not exceed 100 characters' }),
  description: z
    .string()
    .trim()
    .min(2, { message: 'Description must be at least 2 characters' })
    .max(500, { message: 'Description must not exceed 500 characters' }),
  assignedTo: z
    .string()
    .uuid({ message: 'Invalid assigned user id' }),
  dueDate: z
    .string()
    .date(), // formato YYYY-MM-DD
  priorityId: z
    .number({ invalid_type_error: 'Priority id must be a number' })
    .int()
    .positive(),
  labelId: z
    .number({ invalid_type_error: 'Label id must be a number' })
    .int()
    .positive(),
})