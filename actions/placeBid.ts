'use server'
import { db } from '@/lib'
import { Item } from '@/models'
import { BidType } from '@/types'

export const placeBid = async ({ id, bid }: { id: string; bid: BidType }) => {
  try {
    await db.connect()
    const updatedItem = await Item.findOneAndUpdate(
      { _id: id },
      { $push: { bids: { $each: [bid], $position: 0 } } },
      { new: true }
    )
    return { success: true, updatedItem }
  } catch (error: any) {
    console.log(error)
    return { errors: error.message }
  }
}
