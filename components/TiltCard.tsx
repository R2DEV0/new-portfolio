'use client'

import { useRef, useCallback } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  strength?: number
}

export function TiltCard({ children, className = '', style = {}, strength = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    const glow = glowRef.current
    if (!el || !glow) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateX = (y - 0.5) * -strength
    const rotateY = (x - 0.5) * strength

    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`
    el.style.transition = 'transform 0.08s ease'

    glow.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.07) 0%, transparent 65%)`
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    const glow = glowRef.current
    if (!el || !glow) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    el.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)'
    glow.style.background = 'transparent'
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-100"
        style={{ background: 'transparent' }}
      />
      {children}
    </div>
  )
}
