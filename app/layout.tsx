import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kevin Chancey | Full-Stack Developer',
  description: 'Portfolio of Kevin R. Chancey - Senior Developer specializing in MERN stack, React, Next.js, and AWS',
  keywords: ['developer', 'full-stack', 'react', 'next.js', 'aws', 'portfolio'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

