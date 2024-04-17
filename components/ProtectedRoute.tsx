'use client'
import { useSession } from 'next-auth/react'
import { redirect, usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { Loader } from '.'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/login?callbackUrl=${pathname}`)
    },
  })

  return <Loader isLoading={status === 'loading'}>{children}</Loader>
}

export default ProtectedRoute
