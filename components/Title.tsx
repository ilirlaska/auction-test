import { PropsWithChildren } from 'react'

const Title = ({ children }: PropsWithChildren) => {
  return (
    <div className='w-full bg-primary text-primary-contrast text-title-xl px-12 py-2'>
      <div className='relative before:content-[""] before:absolute before:-bottom-6 before:border-8 before:border-transparent before:border-t-primary'>
        {children}
      </div>
    </div>
  )
}

export default Title
