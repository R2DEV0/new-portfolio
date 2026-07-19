'use client'

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TerminalSquare } from 'lucide-react'
import { skills, skillCategories, type Skill } from '@/data/skills'
import { projects } from '@/data/projects'
import { education } from '@/data/education'

/* ============================================================
   Kevin's terminal — an interactive, offline-first assistant.
   Typed commands run instantly from local data. Free-form
   questions try /api/chat (OpenAI) and gracefully fall back to
   a local keyword-matched knowledge base if no key is set.
   ============================================================ */

const C = {
  green: '#34d399',
  cyan: '#22d3ee',
  indigo: '#818cf8',
  violet: '#a78bfa',
  amber: '#fbbf24',
  pink: '#f472b6',
  text: '#c7d2e5',
  dim: '#7c89a6',
}

type Line =
  | { kind: 'cmd'; text: string }
  | { kind: 'out'; node: ReactNode }

const COMMANDS = [
  'help', 'about', 'whoami', 'skills', 'experience', 'projects',
  'stats', 'contact', 'social', 'education', 'resume', 'neofetch',
  'theme', 'clear', 'ls', 'sudo',
] as const

// ---- Output builders --------------------------------------------------------

function Row({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex gap-2">
      <span style={{ color: C.dim }} className="w-28 flex-shrink-0">{label}</span>
      <span style={{ color }}>{value}</span>
    </div>
  )
}

function helpOutput(): ReactNode {
  const items: [string, string][] = [
    ['about', 'who I am, in one paragraph'],
    ['experience', 'where I have worked + impact'],
    ['projects', 'things I have shipped'],
    ['skills', 'my tech stack, by domain'],
    ['stats', 'career numbers that matter'],
    ['education', 'degrees & certifications'],
    ['contact', 'how to reach / hire me'],
    ['resume', 'open my résumé (PDF)'],
    ['neofetch', 'system info, dev edition'],
    ['theme', 'flip light / dark mode'],
    ['clear', 'clear the screen'],
  ]
  return (
    <div className="space-y-0.5">
      <div style={{ color: C.dim }}>Available commands — or just ask me a question in plain English:</div>
      <div className="mt-1.5 space-y-0.5">
        {items.map(([cmd, desc]) => (
          <div key={cmd} className="flex gap-2">
            <span style={{ color: C.green }} className="w-24 flex-shrink-0">{cmd}</span>
            <span style={{ color: C.text }}>{desc}</span>
          </div>
        ))}
      </div>
      <div className="mt-2" style={{ color: C.dim }}>
        Try: <span style={{ color: C.cyan }}>projects</span>,{' '}
        <span style={{ color: C.cyan }}>are you available to hire?</span>, or{' '}
        <span style={{ color: C.cyan }}>neofetch</span>. Use ↑/↓ for history, Tab to autocomplete.
      </div>
    </div>
  )
}

function aboutOutput(): ReactNode {
  return (
    <div className="space-y-2" style={{ color: C.text }}>
      <p>
        <span style={{ color: C.indigo }}>Kevin R. Chancey</span> — Full-Stack Engineer & AI-integrated
        developer with <span style={{ color: C.amber }}>7+ years</span> delivering scalable web apps, cloud
        infrastructure, and revenue-driving digital experiences.
      </p>
      <p>
        Currently <span style={{ color: C.green }}>Senior Engineer @ AREA15</span> (Las Vegas / remote),
        running the AWS + Cloudflare infrastructure and products behind a high-traffic entertainment venue.
        Specialized in MERN / Next.js, AWS, CI/CD, and AI-augmented development with Claude Code, Cowork,
        Cursor, and ChatGPT.
      </p>
      <p style={{ color: C.dim }}>AWS Certified · dual B.S. in Computer Science & Business Administration.</p>
    </div>
  )
}

