'use client'
import { Button, Error, Form, Input, UnauthenticatedRoute } from '@/components'
import { UserType, UserZodSchema } from '@/types/user'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const Login = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const error = searchParams.get('error')

  const onSubmit = (data: UserType) => signIn('credentials', { ...data, callbackUrl })

  return (
    <UnauthenticatedRoute>
      <div className='w-full h-full flex items-center justify-center bg-tertiary-5'>
        <div className='w-[350px] flex flex-col items-center gap-4 shadow-card p-12 rounded-xl bg-tertiary'>
          <Image src='/images/logo.png' height={100} width={100} alt='logo' />
          <Form<UserType> className='w-full flex flex-col gap-4' onSubmit={onSubmit} schema={UserZodSchema}>
            <Input name='username' type='text' label='Username' placeholder='Username' />
            <Input name='password' type='password' label='Password' placeholder='Password' />
            <Button type='submit'>Login</Button>
            {error && <Error>Authentication failed</Error>}
          </Form>
          <Link href='/register'>
            <Button theme='tertiary'> Register</Button>
          </Link>
        </div>
      </div>
    </UnauthenticatedRoute>
  )
}

export default Login
