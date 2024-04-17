'use client'
import { navbarBlackList, navbarTabs } from '@/lib/settings'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useShowInfoNavbar } from '@/hooks'
import { Button } from '.'
import { SearchType } from '@/types'
import { signOut, useSession } from 'next-auth/react'

const theme = {
  true: {
    navbarClassnames: ['bg-transparent'],
    buttonClassnames: ['text-tertiary-tone'],
  },
  false: {
    navbarClassnames: ['bg-tertiary'],
    buttonClassnames: ['text-primary-tone'],
  },
}

const Navbar = () => {
  const pathName = usePathname()
  const { data: session } = useSession() || {}
  const { user } = session || {}
  const showInfo = useShowInfoNavbar()
  const { navbarClassnames: navTheme, buttonClassnames: btnTheme } =
    theme[String(showInfo) as keyof typeof theme]
  const buttonClassnames = [
    'transition-all',
    'duration-500',
    'relative',
    'py-2',
    'px-3',
    'rounded-md',
    'leading-none',
    'text-body',

    ...btnTheme,
  ]
  const navbarClassnames = [
    'w-full',
    'h-60',
    'z-100',
    'flex-center',
    'transition-all',
    'duration-500',
    ...navTheme,
  ]

  if (navbarBlackList.some(item => pathName.includes(item))) return null

  return (
    <div className='fixed w-full z-[100]'>
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
            animate={{ height: 60, opacity: 1, overflow: 'hidden' }}
            exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
          >
            <div className='h-60 w-full flex-space-between gap-8 bg-tertiary-shadow transition-all duration-500 px-56 text-primary-contrast-15 overflow-hidden'>
              <Link href={'/'}>
                <Image src='/images/logo.png' height={40} width={40} alt='logo' />
              </Link>{' '}
              {user?.name ? (
                <div className='flex-center gap-2 flex text-label text-secondary-contrast'>
                  Welcome {user?.name} <Button onClick={() => signOut()}>Log Out</Button>
                </div>
              ) : (
                <div className='flex-center gap-2 flex text-label'>
                  <Link href='/login'>
                    <Button>Log In</Button>
                  </Link>
                  <Link href='/register'>
                    <Button>Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={navbarClassnames.join(' ')}>
        <AnimatePresence>
          {!showInfo && (
            <motion.div
              className='flex-center'
              initial={{ opacity: 0, width: 0, height: 0, marginTop: 20, marginRight: 0 }}
              animate={{ opacity: 1, width: 40, height: 40, marginTop: 0, marginRight: 20 }}
              exit={{ opacity: 0, width: 0, height: 0, marginTop: 20, marginRight: 0 }}
            >
              <Link href={'/'}>
                <Image src='/images/logo.png' height={40} width={40} alt='logo' />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <div className='flex-center gap-2'>
          {navbarTabs.map(({ name, link }) => (
            <Link key={link} href={link}>
              <Button theme={link === pathName ? 'primary' : 'tertiary'}>{name}</Button>
              {/* <button
                className={`${buttonClassnames.join(' ')} 
                ${link === pathName ? 'bg-primary text-secondary-tone' : 'hover:bg-tertiary-shadow'}  `}
              >
                {name}
              </button> */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
