import { z } from 'zod'
import { BidZodSchema } from './bid'

export const ItemZodSchema = z
  .object({
    name: z.string().max(32).optional(),
    category: z.string().min(3),
    description: z.string().max(300).min(3),
    images: z.string().refine((value: string) => {
      // Regular expression to match image URLs
      const regex = /\bhttps?:\/\/\S+?\.(?:jpg|jpeg|png|gif|bmp|svg)\b/
      // Split the string by commas
      const links = value.split(',')
      // Check each link
      for (const link of links) {
        // Trim any leading or trailing whitespace
        const trimmedLink = link.trim()
        // Check if the link matches the regex pattern
        if (!regex.test(trimmedLink)) {
          return false
        }
      }
      return true
    }, 'Value must contain only valid image links separated by commas'),
    soldTo: z
      .object({
        username: z.string().optional(),
        soldPrice: z.string().optional(),
      })
      .optional(),
    soldBy: z.string().optional(),
    bids: z.array(z.object).optional(),
    createdAt: z.string().refine(value => value !== '', {
      message: 'Date must be provided',
    }),
    expiresAt: z.string().refine(value => value !== '', {
      message: 'Date must be provided',
    }),
    priceSteps: z.string().min(1),
    startingPrice: z.string().min(1),
    price: z.string().min(1),
  })
  .refine(
    ({ createdAt, expiresAt }) =>
      new Date(createdAt) === new Date(expiresAt) || new Date(createdAt) < new Date(expiresAt),
    {
      message: 'Expires date must be after created date',
      path: ['expiresAt'],
    }
  )
  .refine(({ createdAt }) => !(new Date(createdAt) < new Date()), {
    message: 'Start date should be in the future',
    path: ['createdAt'],
  })
  .refine(
    ({ startingPrice, price }) =>
      parseInt(price) >= parseInt(startingPrice) || parseInt(price) == parseInt(startingPrice),
    {
      message: 'Starting price must be less than buy now price',
      path: ['startingPrice'],
    }
  )

export type ItemType = z.infer<typeof ItemZodSchema>
