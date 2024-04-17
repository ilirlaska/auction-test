import { forwardRef } from 'react'
import { Error } from '.'

interface Props {
  label?: string | React.ReactNode
  error?: string
}

const Input = (
  { label, error, className, ...rest }: Props & React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) => {
  const classes = [
    'w-full',
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
      <input ref={ref} className={classes.join(' ')} {...rest} />
      {error && <Error>{error}</Error>}
    </div>
  )
}

export default forwardRef(Input)
