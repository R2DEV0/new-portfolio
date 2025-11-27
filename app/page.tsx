import { Navbar } from '@/components/Navbar'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Education } from '@/components/Education'
import { Projects } from '@/components/Projects'
import { Blog } from '@/components/Blog'
import { Footer } from '@/components/Footer'
import { AIChat } from '@/components/AIChat'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Blog />
      <Footer />
      <AIChat />
    </main>
  )
}

