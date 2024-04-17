'use server'
import { db } from '@/lib'
import { User } from '@/models'
import { UserType } from '@/types'
import { hashPassword } from '@/utils'

export const saveUser = async (request?: UserType) => {
  try {
    await db.connect()
    let { username, password = '' } = request || {}
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return { errors: 'User already exists' }
    }

    const hashedPassword = await hashPassword(password)
    const user = new User({ username, password: hashedPassword })
    await user.save()

    return { success: true }
  } catch (error: any) {
    console.log(error)
    return { error: error.message }
  }
}
