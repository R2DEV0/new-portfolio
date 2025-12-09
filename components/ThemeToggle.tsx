'use client'

import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

interface ThemeToggleProps {
  className?: string
  mobile?: boolean
}

export function ThemeToggle({ className = '', mobile = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className={`p-2 rounded-lg text-zinc-500 ${className}`}
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="w-4 h-4" />
      </button>
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 ${className}`}
      aria-label="Toggle theme"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0,
          scale: 1
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </motion.div>
    </motion.button>
  )
}
