"use client"

import { useState, useEffect } from "react"

interface CountdownProps {
  endTime: Date
}

export function Countdown({ endTime }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime.getTime() - now

      if (distance < 0) {
        setTimeLeft("Ended")
        clearInterval(timer)
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h`)
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`)
        } else {
          setTimeLeft(`${minutes}m`)
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return <span>{timeLeft}</span>
}
