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
      setHasScrolled(window.scrollY > 50)
      
      const sections = navItems.map(item => item.href.substring(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(current || '')
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          hasScrolled 
            ? 'py-3' 
            : 'py-5'
        }`}
      >
        <div className={`mx-auto px-6 transition-all duration-500 ${
          hasScrolled 
            ? 'max-w-4xl' 
            : 'max-w-7xl'
        }`}>
          <div className={`flex justify-between items-center transition-all duration-500 ${
            hasScrolled 
              ? 'bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg shadow-black/5 dark:shadow-black/20 border border-zinc-200/50 dark:border-zinc-700/50' 
              : ''
          }`}>
            {/* Logo */}
            <a href="#" className="group relative flex items-center gap-3">
              {/* Monogram */}
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                  <span className="text-white font-serif text-xl font-bold tracking-tight">K</span>
                </div>
                {/* Corner accent */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-500 rounded-sm transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              {/* Text */}
              <div className="hidden sm:block">
                <span className="text-zinc-900 dark:text-white font-medium tracking-wide text-sm">
                  KEVIN CHANCEY
                </span>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 tracking-[0.2em] uppercase">
                  Developer
                </div>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative px-4 py-2"
                >
                  <span className={`relative z-10 text-sm tracking-wide transition-colors duration-200 ${
                    activeSection === item.href.substring(1)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                  {/* Hover line */}
                  <span className={`absolute bottom-1 left-4 right-4 h-px origin-left transition-transform duration-300 ${
                    activeSection === item.href.substring(1)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-x-100'
                      : 'bg-zinc-900 dark:bg-white scale-x-0 group-hover:scale-x-100'
                  }`} />
                </a>
              ))}
              
              <div className="ml-4 pl-4 border-l border-zinc-200 dark:border-zinc-700">
                <ThemeToggle mobile={false} />
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle mobile={true} />
              
              {/* Custom Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-4 flex flex-col justify-between">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-0.5 bg-zinc-900 dark:bg-white origin-left"
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-0.5 bg-zinc-900 dark:bg-white"
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-0.5 bg-zinc-900 dark:bg-white origin-left"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            {/* Background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white dark:bg-zinc-900"
            />
            
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.05 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute -top-1/4 -right-1/4 w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"
              />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center px-8">
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-6 py-4"
                    >
                      {/* Number */}
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono tabular-nums">
                        {item.number}
                      </span>
                      
                      {/* Line */}
                      <motion.div 
                        className={`h-px flex-grow max-w-[60px] transition-colors duration-300 ${
                          activeSection === item.href.substring(1)
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                            : 'bg-zinc-200 dark:bg-zinc-800 group-hover:bg-blue-500'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
                        style={{ originX: 0 }}
                      />
                      
                      {/* Text */}
                      <span className={`text-3xl sm:text-4xl font-light tracking-tight transition-colors duration-300 ${
                        activeSection === item.href.substring(1)
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}>
                        {item.name}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* Footer info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="absolute bottom-8 left-8 right-8"
              >
                <div className="text-xs text-zinc-400 dark:text-zinc-500">
                  <div className="font-mono mb-1">kevtech.net</div>
                  <div className="text-[10px] uppercase tracking-widest">Full-Stack Developer</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
