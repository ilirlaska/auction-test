'use server'
import { db } from '@/lib'
import { Item } from '@/models'
import { ItemType } from '@/types'
import { deleteModel } from 'mongoose'

export const saveItem = async (item?: ItemType) => {
  try {
    await db.connect()
    const newItem = new Item(item)
    const savedItem = await newItem.save()
    return { success: true, savedItem }
  } catch (error: any) {
    return { errors: error.message }
  }
}
