import { z } from 'zod'

export const SearchZodSchema = z.object({
  name: z.string().max(32).optional(),
  category: z.string().optional(),
})

export type SearchType = z.infer<typeof SearchZodSchema>
