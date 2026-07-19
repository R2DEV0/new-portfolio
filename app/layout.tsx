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
  metadataBase: new URL('https://kevtech.net'),
  title: 'Kevin Chancey | Full-Stack Engineer & AI-Integrated Developer',
  description:
    'Kevin R. Chancey — Full-Stack Engineer with 7+ years building scalable web apps, cloud infrastructure, and AI-augmented experiences. MERN, Next.js, AWS, Cloudflare. AWS Certified.',
  keywords: [
    'Kevin Chancey', 'full-stack engineer', 'AI developer', 'MERN', 'React', 'Next.js',
    'AWS', 'Cloudflare', 'Claude Code', 'Cursor', 'senior engineer', 'portfolio',
  ],
  authors: [{ name: 'Kevin R. Chancey' }],
  openGraph: {
    title: 'Kevin Chancey | Full-Stack Engineer & AI-Integrated Developer',
    description:
      '7+ years shipping scalable web apps, cloud infrastructure, and AI-augmented experiences. Explore the interactive terminal résumé.',
    url: 'https://kevtech.net',
    siteName: 'KevTech · Kevin Chancey',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kevin Chancey | Full-Stack Engineer & AI-Integrated Developer',
    description: '7+ years shipping scalable web apps, cloud, and AI-augmented experiences. MERN · Next.js · AWS.',
  },
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

