import { db } from '@/lib'
import { User } from '@/models'
import { UserType, UserZodSchema } from '@/types'
import { hashPassword } from '@/utils'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: Request) {
  try {
    // Validate the request body
    const userData = await validateUserRequest(request)
    // Check if user already exists
    await db.connect()
    await checkUserExists(userData.username)
    // Create new user
    const user = await saveNewUser(userData)

    return NextResponse.json(user)
  } catch (error: any) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 422 })

    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

const validateUserRequest = async (request: Request) => {
  const body = await request.json()
  const result = UserZodSchema.parse(body)

  return result
}

const checkUserExists = async (username: string) => {
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    throw new Error('User already exists')
  }
}

const saveNewUser = async (userData: UserType) => {
  const user = new User(userData)
  user.password = await hashPassword(user.password)
  await user.save()

  return user
}
