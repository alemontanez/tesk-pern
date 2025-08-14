import { z } from 'zod'

export const updateProfileSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .trim()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(50, { message: 'Username must not exceed 50 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' }),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email' })
    .transform((value) => value.toLowerCase()),
  firstName: z
    .string({ required_error: 'firstName is required' })
    .trim()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name must not exceed 50 characters' })
    .regex(/^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/, { message: 'First name can only contain letters' }),
  lastName: z
    .string({ required_error: 'lastName is required' })
    .trim()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name must not exceed 50 characters' })
    .regex(/^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/, { message: 'Last name can only contain letters' })
})

export const changePasswordSchema = z.object({
  password: z
    .string({ required_error: 'Password is required' })
    .max(128, { message: 'Password must not exceed 128 characters' }),
  newPassword: z
    .string({ required_error: 'New password is required' })
    .min(6, { message: 'New password must be at least 6 characters' })
    .max(128, { message: 'New password must not exceed 128 characters' })
    .regex(/^\S+$/, { message: 'New password must not contain spaces' })
    .regex(/[A-Z]/, { message: 'New password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'New password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'New password must contain at least one number' })
})