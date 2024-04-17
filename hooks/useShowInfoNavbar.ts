'use client'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const useShowInfoNavbar = () => {
  const pathName = usePathname()
  const [showInfo, setShowInfo] = useState<boolean>(window?.scrollY < 120)
  const calculateShowInfo = useCallback(() => {
    setShowInfo(window.scrollY < 120)
  }, [pathName])
  useEffect(() => {
    window.addEventListener('scroll', calculateShowInfo)
    return () => {
      window.removeEventListener('scroll', calculateShowInfo)
    }
  }, [pathName])
  useEffect(() => {
    calculateShowInfo()
  }, [pathName])
  return showInfo
}
