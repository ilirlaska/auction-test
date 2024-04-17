'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Children, PropsWithChildren, cloneElement, useCallback, useMemo } from 'react'
import { UseFormHandleSubmit, useForm } from 'react-hook-form'

type DefaultFormValues = Record<string, any>

interface Props<FormValues extends DefaultFormValues> {
  onSubmit: Parameters<UseFormHandleSubmit<FormValues>>[0]
  schema: Parameters<typeof zodResolver>[0]
  className?: string
}

const Form = <FormValues extends DefaultFormValues>({
  onSubmit,
  schema,
  className,
  children,
}: PropsWithChildren<Props<FormValues>>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const registerChildren = useCallback(
    (children: React.ReactNode): any => {
      return Children.map(children, child => {
        const element = (child as React.ReactElement) || {}
        const { type, name, disabled, children: childChildren } = element.props || {}

        if (!type && !name && typeof childChildren === 'string') {
          return element
        }
        if (type === 'submit') {
          return cloneElement(element, { disabled: disabled || isSubmitting })
        }
        if (name) {
          return cloneElement(element, {
            ...register(name),
            error: errors[name]?.message,
            children: registerChildren(childChildren),
          })
        }

        return registerChildren(childChildren)
      })
    },
    [errors, isSubmitting, register]
  )

  const registeredChildren = useMemo(() => registerChildren(children), [registerChildren, children])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {registeredChildren}
    </form>
  )
}

export default Form
