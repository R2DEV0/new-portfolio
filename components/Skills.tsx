'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, skillCategories, type Skill } from '@/data/skills'
import { ScrambleText } from './ScrambleText'

type Category = keyof typeof skillCategories | 'all'

const categoryMeta: Record<string, { icon: string; color: string; glow: string }> = {
  all:        { icon: '⚡', color: '#6366f1', glow: 'rgba(99,102,241,0.3)' },
  frontend:   { icon: '🎨', color: '#22d3ee', glow: 'rgba(34,211,238,0.3)' },
  backend:    { icon: '⚙️', color: '#6366f1', glow: 'rgba(99,102,241,0.3)' },
  tools:      { icon: '🔧', color: '#8b5cf6', glow: 'rgba(139,92,246,0.3)' },
  cloud:      { icon: '☁️', color: '#10b981', glow: 'rgba(16,185,129,0.3)' },
  management: { icon: '🎯', color: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
  other:      { icon: '🤖', color: '#ec4899', glow: 'rgba(236,72,153,0.3)' },
}

function getLevelBadge(level: number) {
  if (level >= 95) return { label: 'Expert', color: '#10b981' }
  if (level >= 85) return { label: 'Advanced', color: '#6366f1' }
  if (level >= 75) return { label: 'Proficient', color: '#8b5cf6' }
  return { label: 'Familiar', color: '#94a3b8' }
}

function SkillPill({ skill, index, categoryColor }: { skill: Skill; index: number; categoryColor: string }) {
  const [hovered, setHovered] = useState(false)
  const badge = getLevelBadge(skill.level)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ delay: index * 0.03, type: 'spring', stiffness: 300, damping: 25 }}
      className="relative skill-pill"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 select-none"
        style={{
          background: hovered
            ? `rgba(${hexToRgb(categoryColor)}, 0.15)`
            : 'var(--bg-card)',
          border: `1px solid ${hovered ? categoryColor + '60' : 'var(--border)'}`,
          color: hovered ? categoryColor : 'var(--text-secondary)',
          boxShadow: hovered ? `0 0 12px ${categoryColor}30, 0 4px 12px rgba(0,0,0,0.2)` : 'none',
          transform: hovered ? 'translateY(-1px)' : 'none',
        }}
      >
        <div className="flex items-center gap-2">
          <span>{skill.name}</span>
          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xs font-semibold overflow-hidden whitespace-nowrap"
                style={{ color: badge.color }}
              >
                {badge.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : '99,102,241'
}

const allCategories: Category[] = ['all', ...Object.keys(skillCategories) as Array<keyof typeof skillCategories>]

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  const activeMeta = categoryMeta[activeCategory] || categoryMeta.all

  return (
    <section id="skills" className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(9,9,33,0.5), transparent 30%, transparent 70%, rgba(9,9,33,0.5))' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3"><ScrambleText text="Toolkit" /></p>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text pb-2">Skills & Technologies</h2>
          <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {skills.length} technologies across {Object.keys(skillCategories).length} domains
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {allCategories.map(cat => {
            const meta = categoryMeta[cat]
            const isActive = activeCategory === cat
            const label = cat === 'all' ? 'All Skills' : skillCategories[cat as keyof typeof skillCategories]
            const count = cat === 'all' ? skills.length : skills.filter(s => s.category === cat).length

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive ? `rgba(${hexToRgb(meta.color)}, 0.15)` : 'var(--bg-card)',
                  border: `1px solid ${isActive ? meta.color + '60' : 'var(--border)'}`,
                  color: isActive ? meta.color : 'var(--text-secondary)',
                  boxShadow: isActive ? `0 0 16px ${meta.glow}` : 'none',
                }}
              >
                <span>{meta.icon}</span>
                <span>{label}</span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    background: isActive ? `rgba(${hexToRgb(meta.color)}, 0.2)` : 'rgba(255,255,255,0.05)',
                    color: isActive ? meta.color : 'var(--text-muted)',
                  }}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Category info bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 mb-6 px-1"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: activeMeta.color, boxShadow: `0 0 8px ${activeMeta.color}` }}
            />
            <span className="text-sm font-medium" style={{ color: activeMeta.color }}>
              {activeCategory === 'all' ? 'All Technologies' : skillCategories[activeCategory as keyof typeof skillCategories]}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              — {filteredSkills.length} skills
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Skills grid */}
        <motion.div layout className="flex flex-wrap gap-2.5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <SkillPill
                key={skill.name}
                skill={skill}
                index={i}
                categoryColor={categoryMeta[skill.category]?.color || '#6366f1'}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-10 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {[
            { label: 'Expert (95%+)', color: '#10b981' },
            { label: 'Advanced (85%+)', color: '#6366f1' },
            { label: 'Proficient (75%+)', color: '#8b5cf6' },
            { label: 'Familiar', color: '#94a3b8' },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
