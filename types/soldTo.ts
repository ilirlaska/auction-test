import { z } from 'zod'

export const SoldZodSchema = z.object({
  username: z.string().max(32).optional(),
  bidPrice: z.string().optional(),
})

export type SoldType = z.infer<typeof SoldZodSchema>
