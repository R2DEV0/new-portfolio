'use client'

import { motion } from 'framer-motion'
import { education } from '@/data/education'
import { GraduationCap, Award, ExternalLink } from 'lucide-react'
import { ScrambleText } from './ScrambleText'

const eduColors = [
  { color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.25)' },
  { color: '#22d3ee', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.25)' },
  { color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.25)' },
]

export function Education() {
  return (
    <section id="education" className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(9,9,33,0.6) 50%, transparent)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3"><ScrambleText text="Credentials" /></p>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text pb-2">Education & Certs</h2>
        </motion.div>

        {/* Cards */}
        <div className="space-y-5">
          {education.map((edu, index) => {
            const style = eduColors[index % eduColors.length]

            return (
              <motion.div
                key={`${edu.institution}-${edu.degree}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden glow-card transition-all duration-300"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = style.border
                  el.style.boxShadow = `0 0 24px ${style.color}20, 0 6px 32px rgba(0,0,0,0.3)`
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--border)'
                  el.style.boxShadow = ''
                  el.style.transform = 'translateY(0)'
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ background: `linear-gradient(to bottom, ${style.color}, transparent)` }}
                />

                <div className="flex items-start gap-5 p-6 pl-8">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: style.bg, border: `1px solid ${style.border}` }}
                  >
                    {edu.certification ? (
                      <Award className="w-6 h-6" style={{ color: style.color }} />
                    ) : (
                      <GraduationCap className="w-6 h-6" style={{ color: style.color }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {edu.degree}
                        </h3>
                        <p className="text-base font-medium mt-0.5" style={{ color: style.color }}>
                          {edu.institution}
                        </p>
                      </div>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0"
                        style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
                      >
                        {edu.certification ? 'Certification' : 'Degree'}
                      </span>
                    </div>

                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                      {edu.location}
                    </p>

                    {edu.description && (
                      <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
