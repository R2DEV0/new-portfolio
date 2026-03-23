'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
]

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#6366f1','#8b5cf6','#22d3ee','#10b981','#f59e0b','#ec4899'][Math.floor(Math.random() * 6)],
    size: Math.random() * 8 + 4,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1.5 + 1,
    rotation: Math.random() * 720 - 360,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: '-10px',
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 20 : 900,
            rotate: p.rotation,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}

export function KonamiEgg() {
  const [keys, setKeys] = useState<string[]>([])
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      setKeys(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length)
        if (next.join(',') === KONAMI.join(',')) {
          setActivated(true)
          setTimeout(() => setActivated(false), 4000)
        }
        return next
      })
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <AnimatePresence>
      {activated && (
        <>
          <Confetti />
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] px-8 py-5 rounded-2xl text-center pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.95), rgba(139,92,246,0.95))',
              boxShadow: '0 0 60px rgba(99,102,241,0.5), 0 20px 60px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="text-2xl mb-1">🎮</div>
            <div className="text-white font-bold text-lg">Konami Code Unlocked!</div>
            <div className="text-white/70 text-sm mt-1">You found the easter egg. You're hired. 😄</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
