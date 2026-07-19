'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, FileText, MapPin, Briefcase } from 'lucide-react'
import { ScrambleText } from './ScrambleText'

interface StatItem {
  value: number
  suffix: string
  prefix?: string
  label: string
  color: string
}

const stats: StatItem[] = [
  { value: 7, suffix: '+', label: 'Years of Experience', color: '#6366f1' },
  { value: 2, suffix: 'M+', label: 'Students Reached', color: '#8b5cf6' },
  { value: 8500, suffix: '+', label: 'Daily Kiosk Customers', color: '#22d3ee' },
  { value: 99.9, suffix: '%', label: 'Uptime Maintained', color: '#10b981' },
]

// Secondary impact metrics — quick-hit résumé numbers
const impactChips: { value: string; label: string; color: string }[] = [
  { value: '50K+', label: 'Chrome extension installs', color: '#6366f1' },
  { value: '800K+', label: 'marketing emails / month', color: '#8b5cf6' },
  { value: '+300%', label: 'organic traffic growth', color: '#22d3ee' },
  { value: '~35%', label: 'faster delivery with AI', color: '#10b981' },
  { value: '6+', label: 'production sites', color: '#ec4899' },
]

function CountUp({ target, suffix, prefix = '', color }: { target: number; suffix: string; prefix?: string; color: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic
      setCount(+(target * eased).toFixed(target % 1 !== 0 ? 1 : 0))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  const formatted = count >= 1000 ? Math.round(count).toLocaleString() : count

  return (
    <span ref={ref} className="tabular-nums" style={{ color }}>
      {prefix}{formatted}{suffix}
    </span>
  )
}

const workHistory = [
  {
    company: 'AREA15',
    role: 'Senior Engineer',
    period: 'Feb 2023 – Present',
    location: 'Las Vegas / Remote',
    color: '#6366f1',
    highlights: [
      'Architected AWS + Cloudflare DNS infra — 99.9% uptime across 6+ production sites',
      'Android Stripe ticketing kiosks — 8,500+ customers/day, +15% ticket sales',
      'Integrated AI tools (Claude Code/Cowork, Cursor) cutting delivery time ~35%',
      'CI/CD (GitHub Actions) + unified Stripe, Square, HubSpot & Strapi APIs',
    ],
  },
  {
    company: 'Strategy9',
    role: 'Software Developer',
    period: 'Aug 2021 – Oct 2024',
    location: 'Remote',
    color: '#8b5cf6',
    highlights: [
      'SMS valet queue platform (C#/ASP.NET Core) cut management time 40%',
      '800K+ monthly emails at 99%+ compliance across 12+ casino clients',
      'Sportspool data apps tripled user data capture for targeted marketing',
    ],
  },
  {
    company: 'J Taylor Education',
    role: 'Lead Software Developer',
    period: 'Jun 2019 – Oct 2024',
    location: 'Remote',
    color: '#22d3ee',
    highlights: [
      'AWS infra (EC2, S3, CloudFront) — 99.9% uptime serving 2M+ students',
      '25% faster page loads & 40% better scalability via MERN refactor',
      'Chrome extension: 50K+ installs, +300% organic traffic; e-learning in 45 states / 9 countries',
    ],
  },
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Section bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.03) 50%, transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3"><ScrambleText text="Background" /></p>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text pb-2">About Me</h2>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="glow-card rounded-2xl p-5 text-center"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="text-3xl sm:text-4xl font-bold mb-1">
                <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} color={stat.color} />
              </div>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary impact metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2.5 mb-16"
        >
          {impactChips.map(chip => (
            <div
              key={chip.label}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <span className="font-bold tabular-nums" style={{ color: chip.color }}>{chip.value}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{chip.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Two-column: bio + work history */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
              Who I Am
            </h3>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                I'm a <strong style={{ color: 'var(--text-primary)' }}>Full-Stack Engineer &amp; AI-integrated developer</strong> with{' '}
                <strong style={{ color: 'var(--text-primary)' }}>7+ years</strong> shipping scalable web apps, cloud
                infrastructure, and revenue-driving digital experiences. Right now I'm a{' '}
                <strong style={{ color: '#6366f1' }}>Senior Engineer at AREA15</strong> (Las Vegas / remote), running the
                infrastructure and products behind a high-traffic entertainment venue.
              </p>
              <p>
                I lean hard into <strong style={{ color: 'var(--text-primary)' }}>AI-augmented development</strong> —{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Claude Code</strong>,{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Claude Cowork</strong>,{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Cursor</strong>, and{' '}
                <strong style={{ color: 'var(--text-primary)' }}>ChatGPT</strong> — to cut feature delivery time by roughly
                35% while keeping quality high.
              </p>
              <p>
                My stack spans <strong style={{ color: 'var(--text-primary)' }}>MERN / Next.js</strong>, AWS, Cloudflare
                DNS, and CI/CD, plus deep API integrations (Stripe, Square, HubSpot, Strapi, Twilio). I'm{' '}
                <strong style={{ color: 'var(--text-primary)' }}>AWS Certified</strong> and hold dual degrees in Computer
                Science and Business Administration — so I translate technology investments into measurable business
                outcomes.
              </p>
            </div>

            {/* Contact card */}
            <div
              className="mt-8 p-5 rounded-2xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4" style={{ color: '#6366f1' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Vancouver, WA (Remote Available)</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:r2devo@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    color: '#818cf8',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.2)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(99,102,241,0.3)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.12)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <Mail className="w-4 h-4" />
                  r2devo@gmail.com
                </a>
                <a
                  href="https://kevtech.net/KevinChanceyResume1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    color: '#a78bfa',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.2)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(139,92,246,0.3)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.12)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <FileText className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>

          {/* Work timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
              Experience
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-4 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(99,102,241,0.1))' }}
              />

              <div className="space-y-6 pl-12">
                {workHistory.map((job, i) => (
                  <motion.div
                    key={job.company}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[2.45rem] top-1.5 w-3 h-3 rounded-full border-2 border-current"
                      style={{
                        color: job.color,
                        background: 'var(--bg-primary)',
                        boxShadow: `0 0 8px ${job.color}80`,
                      }}
                    />

                    <div
                      className="p-4 rounded-xl glow-card"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {job.role}
                        </h4>
                        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                          {job.period}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="w-3.5 h-3.5" style={{ color: job.color }} />
                        <span className="text-sm font-medium" style={{ color: job.color }}>
                          {job.company}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>· {job.location}</span>
                      </div>
                      <ul className="space-y-1">
                        {job.highlights.map((h, j) => (
                          <li
                            key={j}
                            className="text-xs flex items-start gap-2"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <span style={{ color: job.color }} className="mt-0.5 flex-shrink-0">▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
