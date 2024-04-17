'use server'
import { Item } from '@/models'

export const getItems = async (request?: { page?: number; limit?: number; filter?: object }) => {
  try {
    const { page = 1, limit = 10 } = request || {}
    const offset = (page - 1) * limit
    const [items, count] = await Promise.all([
      Item.find(request?.filter || {})
        .skip(offset)
        .limit(limit)
        .lean(),
      Item.countDocuments(),
    ])
    const pages = Math.ceil(count / limit)

    return { items, pages, page: page }
  } catch (error) {
    console.log(error)
  }
}
