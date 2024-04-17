import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PropsWithChildren } from 'react'

interface Props {
  isLoading: boolean
}

const Loader = ({ isLoading, children }: PropsWithChildren<Props>) =>
  isLoading ? (
    <div className='w-full h-full flex items-center justify-center'>
      <FontAwesomeIcon className='text-[80px] text-primary' icon={faCircleNotch} spin />
    </div>
  ) : (
    children
  )

export default Loader
