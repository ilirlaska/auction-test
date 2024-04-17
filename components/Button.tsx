import { ButtonHTMLAttributes, forwardRef } from 'react'

const themes = {
  primary: [
    'bg-primary',
    'hover:bg-tertiary hover:text-primary hover:border hover:border-primary',
    'text-primary-contrast',
  ],
  secondary: ['bg-secondary', 'hover:bg-secondary-tone-450', 'text-secondary-contrast'],
  tertiary: ['bg-tertiary', 'hover:bg-tertiary-tone-450', 'text-tertiary-contrast'],
} as const

type Theme = keyof typeof themes

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Theme
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, theme = 'primary', className, ...props }, ref) => {
    const buttonClasses = [
      'px-6',
      'py-2',
      'border',
      'rounded-2xl',
      'transition-colors',
      'focus:outline-none',
      'select-none',
      'disabled:opacity-25',
      ...themes[theme],
    ]
    if (className) buttonClasses.push(className)

    return (
      <button ref={ref} className={buttonClasses.join(' ')} {...props}>
        {children}
      </button>
    )
  }
)

export default Button
