import { DefaultSession, getServerSession, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { isPasswordValid } from '@/utils'
import { db } from '@/lib'
import { User } from '@/models'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      authorize,
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as DefaultSession['user']
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
}

export async function getCurrentSession() {
  const session = await getServerSession(authOptions)

  return session
}

async function authorize(credentials: Record<'username' | 'password', string> | undefined) {
  const { username, password } = credentials || {}
  if (!username || !password) return null

  try {
    await db.connect()
    const user = await User.findOne({ username })

    if (!user) return null

    const isValidPassword = await isPasswordValid(password, user.password)

    return isValidPassword ? { id: user._id, name: user.username } : null
  } catch (error: any) {
    throw new Error(`Failed to authenticate user: ${error.message}`)
  }
}
