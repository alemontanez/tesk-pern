import { z } from 'zod'

export const memberSchema = z.object({
  userId: z
    .string({ required_error: 'User id is required' })
    .uuid({ message: 'Invalid user id' }),
  projectId: z
    .number({
      required_error: 'Project id is required',
      invalid_type_error: 'Project id must be a number'
    })
    .int()
    .positive(),
  roleId: z
    .number({
      required_error: 'Role id is required',
      invalid_type_error: 'Role id must be a number'
    })
    .int()
    .positive(),
})

export const deleteMemberSchema = z.object({
  userId: z
    .string({ required_error: 'User id is required' })
    .uuid({ message: 'Invalid user id' }),
  projectId: z
    .number({
      required_error: 'Project id is required',
      invalid_type_error: 'Project id must be a number'
    })
    .int()
    .positive(),
})