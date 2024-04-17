'use client'
import { saveUser } from '@/actions/saveUser'
import { Button, Error, Form, Input, UnauthenticatedRoute } from '@/components'
import { UserRegisterType, UserRegisterZodSchema, UserType } from '@/types'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const Register = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [error, setError] = useState(searchParams.get('error'))

  const submitHandler = async (data: UserType) => {
    const { username, password } = data
    const { errors, success } = (await saveUser({ username, password })) || {}
    if (success) await signIn('credentials', { username, password, callbackUrl })
    if (errors) setError(error)
  }

  return (
    <UnauthenticatedRoute>
      <div className='w-full h-full flex items-center justify-center bg-tertiary-5'>
        <div className='w-[350px] flex flex-col items-center gap-4 shadow-card p-12 rounded-xl bg-tertiary'>
          <Image src='/images/logo.png' height={100} width={100} alt='logo' />
          <Form<UserRegisterType>
            className='w-full flex flex-col gap-4'
            onSubmit={submitHandler}
            schema={UserRegisterZodSchema}
          >
            <Input name='username' type='text' label='Username' placeholder='Username' />
            <Input name='password' type='password' label='Password' placeholder='Password' />
            <Input
              name='confirmPassword'
              type='password'
              label='Confirm Password'
              placeholder='Confirm Password'
            />
            <Button type='submit'>Register</Button>
            {error && <Error>{error}</Error>}
          </Form>
        </div>
      </div>
    </UnauthenticatedRoute>
  )
}

export default Register
