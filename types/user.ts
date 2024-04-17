import { z } from 'zod'

export const UserZodSchema = z.object({
  _id: z.string().optional(),
  username: z.string().min(3).max(32),
  password: z.string().min(6).max(128),
  createdAt: z.date().optional(),
})

export type UserType = z.infer<typeof UserZodSchema>
