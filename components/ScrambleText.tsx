'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

interface ScrambleTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  speed?: number
}

export function ScrambleText({ text, className, style, delay = 0, speed = 35 }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const timeoutId = setTimeout(() => {
      let iteration = 0
      const totalFrames = text.length * 3

      const interval = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < Math.floor(iteration / 3)) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        iteration++
        if (iteration > totalFrames) {
          clearInterval(interval)
          setDisplay(text)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [inView, text, delay, speed])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}
