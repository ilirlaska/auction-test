'use client'
import React, { useState } from 'react'
import Button from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: React.ReactNode
  className?: string
  onSubmit?: () => void
  hideFooter?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  title,
  onSubmit,
  hideFooter,
}) => {
  const modalClassNames = [
    'bg-white',
    'rounded-lg',
    'shadow-lg',
    'p-4',
    'max-w-sm',
    'md:max-w-lg',
    'w-full',
    'z-50',
  ]
  if (className) modalClassNames.push(className)

  // Close modal when ESC key is pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  // Close modal when clicking outside the modal content
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50'
          style={{ zIndex: 999 }}
          onClick={handleBackdropClick}
        >
          <div className={modalClassNames.join(' ')} onKeyDown={handleKeyDown} tabIndex={0}>
            {title && <div className='text-title font-bold mb-4'>{title}</div>}
            {children}
            {!hideFooter && (
              <div className='flex justify-end gap-3'>
                {onClose && (
                  <Button theme='tertiary' onClick={onClose}>
                    Cancel
                  </Button>
                )}
                {onSubmit && (
                  <Button theme='primary' onClick={onSubmit}>
                    Save
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
