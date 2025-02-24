import { z } from 'zod'

export const getBoardsSchema = z.object({
  project_id: z
    .number({
      required_error: 'Project id is required',
      invalid_type_error: 'Project id must be a number'
    })
    .int()
    .positive()
})

export const createBoardSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must not exceed 50 characters' }),
  project_id: z
    .number({
      required_error: 'Project id is required',
      invalid_type_error: 'Project id must be a number'
    })
    .int()
    .positive()
})

export const updateBoardSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must not exceed 50 characters' })
})

export const updateBoardLabelSchema = z.object({
  label_id: z
    .number({
      required_error: 'Label id is required',
      invalid_type_error: 'Label id must be a number'
    })
    .int()
    .positive()
})