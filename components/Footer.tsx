'use client'

import { Github, Linkedin, FileText, Instagram, Facebook, ArrowUp, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
]

const social = [
  { href: 'https://www.linkedin.com/in/kevin-chancey', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.github.com/R2DEV0', icon: Github, label: 'GitHub' },
  { href: 'https://www.instagram.com/kevchancey/', icon: Instagram, label: 'Instagram' },
  { href: 'https://www.facebook.com/kevinr.chancey', icon: Facebook, label: 'Facebook' },
  { href: 'https://kevtech.net/KevinChanceyResume1.pdf', icon: FileText, label: 'Resume' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden pt-16 pb-8 px-4 sm:px-6">
      {/* Top gradient divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4) 30%, rgba(139,92,246,0.4) 70%, transparent)' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse at bottom, rgba(99,102,241,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 0 16px rgba(99,102,241,0.4)',
                }}
              >
                <span className="text-white font-bold text-lg font-serif">K</span>
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Kevin Chancey</div>
                <div className="text-xs" style={{ color: 'var(--indigo)' }}>Full-Stack Developer</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              Senior Full-Stack Developer crafting innovative digital experiences with MERN, AI tools, and cloud-native architecture.
            </p>
            <a
              href="mailto:r2devo@gmail.com"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#818cf8' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
            >
              <Mail className="w-4 h-4" />
              r2devo@gmail.com
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-widest" style={{ color: 'var(--indigo)' }}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-all duration-200 flex items-center gap-2 group"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#818cf8' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
                  >
                    <span
                      className="w-0 group-hover:w-3 h-px transition-all duration-300 origin-left"
                      style={{ background: '#6366f1' }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://kevtech.net/KevinChanceyResume1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-all duration-200 flex items-center gap-2 group"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#818cf8' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
                >
                  <span
                    className="w-0 group-hover:w-3 h-px transition-all duration-300 origin-left"
                    style={{ background: '#6366f1' }}
                  />
                  Resume PDF
                </a>
              </li>
            </ul>
          </div>

          {/* Social + back to top */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-widest" style={{ color: 'var(--indigo)' }}>
              Connect
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {social.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl transition-all duration-200"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(99,102,241,0.4)'
                    el.style.color = '#818cf8'
                    el.style.boxShadow = '0 0 10px rgba(99,102,241,0.2)'
                    el.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--border)'
                    el.style.color = 'var(--text-secondary)'
                    el.style.boxShadow = 'none'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all duration-200"
              style={{
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
                color: '#818cf8',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.2)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(99,102,241,0.3)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.1)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Back to top
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          <span>&copy; {year} KevTech.net · Kevin Chancey. All rights reserved.</span>
          <span className="font-mono flex items-center gap-2">
            <span style={{ color: 'var(--indigo)' }}>{'<'}</span>
            Built with Next.js + Framer Motion
            <span style={{ color: 'var(--indigo)' }}>{'/>'}</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
