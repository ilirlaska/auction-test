import { z } from 'zod'

export const UserRegisterZodSchema = z
  .object({
    _id: z.string().optional(),
    username: z.string().min(3).max(32),
    password: z.string().min(6).max(128),
    confirmPassword: z.string(),
    createdAt: z.date().optional(),
  })
  .refine(values => values.password === values.confirmPassword, {
    message: 'Passwords must match!',
    path: ['confirmPassword'],
  })

export type UserRegisterType = z.infer<typeof UserRegisterZodSchema>
