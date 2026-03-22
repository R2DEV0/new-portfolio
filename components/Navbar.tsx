'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { name: 'About', href: '#about', number: '01' },
  { name: 'Skills', href: '#skills', number: '02' },
  { name: 'Education', href: '#education', number: '03' },
  { name: 'Projects', href: '#projects', number: '04' },
  { name: 'Blog', href: '#blog', number: '05' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 60)

      const sections = navItems.map(item => item.href.substring(1))
      const current = sections.find(section => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(current || '')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${hasScrolled ? 'py-3' : 'py-5'}`}
      >
        <div className={`mx-auto px-6 transition-all duration-500 ${hasScrolled ? 'max-w-4xl' : 'max-w-7xl'}`}>
          <div
            className="flex justify-between items-center transition-all duration-500"
            style={hasScrolled ? {
              background: 'rgba(9,9,33,0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '100px',
              padding: '10px 20px',
              boxShadow: '0 4px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(99,102,241,0.12)',
            } : {}}
          >
            {/* Logo */}
            <a href="#" className="group relative flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    boxShadow: '0 0 16px rgba(99,102,241,0.4)',
                  }}
                >
                  <span className="text-white font-bold text-lg font-serif">K</span>
                </div>
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-sm"
                  style={{ background: '#22d3ee' }}
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold tracking-wide" style={{ color: 'var(--text-primary)' }}>
                  KEVIN CHANCEY
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--indigo)' }}>
                  Full-Stack Dev
                </div>
              </div>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg"
                    style={{
                      color: isActive ? '#818cf8' : 'var(--text-secondary)',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                    }}
                  >
                    {item.name}
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0 left-4 right-4 h-px"
                        style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                )
              })}

              <div className="ml-3 pl-3" style={{ borderLeft: '1px solid var(--border)' }}>
                <ThemeToggle mobile={false} />
              </div>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle mobile={true} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
                style={{
                  background: isOpen ? 'rgba(99,102,241,0.15)' : 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-3.5 flex flex-col justify-between">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-0.5 origin-left"
                    style={{ background: isOpen ? '#818cf8' : 'var(--text-primary)', borderRadius: 2 }}
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3/4 h-0.5"
                    style={{ background: 'var(--text-primary)', borderRadius: 2 }}
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-0.5 origin-left"
                    style={{ background: isOpen ? '#818cf8' : 'var(--text-primary)', borderRadius: 2 }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 md:hidden"
            style={{ background: 'var(--bg-primary)' }}
          >
            {/* Ambient blob */}
            <div
              className="absolute -top-1/4 -right-1/4 w-full h-full rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Nav items */}
            <div className="relative h-full flex flex-col justify-center px-8">
              <nav className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-5 py-4"
                    >
                      <span
                        className="text-xs font-mono tabular-nums w-6"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {item.number}
                      </span>
                      <motion.div
                        className="h-px flex-grow max-w-[40px] origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: index * 0.07 + 0.2, duration: 0.4 }}
                        style={{
                          background: activeSection === item.href.substring(1)
                            ? 'linear-gradient(90deg, #6366f1, #8b5cf6)'
                            : 'rgba(255,255,255,0.1)',
                        }}
                      />
                      <span
                        className="text-4xl font-light tracking-tight transition-colors duration-200"
                        style={{
                          color: activeSection === item.href.substring(1)
                            ? '#818cf8'
                            : 'var(--text-primary)',
                        }}
                      >
                        {item.name}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45 }}
                className="absolute bottom-8 left-8"
              >
                <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  kevtech.net
                </div>
                <div className="text-[10px] tracking-widest uppercase mt-1" style={{ color: 'var(--indigo)' }}>
                  Full-Stack Developer
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
