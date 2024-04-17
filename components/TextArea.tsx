import { forwardRef } from 'react'
import { Error } from '@/components'

interface Props {
  label?: string | React.ReactNode
  error?: string
}

const TextArea = (
  { label, error, className, ...rest }: Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  ref: React.Ref<HTMLTextAreaElement>
) => {
  const classes = [
    'w-full',
    'min-h-[100px]',
    'rounded-2xl',
    'p-2',
    'border',
    'border-tertiary-tone-25',
    'focus:outline-none',
  ] as string[]
  if (className) classes.push(className)

  return (
    <div className='flex flex-col gap-1'>
      {label && <label className='text-label'>{label}</label>}
      <textarea ref={ref} className={classes.join(' ')} {...rest} />
      {error && <Error>{error}</Error>}
    </div>
  )
}

export default forwardRef(TextArea)
