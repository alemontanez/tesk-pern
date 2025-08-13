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
    .string({ required_error: 'dueDate is required' })
    .date('Invalid date, format must be: YYYY-MM-DD'),
  priorityId: z
    .number({
      required_error: 'priorityId is required',
      invalid_type_error: 'priorityId must be a number'
    })
    .int()
    .positive(),
  statusId: z
    .number({
      required_error: 'statusId is required',
      invalid_type_error: 'statusId must be a number'
    })
    .int()
    .positive(),
})

export const updateTaskSchema = z.object({
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
  assignedTo: z
    .string({ required_error: 'User assigned is required' })
    .uuid({ message: 'Invalid assigned user id' }),
  dueDate: z
    .string({ required_error: 'dueDate is required' })
    .date('Invalid date, format must be: YYYY-MM-DD'),
  priorityId: z
    .number({ required_error: 'priorityId is required', invalid_type_error: 'Priority id must be a number' })
    .int()
    .positive(),
  statusId: z
    .number({
      required_error: 'statusId is required',
      invalid_type_error: 'statusId must be a number'
    })
    .int()
    .positive(),
})