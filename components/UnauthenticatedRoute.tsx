import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const UnauthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession()
  if (session && session.user) redirect('/')

  return children
}

export default UnauthenticatedRoute
