'use server'
import { Item } from '@/models'

export const getItem = async (id: string) => {
  try {
    const item = await Item.findById(id).lean()
    return item
  } catch (error) {
    console.log(error)
  }
}
