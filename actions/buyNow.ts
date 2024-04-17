'use server'
import { db } from '@/lib'
import { Item } from '@/models'

export const buyNow = async ({ id, username, price }: { id: string; username: string; price: string }) => {
  try {
    await db.connect()
    const updatedItem = await Item.findOneAndUpdate(
      { _id: id },
      { soldTo: { username, soldPrice: price } },
      { new: true }
    )
    return { success: true, updatedItem }
  } catch (error: any) {
    console.log(error)
    return { errors: error.message }
  }
}
