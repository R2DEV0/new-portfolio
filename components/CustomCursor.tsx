'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const ringConfig = { damping: 20, stiffness: 150, mass: 0.8 }

  const dotX = useSpring(mouseX, springConfig)
  const dotY = useSpring(mouseY, springConfig)
  const ringX = useSpring(mouseX, ringConfig)
  const ringY = useSpring(mouseY, ringConfig)

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouchDevice(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)
    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

    const onHoverStart = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.matches('a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]')
        || target.closest('a, button, [role="button"]')
      ) setIsHovering(true)
    }

    const onHoverEnd = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.matches('a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]')
        || target.closest('a, button, [role="button"]')
      ) setIsHovering(false)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onHoverStart)
    document.addEventListener('mouseout', onHoverEnd)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onHoverStart)
      document.removeEventListener('mouseout', onHoverEnd)
    }
  }, [mouseX, mouseY, isVisible])

  if (isTouchDevice) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        <motion.div
          className="rounded-full border transition-all duration-150"
          animate={{
            width: isHovering ? 48 : isClicking ? 20 : 32,
            height: isHovering ? 48 : isClicking ? 20 : 32,
            borderColor: isHovering ? 'rgba(99,102,241,0.9)' : 'rgba(99,102,241,0.5)',
            borderWidth: isHovering ? 2 : 1,
            backgroundColor: isHovering ? 'rgba(99,102,241,0.08)' : 'rgba(0,0,0,0)',
            boxShadow: isHovering
              ? '0 0 12px rgba(99,102,241,0.4)'
              : '0 0 0px rgba(99,102,241,0)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHovering ? 6 : isClicking ? 3 : 5,
            height: isHovering ? 6 : isClicking ? 3 : 5,
            backgroundColor: isHovering ? '#818cf8' : '#6366f1',
            boxShadow: isHovering
              ? '0 0 8px rgba(99,102,241,0.8)'
              : '0 0 4px rgba(99,102,241,0.6)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      </motion.div>
    </>
  )
}
