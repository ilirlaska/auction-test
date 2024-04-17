'use client'

import React, { useState, useEffect } from 'react'

interface CountdownProps {
  targetDate: string
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft as { days: number; hours: number; minutes: number; seconds: number }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : value
  }

  return (
    <div className='flex justify-center items-center'>
      {timeLeft.days > 0 && (
        <span className='mr-2'>
          <span className='text-lg font-bold'>{formatTime(timeLeft.days)}</span>{' '}
          {timeLeft.days === 1 ? 'day' : 'days'}{' '}
        </span>
      )}
      <span className='text-lg font-bold'>{formatTime(timeLeft.hours)}:</span>
      <span className='text-lg font-bold'>{formatTime(timeLeft.minutes)}:</span>
      <span className='text-lg font-bold'>{formatTime(timeLeft.seconds)}</span>
    </div>
  )
}

export default Countdown
