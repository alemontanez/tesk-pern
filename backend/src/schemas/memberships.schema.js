import { z } from 'zod'

export const memberSchema = z.object({
  memberId: z
    .string({ required_error: 'memberId is required' })
    .uuid({ message: 'Invalid memberId' }),
})