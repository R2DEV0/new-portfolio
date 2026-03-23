'use client'

import { motion } from 'framer-motion'
import { getAllBlogPosts } from '@/data/blog'
import { Calendar, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ScrambleText } from './ScrambleText'

const categoryColors: Record<string, { color: string; bg: string; border: string }> = {
  Electronics: { color: '#22d3ee', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.2)' },
  Leadership:  { color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
  Career:      { color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
}

const defaultCat = { color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)' }

export function Blog() {
  const posts = getAllBlogPosts()

  return (
    <section id="blog" className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(9,9,33,0.5) 50%, transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3"><ScrambleText text="Writing" /></p>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text pb-2">Blog</h2>
          <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Thoughts on tech, leadership, and the builder mindset
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, index) => {
            const cat = categoryColors[post.category] || defaultCat

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="group flex flex-col h-full rounded-2xl overflow-hidden glow-card transition-all duration-300"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = cat.border
                    el.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--border)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Image / gradient header */}
                  <div
                    className="h-44 overflow-hidden flex-shrink-0 relative"
                    style={{
                      background: post.image
                        ? undefined
                        : `linear-gradient(135deg, ${cat.bg.replace('0.08', '0.3')}, ${cat.bg})`,
                    }}
                  >
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl">{post.icon || '📝'}</span>
                      </div>
                    )}
                    {/* Bottom fade */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1"
                      style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-5">
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 w-fit"
                      style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}
                    >
                      {post.category}
                    </span>

                    <h3
                      className="text-base font-semibold mb-2 leading-snug transition-colors duration-200 group-hover:text-indigo-400"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {post.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-4 flex-grow line-clamp-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                      </div>
                      <ArrowRight
                        className="w-4 h-4 transition-all duration-200 group-hover:translate-x-1"
                        style={{ color: cat.color }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
