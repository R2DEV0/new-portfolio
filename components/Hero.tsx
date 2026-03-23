'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, FileText, Instagram, Facebook, ArrowDown, Zap } from 'lucide-react'
import { MagneticWrapper } from './MagneticWrapper'

const ROLES = [
  'Senior Full-Stack Developer',
  'AI-Powered Dev Expert',
  'MERN Stack Architect',
  'AWS Certified Developer',
  'UI/UX Craftsman',
]

function useTypewriter(words: string[], speed = 75, deleteSpeed = 40, pause = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const word = words[wordIndex % words.length]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = word.slice(0, displayed.length + 1)
        setDisplayed(next)
        if (next === word) {
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setIsDeleting(true)
          }, pause)
        }
      } else {
        const next = word.slice(0, displayed.length - 1)
        setDisplayed(next)
        if (next === '') {
          setIsDeleting(false)
          setWordIndex(i => i + 1)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, words, speed, deleteSpeed, pause, isPaused])

  return displayed
}

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; opacity: number; hue: number
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setSize()

    const init = () => {
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 14000))
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.5 + 0.15,
        hue: Math.random() > 0.5 ? 243 : 270, // indigo vs violet
      }))
    }
    init()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const pts = particlesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      pts.forEach(p => {
        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          p.vx += (dx / dist) * force * 0.3
          p.vy += (dy / dist) * force * 0.3
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`
        ctx.fill()
      })

      // Connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 130) * 0.12})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)

    const ro = new ResizeObserver(() => { setSize(); init() })
    ro.observe(canvas)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto opacity-60" />
}

const socialLinks = [
  { href: 'https://www.linkedin.com/in/kevin-chancey', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.github.com/R2DEV0', icon: Github, label: 'GitHub' },
  { href: 'https://www.instagram.com/kevchancey/', icon: Instagram, label: 'Instagram' },
  { href: 'https://www.facebook.com/kevinr.chancey', icon: Facebook, label: 'Facebook' },
  { href: 'https://kevtech.net/KevinChanceyResume1.pdf', icon: FileText, label: 'Resume' },
]

const floatingCode = [
  { code: 'const kevin = { role: "dev" }', delay: 0.5, x: '5%', y: '20%' },
  { code: 'AWS.certified()', delay: 1.2, x: '78%', y: '15%' },
  { code: '<MERN stack />', delay: 0.8, x: '82%', y: '65%' },
  { code: 'AI.integrate()', delay: 1.5, x: '3%', y: '70%' },
]

export function Hero() {
  const role = useTypewriter(ROLES)
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('r2devo@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="ambient-blob animate-blob-1"
          style={{
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
            top: '-10%', left: '-10%',
          }}
        />
        <div
          className="ambient-blob animate-blob-2"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            top: '30%', right: '-5%',
          }}
        />
        <div
          className="ambient-blob animate-blob-3"
          style={{
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
            bottom: '5%', left: '30%',
          }}
        />
      </div>

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating code snippets – desktop only */}
      <div className="hidden lg:block">
        {floatingCode.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-xs font-mono px-3 py-1.5 rounded-lg pointer-events-none"
            style={{
              left: item.x, top: item.y,
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: 'rgba(129,140,248,0.7)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: item.delay, duration: 0.6 },
              y: { delay: item.delay, duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {item.code}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24 pb-16">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-sm font-medium"
          style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            color: '#10b981',
          }}
        >
          <span className="status-dot" />
          Available for new opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 leading-none tracking-tight"
        >
          <span className="gradient-text">Kevin</span>
          <br />
          <span className="text-[var(--text-primary)]">Chancey</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="text-xl sm:text-2xl font-light" style={{ color: 'var(--text-secondary)' }}>
            {role}
          </span>
          <span className="typewriter-cursor ml-1" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Crafting high-performance digital experiences with MERN, AI tools, and cloud-native architecture.
          Turning complex problems into elegant, scalable solutions.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <a
            href="/#projects"
            className="group relative px-7 py-3 rounded-full font-semibold text-white overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 0 20px rgba(99,102,241,0.4)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              View My Work
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </a>

          <a
            href="/#about"
            className="px-7 py-3 rounded-full font-semibold transition-all duration-300"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              backdropFilter: 'blur(12px)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(99,102,241,0.2)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            Learn More
          </a>

          <button
            onClick={copyEmail}
            className="px-7 py-3 rounded-full font-semibold transition-all duration-300"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: copied ? '#10b981' : 'var(--text-secondary)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {copied ? '✓ Copied!' : 'Copy Email'}
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="flex justify-center gap-3 flex-wrap mb-16"
        >
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <MagneticWrapper key={label} strength={0.4}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-xl transition-all duration-200 block"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(99,102,241,0.5)'
                  el.style.color = '#818cf8'
                  el.style.boxShadow = '0 0 12px rgba(99,102,241,0.25)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--border)'
                  el.style.color = 'var(--text-secondary)'
                  el.style.boxShadow = 'none'
                }}
              >
                <Icon className="w-5 h-5" />
              </a>
            </MagneticWrapper>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4" style={{ color: 'var(--indigo)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
