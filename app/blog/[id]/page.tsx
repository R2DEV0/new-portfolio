import { notFound } from 'next/navigation'
import { getBlogPost, getAllBlogPosts } from '@/data/blog'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id)
  if (!post) return { title: 'Post not found | Kevin Chancey' }
  return {
    title: `${post.title} | Kevin Chancey`,
    description: post.excerpt,
  }
}

function renderMarkdown(content: string): string {
  const lines = content.split('\n')
  let html = ''
  let inList = false

  const inline = (text: string): string => {
    text = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" style="color:#818cf8" class="hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    text = text.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong style="color:var(--text-primary)" class="font-semibold">$1</strong>'
    )
    return text
  }

  let skippedTitle = false

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()

    if (trimmed.startsWith('# ')) {
      // The page header already shows the title — skip the first H1 in the body
      if (!skippedTitle) { skippedTitle = true; continue }
      if (inList) { html += '</ul>'; inList = false }
      html += `<h2 class="text-2xl font-bold mb-4 mt-8" style="color:var(--text-primary)">${inline(trimmed.substring(2))}</h2>`
      continue
    }
    if (trimmed.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<h2 class="text-2xl font-bold mb-4 mt-8" style="color:var(--text-primary)">${inline(trimmed.substring(3))}</h2>`
      continue
    }
    if (trimmed.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<h3 class="text-xl font-semibold mb-3 mt-6" style="color:var(--text-primary)">${inline(trimmed.substring(4))}</h3>`
      continue
    }
    if (trimmed.startsWith('- ')) {
      if (!inList) { html += '<ul class="list-disc pl-6 mb-4 space-y-1.5">'; inList = true }
      html += `<li>${inline(trimmed.substring(2))}</li>`
      continue
    }
    if (trimmed === '') {
      if (inList) { html += '</ul>'; inList = false }
      continue
    }
    if (inList) { html += '</ul>'; inList = false }

    if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
      html += `<p class="font-semibold mb-3 mt-2" style="color:var(--text-primary)">${inline(trimmed.substring(2, trimmed.length - 2))}</p>`
    } else {
      html += `<p class="mb-4 leading-relaxed">${inline(trimmed)}</p>`
    }
  }
  if (inList) html += '</ul>'
  return html
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id)
  if (!post) notFound()

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <ScrollProgress />
      <Navbar />

      {/* Header */}
      <div className="relative overflow-hidden pt-32 pb-14 px-4 sm:px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.12), transparent 60%)' }}
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full"
              style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              {post.category}
            </span>
            {post.icon && <span className="text-2xl">{post.icon}</span>}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        {post.images && post.images.length > 0 && (
          <div className="mb-10 space-y-6">
            {post.images.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--border)' }}
              >
                <img src={image} alt={`${post.title} — ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        <div
          className="text-base"
          style={{ color: 'var(--text-secondary)' }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        <div className="mt-14 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: '#818cf8' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </article>
    </main>
  )
}