function skillsOutput(): ReactNode {
  const byCat = Object.entries(skillCategories) as [keyof typeof skillCategories, string][]
  const colorFor: Record<string, string> = {
    frontend: C.cyan, backend: C.indigo, cloud: C.green,
    ai: C.pink, apis: C.violet, leadership: C.amber,
  }
  return (
    <div className="space-y-2">
      {byCat.map(([key, label]) => {
        const items = skills.filter((s: Skill) => s.category === key)
        if (!items.length) return null
        return (
          <div key={key}>
            <div style={{ color: colorFor[key] || C.indigo }} className="font-semibold">{label}</div>
            <div style={{ color: C.text }} className="pl-3">
              {items.map(s => s.name).join(' · ')}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function experienceOutput(): ReactNode {
  const jobs = [
    {
      role: 'Senior Engineer', company: 'AREA15', period: 'Feb 2023 – Present', color: C.indigo,
      points: [
        'AWS + Cloudflare DNS infra — 99.9% uptime across 6+ production sites',
        'Android Stripe ticketing kiosks — 8,500+ customers/day, +15% sales',
        'AI tooling cut feature delivery time by ~35%',
        'CI/CD (GitHub Actions) + unified Stripe, Square, HubSpot & Strapi APIs',
      ],
    },
    {
      role: 'Software Developer', company: 'Strategy9', period: 'Aug 2021 – Oct 2024', color: C.violet,
      points: [
        'SMS valet queue platform (C#/ASP.NET) cut management time 40%',
        '800K+ monthly emails at 99%+ compliance across 12+ casino clients',
        'Sportspool data apps tripled user data capture',
      ],
    },
    {
      role: 'Lead Software Developer', company: 'J Taylor Education', period: 'Jun 2019 – Oct 2024', color: C.cyan,
      points: [
        'AWS infra — 99.9% uptime serving 2M+ students',
        '25% faster page loads, 40% better scalability (MERN refactor)',
        'Chrome extension: 50K+ installs, +300% organic traffic',
      ],
    },
  ]
  return (
    <div className="space-y-3">
      {jobs.map(j => (
        <div key={j.company}>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span style={{ color: j.color }} className="font-semibold">{j.company}</span>
            <span style={{ color: C.text }}>— {j.role}</span>
            <span style={{ color: C.dim }} className="text-xs">{j.period}</span>
          </div>
          <ul className="pl-3 mt-0.5">
            {j.points.map((p, i) => (
              <li key={i} style={{ color: C.text }}>
                <span style={{ color: j.color }}>▸ </span>{p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function projectsOutput(): ReactNode {
  const palette: Record<string, string> = {
    AREA15: C.indigo, Strategy9: C.violet, 'J Taylor Education': C.cyan,
  }
  return (
    <div className="space-y-1">
      <div style={{ color: C.dim }}>{projects.length} shipped projects — a selection:</div>
      {projects.map(p => {
        const color = (p.company && palette[p.company]) || C.indigo
        const metric = p.metrics?.[0]
        return (
          <div key={p.title} className="flex flex-wrap items-baseline gap-x-2">
            <span style={{ color: C.green }}>›</span>
            <span style={{ color: C.text }}>{p.title}</span>
            {p.company && <span style={{ color }} className="text-xs">[{p.company}]</span>}
            {metric && (
              <span style={{ color: C.amber }} className="text-xs">{metric.value} {metric.label}</span>
            )}
          </div>
        )
      })}
      <div className="mt-1" style={{ color: C.dim }}>
        Full details + links in the <span style={{ color: C.cyan }}>Projects</span> section below.
      </div>
    </div>
  )
}

function statsOutput(): ReactNode {
  const stats: [string, string][] = [
    ['7+ years', 'full-stack engineering experience'],
    ['2M+', 'students reached (J Taylor platform)'],
    ['8,500+', 'kiosk customers served per day'],
    ['99.9%', 'uptime across production sites'],
    ['800K+', 'marketing emails per month'],
    ['50K+', 'Chrome extension installs'],
    ['+300%', 'organic traffic growth'],
    ['~35%', 'faster delivery via AI-augmented dev'],
  ]
  return (
    <div className="space-y-0.5">
      {stats.map(([v, l]) => (
        <div key={l} className="flex gap-3">
          <span style={{ color: C.amber }} className="w-20 flex-shrink-0 font-semibold tabular-nums">{v}</span>
          <span style={{ color: C.text }}>{l}</span>
        </div>
      ))}
    </div>
  )
}

function educationOutput(): ReactNode {
  return (
    <div className="space-y-1.5">
      {education.map(e => (
        <div key={e.degree}>
          <div style={{ color: e.certification ? C.green : C.indigo }} className="font-semibold">
            {e.degree}{e.period ? ` · ${e.period}` : ''}
          </div>
          <div style={{ color: C.text }} className="pl-3">{e.institution} — {e.location}</div>
        </div>
      ))}
    </div>
  )
}

function contactOutput(): ReactNode {
  const rows: [string, string, string, string?][] = [
    ['email', 'r2devo@gmail.com', C.cyan, 'mailto:r2devo@gmail.com'],
    ['phone', '(206) 519-4870', C.text, 'tel:+12065194870'],
    ['website', 'kevtech.net', C.green, 'https://kevtech.net'],
    ['linkedin', 'in/kevin-chancey', C.indigo, 'https://www.linkedin.com/in/kevin-chancey'],
    ['github', 'github.com/R2DEV0', C.violet, 'https://github.com/R2DEV0'],
  ]
  return (
    <div className="space-y-0.5">
      <div style={{ color: C.green }}>✔ Open to new opportunities.</div>
      <div className="mt-1 space-y-0.5">
        {rows.map(([label, value, color, href]) => (
          <div key={label} className="flex gap-2">
            <span style={{ color: C.dim }} className="w-20 flex-shrink-0">{label}</span>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" style={{ color }} className="hover:underline">
                {value}
              </a>
            ) : (
              <span style={{ color }}>{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function neofetchOutput(): ReactNode {
  const logo = [
    ' _  __         ',
    '| |/ /         ',
    "| ' /  ___  __ ",
    '| . \\ / _ \\/ _|',
    '|_|\\_\\\\___/\\__|',
  ]
  const info: [string, string, string][] = [
    ['host', 'kevin@kevtech.net', C.green],
    ['title', 'Senior Engineer @ AREA15', C.indigo],
    ['uptime', '7+ years in production', C.amber],
    ['stack', 'MERN · Next.js · C# · PHP', C.cyan],
    ['cloud', 'AWS · Cloudflare · Netlify', C.violet],
    ['ai', 'Claude Code · Cowork · Cursor', C.pink],
    ['editor', 'Cursor + Claude Code', C.text],
    ['certs', 'AWS Certified Developer', C.green],
  ]
  return (
    <div className="flex gap-4 flex-wrap">
      <pre style={{ color: C.indigo }} className="leading-tight text-[10px] sm:text-xs">{logo.join('\n')}</pre>
      <div className="space-y-0.5">
        {info.map(([k, v, color]) => (
          <div key={k} className="flex gap-2">
            <span style={{ color: C.dim }} className="w-16 flex-shrink-0">{k}</span>
            <span style={{ color }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---- Local knowledge-base fallback -----------------------------------------

function localAnswer(qRaw: string): string {
  const q = qRaw.toLowerCase()
  const has = (...w: string[]) => w.some(x => q.includes(x))

  if (has('hire', 'available', 'availab', 'job', 'opportun', 'looking', 'open to'))
    return "Yes — Kevin is open to new opportunities. Reach him at r2devo@gmail.com or (206) 519-4870, or type `contact`."
  if (has('ai', 'claude', 'cursor', 'chatgpt', 'cowork', 'copilot', 'llm'))
    return "Kevin builds with AI daily — Claude Code, Claude Cowork, Cursor, and ChatGPT — which cut his feature delivery time by ~35% while keeping quality high. Type `skills` for the full stack."
  if (has('aws', 'cloud', 'devops', 'infra', 'uptime', 'cloudflare', 'ci/cd', 'deploy'))
    return "On the cloud side Kevin runs AWS (EC2, S3, Lambda, Route 53, CloudFront) with Cloudflare DNS and GitHub Actions CI/CD — maintaining 99.9% uptime across 6+ production sites. He's AWS Certified. Type `experience`."
  if (has('area15', 'kiosk', 'stripe', 'ticket', 'current', 'now'))
    return "At AREA15 (Senior Engineer, 2023–present) Kevin built Android + Stripe ticketing kiosks serving 8,500+ customers/day (+15% sales) and runs the AWS/Cloudflare infra behind 6+ sites. Type `experience`."
  if (has('strategy9', 'valet', 'casino', 'sms', 'email', 'marketing'))
    return "At Strategy9 Kevin built an SMS valet platform (−40% management time) and a marketing engine sending 800K+ emails/month across 12+ casino clients. Type `experience`."
  if (has('taylor', 'education', 'student', 'chrome', 'extension', 'teacher'))
    return "At J Taylor Education Kevin led AWS infra serving 2M+ students at 99.9% uptime and shipped a Chrome extension with 50K+ installs that grew organic traffic 300%+. Type `experience`."
  if (has('skill', 'tech', 'stack', 'language', 'framework', 'know'))
    return "Kevin's core stack: React/Next.js, Node/Express, MongoDB, C#/ASP.NET, PHP, Python, AWS, Cloudflare, and AI tooling. Type `skills` for everything, by domain."
  if (has('project', 'built', 'ship', 'portfolio', 'work on'))
    return `Kevin has shipped ${projects.length}+ production projects — kiosks, cloud infra, a 2M-student platform, a 50K-install Chrome extension, and more. Type \`projects\`.`
  if (has('education', 'degree', 'school', 'college', 'university', 'cert'))
    return "AWS Certified Developer (2024), B.S. Computer Science (2021), and B.S. Business Administration (2017) — both from City University of Seattle. Type `education`."
  if (has('contact', 'email', 'reach', 'phone', 'linkedin', 'github', 'connect'))
    return "Email r2devo@gmail.com · phone (206) 519-4870 · linkedin.com/in/kevin-chancey · github.com/R2DEV0. Type `contact` for clickable links."
  if (has('resume', 'cv', 'download'))
    return "Type `resume` and I'll open Kevin's résumé PDF for you."
  if (has('who', 'about', 'yourself', 'bio', 'summary'))
    return "Kevin is a Full-Stack Engineer & AI-integrated developer with 7+ years of experience, currently Senior Engineer at AREA15. Type `about` for the full intro."
  if (has('hello', 'hi ', 'hey', 'yo ', 'sup', 'hola'))
    return "Hey! 👋 I'm Kevin's terminal assistant. Ask me anything, or type `help` to see commands."
  if (has('thank', 'thx', 'cheers'))
    return "Anytime! Type `contact` if you'd like to get in touch with Kevin. 🚀"

  return "I didn't quite catch that. Try `help` for commands, or ask about Kevin's experience, skills, projects, or how to hire him."
}

// ---- Component --------------------------------------------------------------

const WELCOME_BANNER: ReactNode = (
  <div style={{ color: C.text }} className="space-y-1">
    <pre style={{ color: C.indigo }} className="leading-tight text-[10px] sm:text-[11px] overflow-x-auto">
{` _   __          _____          _
| | / /         |_   _|        | |
| |/ /  _____   __| | ___  ___| |__
|    \\ / _ \\ \\ / /| |/ _ \\/ __| '_ \\
| |\\  \\  __/\\ V / | |  __/ (__| | | |
\\_| \\_/\\___| \\_/  \\_/\\___|\\___|_| |_|`}
    </pre>
    <div>
      <span style={{ color: C.green }}>kevtech</span>
      <span style={{ color: C.dim }}> · interactive résumé v2.0</span>
    </div>
    <div style={{ color: C.dim }}>
      Type <span style={{ color: C.cyan }}>help</span> to begin, or just ask me anything about Kevin.
    </div>
  </div>
)

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)

  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const convoRef = useRef<{ role: 'user' | 'assistant'; content: string }[]>([])

  const print = useCallback((node: ReactNode) => {
    setLines(prev => [...prev, { kind: 'out', node }])
  }, [])

  // Open via hero button / keyboard
  useEffect(() => {
    const open = () => setIsOpen(true)
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA'
      if (e.key === '`' && !typing) { e.preventDefault(); setIsOpen(v => !v) }
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('open-terminal', open)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('open-terminal', open)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // Autoscroll + focus + mobile scroll lock
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines, busy])

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 120)
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
      if (isMobile) document.body.style.overflow = 'hidden'
      return () => { clearTimeout(t); document.body.style.overflow = '' }
    }
  }, [isOpen])

  const runAI = useCallback(async (question: string) => {
    setBusy(true)
    let answer = ''
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, conversationHistory: convoRef.current }),
      })
      const data = await res.json()
      answer = (!res.ok || data.error || !data.response) ? localAnswer(question) : data.response
    } catch {
      answer = localAnswer(question)
    }
    convoRef.current = [
      ...convoRef.current,
      { role: 'user' as const, content: question },
      { role: 'assistant' as const, content: answer },
    ].slice(-8)
    print(<span style={{ color: C.text }} className="whitespace-pre-wrap">{answer}</span>)
    setBusy(false)
  }, [print])

  const execute = useCallback((raw: string) => {
    const cmd = raw.trim()
    setLines(prev => [...prev, { kind: 'cmd', text: cmd }])
    if (!cmd) return
    setHistory(prev => [...prev, cmd])
    setHistIdx(-1)

    const lower = cmd.toLowerCase()
    const [base, ...rest] = lower.split(/\s+/)
    const arg = rest.join(' ')

    // Easter eggs
    if (lower === 'sudo hire kevin' || (base === 'sudo' && arg.includes('hire'))) {
      print(<span style={{ color: C.green }}>[sudo] access granted ✔ — excellent decision. Reach Kevin at r2devo@gmail.com 🎉</span>)
      return
    }
    if (base === 'sudo') {
      print(<span style={{ color: C.amber }}>Nice try. 😏 Kevin has root here — but type `contact` and you can negotiate.</span>)
      return
    }
    if (base === 'coffee') { print(<span style={{ color: C.amber }}>☕ Brewing... this is what powers the 99.9% uptime.</span>); return }
    if (base === 'matrix') { print(<span style={{ color: C.green }}>Wake up, Neo... 🟩 (Kevin prefers TypeScript to green rain, honestly.)</span>); return }

    switch (base) {
      case 'help': case 'commands': case '?': print(helpOutput()); return
      case 'about': case 'whoami': case 'bio': print(aboutOutput()); return
      case 'skills': case 'stack': print(skillsOutput()); return
      case 'experience': case 'work': case 'jobs': print(experienceOutput()); return
      case 'projects': case 'portfolio': print(projectsOutput()); return
      case 'stats': case 'numbers': case 'impact': print(statsOutput()); return
      case 'education': case 'edu': case 'degrees': print(educationOutput()); return
      case 'contact': case 'hire': case 'email': print(contactOutput()); return
      case 'neofetch': case 'fetch': print(neofetchOutput()); return
      case 'ls': case 'dir':
        print(<span style={{ color: C.cyan }}>about  experience  projects  skills  stats  education  contact  resume</span>)
        return
      case 'social':
        print(
          <div className="flex flex-wrap gap-x-4" style={{ color: C.text }}>
            <a href="https://www.linkedin.com/in/kevin-chancey" target="_blank" rel="noopener noreferrer" style={{ color: C.indigo }} className="hover:underline">linkedin</a>
            <a href="https://github.com/R2DEV0" target="_blank" rel="noopener noreferrer" style={{ color: C.violet }} className="hover:underline">github</a>
            <a href="https://www.instagram.com/kevchancey/" target="_blank" rel="noopener noreferrer" style={{ color: C.pink }} className="hover:underline">instagram</a>
            <a href="https://kevtech.net" target="_blank" rel="noopener noreferrer" style={{ color: C.green }} className="hover:underline">kevtech.net</a>
          </div>
        )
        return
      case 'resume': case 'cv':
        print(
          <span style={{ color: C.text }}>
            Opening résumé →{' '}
            <a href="/KevinChanceyResume1.pdf" target="_blank" rel="noopener noreferrer" style={{ color: C.cyan }} className="hover:underline">
              KevinChanceyResume1.pdf
            </a>
          </span>
        )
        if (typeof window !== 'undefined') window.open('/KevinChanceyResume1.pdf', '_blank')
        return
      case 'theme': case 'dark': case 'light':
        window.dispatchEvent(new Event('app:toggle-theme'))
        print(<span style={{ color: C.green }}>✔ theme toggled.</span>)
        return
      case 'clear': case 'cls':
        setLines([])
        return
      case 'echo':
        print(<span style={{ color: C.text }}>{cmd.slice(5)}</span>)
        return
      case 'exit': case 'quit': case 'q':
        print(<span style={{ color: C.dim }}>closing terminal… (you can reopen with the ›_ button or the ` key)</span>)
        setTimeout(() => setIsOpen(false), 500)
        return
      default:
        // Treat anything else as a natural-language question
        runAI(cmd)
        return
    }
  }, [print, runAI])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (busy) return
    const val = input
    setInput('')
    execute(val)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx === -1) return
      const next = histIdx + 1
      if (next >= history.length) { setHistIdx(-1); setInput('') }
      else { setHistIdx(next); setInput(history[next]) }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const frag = input.trim().toLowerCase()
      if (!frag) return
      const match = COMMANDS.find(c => c.startsWith(frag))
      if (match) setInput(match)
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <>
      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen(v => !v)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[55] w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: isOpen ? 'rgba(99,102,241,0.18)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          border: isOpen ? '1px solid rgba(99,102,241,0.4)' : 'none',
          boxShadow: isOpen ? 'none' : '0 0 24px rgba(99,102,241,0.5), 0 8px 24px rgba(0,0,0,0.3)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle terminal"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-5 h-5" style={{ color: '#818cf8' }} />
            </motion.div>
          ) : (
            <motion.div key="t" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <TerminalSquare className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Terminal window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed z-[56] flex flex-col overflow-hidden inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[min(500px,calc(100vw-3rem))] sm:h-[min(640px,calc(100vh-7rem))] sm:rounded-2xl"
            style={{
              background: 'rgba(8,10,20,0.97)',
              border: '1px solid rgba(99,102,241,0.28)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 50px rgba(99,102,241,0.18), 0 24px 70px rgba(0,0,0,0.6)',
              fontFamily: 'var(--font-space), ui-monospace, SFMono-Regular, Menlo, monospace',
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <div className="flex-1 text-center text-xs font-mono select-none" style={{ color: C.dim }}>
                kevin@kevtech: ~
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(false) }}
                className="sm:hidden p-1 rounded-md"
                style={{ color: C.dim }}
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="hidden sm:block w-4" />
            </div>

            {/* Output */}
            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto px-4 py-4 text-[13px] leading-relaxed no-scrollbar"
              style={{ color: C.text }}
            >
              {WELCOME_BANNER}
              <div className="mt-3 space-y-2">
                {lines.map((line, i) =>
                  line.kind === 'cmd' ? (
                    <div key={i} className="flex gap-2 items-baseline">
                      <span style={{ color: C.green }} className="flex-shrink-0">❯</span>
                      <span style={{ color: C.text }} className="break-words">{line.text}</span>
                    </div>
                  ) : (
                    <div key={i} className="pl-0">{line.node}</div>
                  )
                )}
                {busy && (
                  <div className="flex gap-1.5 items-center pl-4">
                    {[0, 150, 300].map(d => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: C.indigo, animationDelay: `${d}ms` }} />
                    ))}
                    <span style={{ color: C.dim }} className="text-xs ml-1">thinking…</span>
                  </div>
                )}
              </div>
            </div>

            {/* Input line */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
            >
              <span style={{ color: C.green }} className="font-mono flex-shrink-0">❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={busy}
                spellCheck={false}
                autoComplete="off"
                placeholder={busy ? '' : 'type a command or a question…'}
                className="flex-1 bg-transparent outline-none text-[13px] font-mono"
                style={{ color: C.text, caretColor: C.indigo }}
                aria-label="Terminal input"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
