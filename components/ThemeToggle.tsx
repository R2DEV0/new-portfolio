'use client'

import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'
import { Sun, Moon } from 'lucide-react'

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
        className={`p-2 rounded-md text-gray-700 dark:text-gray-300 ${className}`}
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="w-5 h-5" />
      </button>
    )
  }

  const baseClasses = mobile
    ? `p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`
    : `fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700 ${className}`

  return (
    <button
      onClick={toggleTheme}
      className={baseClasses}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  )
}

