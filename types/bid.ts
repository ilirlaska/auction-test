import { z } from 'zod'

export const BidZodSchema = z
  .object({
    bidder: z.string().max(32).optional(),
    bidPrice: z.string().optional(),
  })
  .optional()

export type BidType = z.infer<typeof BidZodSchema>
