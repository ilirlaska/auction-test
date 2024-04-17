import React, { forwardRef } from 'react'
import Error from './Error'

interface Option {
  value: string
  label: string
}

interface Props {
  options: Option[]
  multiSelect?: boolean
  name?: string
  className?: string
  label?: string
  error?: string
}

const SelectDropdown = (
  {
    label,
    error,
    options,
    multiSelect,
    className,
    ...rest
  }: Props & React.SelectHTMLAttributes<HTMLSelectElement>,
  ref: React.Ref<HTMLSelectElement>
) => {
  const selectClassNames = [
    className || '', // Append additional className if provided
    'w-full',
    'rounded-2xl',
    'p-2',
    'border',
    'border-tertiary-tone-25',
    'focus:outline-none',
    'appearance-none',
  ]
  options = [{ value: '', label: 'Please select' }, ...options]

  return (
    <div className='flex flex-col gap-1'>
      {label && <label className='text-label'>{label}</label>}
      <select multiple={multiSelect} ref={ref} className={selectClassNames.join(' ')} {...rest}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <Error>{error}</Error>}
    </div>
  )
}

export default forwardRef(SelectDropdown)
