import { z } from 'zod'

export const commentSchema = z.object({
  content: z
    .string({ required_error: 'Content is required' })
    .trim()
    .min(2, { message: 'Content must be at least 2 characters' })
    .max(500, { message: 'Content must not exceed 500 characters' }),
})