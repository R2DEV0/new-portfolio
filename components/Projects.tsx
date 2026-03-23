'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/data/projects'
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react'
import { TiltCard } from './TiltCard'
import { ScrambleText } from './ScrambleText'

const companyColors: Record<string, { color: string; bg: string; border: string }> = {
  'AREA15': {
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.25)',
  },
  'Strategy9': {
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.25)',
  },
  'J Taylor Education': {
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.25)',
  },
}

const defaultStyle = {
  color: '#6366f1',
  bg: 'rgba(99,102,241,0.08)',
  border: 'rgba(99,102,241,0.25)',
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const style = (project.company ? companyColors[project.company] : null) || defaultStyle

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
    <TiltCard
      className="group relative rounded-2xl overflow-hidden glow-card transition-all duration-300"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid var(--border)`,
        boxShadow: `0 0 0px ${style.color}00`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, ${style.color}, transparent)` }}
      />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            {project.company && (
              <span
                className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2"
                style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
              >
                {project.company}
              </span>
            )}
            <h3 className="text-base font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
            {project.period && (
              <p className="text-xs mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>
                {project.period}
              </p>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-1.5 flex-shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                aria-label="GitHub"
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = style.border
                  ;(e.currentTarget as HTMLElement).style.color = style.color
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                }}
              >
                <Github className="w-4 h-4" style={{ color: 'inherit' }} />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                aria-label="Live project"
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = style.border
                  ;(e.currentTarget as HTMLElement).style.color = style.color
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                }}
              >
                <ExternalLink className="w-4 h-4" style={{ color: 'inherit' }} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Highlights toggle */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="space-y-1.5 mb-4">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: style.color }} className="flex-shrink-0 mt-0.5">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.slice(0, expanded ? undefined : 4).map(tech => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-md font-medium"
              style={{
                background: style.bg,
                color: style.color,
                border: `1px solid ${style.border}`,
              }}
            >
              {tech}
            </span>
          ))}
          {!expanded && project.technologies.length > 4 && (
            <span className="text-xs px-2 py-0.5 rounded-md" style={{ color: 'var(--text-muted)' }}>
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="flex items-center gap-1 text-xs font-medium transition-colors duration-200"
          style={{ color: expanded ? style.color : 'var(--text-muted)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = style.color }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = expanded ? style.color : 'var(--text-muted)' }}
        >
          {expanded ? (
            <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
          ) : (
            <><ChevronDown className="w-3.5 h-3.5" /> View highlights</>
          )}
        </button>
      </div>
    </TiltCard>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '800px', height: '800px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3"><ScrambleText text="Portfolio" /></p>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text pb-2">Featured Projects</h2>
          <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {projects.length} production projects across 3 companies
          </p>
        </motion.div>

        {/* Company legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {Object.entries(companyColors).map(([company, style]) => (
            <div
              key={company}
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
              style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.color }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: style.color }} />
              {company}
            </div>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
