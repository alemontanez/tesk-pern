import { z } from 'zod'

export const memberSchema = z.object({
  user_id: z
    .string({ required_error: 'User id is required' })
    .uuid({ message: 'Invalid user id' }),
  project_id: z
    .number({
      required_error: 'Project id is required',
      invalid_type_error: "Project id must be a number"
    })
    .int()
    .positive(),
  role_id: z
    .number({
      required_error: 'Role id is required',
      invalid_type_error: "Role id must be a number"
    })
    .int()
    .positive(),
})