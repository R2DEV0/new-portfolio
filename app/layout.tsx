import type { Metadata } from 'next'
import { Space_Grotesk, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CustomCursor } from '@/components/CustomCursor'
import { KonamiEgg } from '@/components/KonamiEgg'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space',
})

const libreBaskerville = Libre_Baskerville({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre',
})

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
      <body className={`${spaceGrotesk.variable} ${libreBaskerville.variable} font-sans`}>
        <ThemeProvider>
          <CustomCursor />
          <KonamiEgg />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

