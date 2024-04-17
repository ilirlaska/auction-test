'use client'
import React, { useRef, useEffect, useState } from 'react'

interface GridProps {
  children: React.ReactNode
  className?: string
}

const Grid: React.FC<GridProps> = ({ children, className }) => {
  const gridClassNames = [
    'grid',
    'grid-cols-none',
    'gap-4',
    'sm:grid-cols-1',
    'md:grid-cols-2',
    'lg:grid-cols-3',
    'xl:grid-cols-4',
    'h-full',
  ]
  className && gridClassNames.push(className)
  return <div className={gridClassNames.join(' ')}>{children}</div>
}

export default Grid
