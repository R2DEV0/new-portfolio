import { notFound } from 'next/navigation'
import { getBlogPost, getAllBlogPosts } from '@/data/blog'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm font-semibold bg-white/20 rounded-full">
              {post.category}
            </span>
            {post.icon && <span className="text-2xl">{post.icon}</span>}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="mb-8 space-y-6">
            {post.images.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800"
              >
                {/* Using img tag for now - replace with Next Image when images are added */}
                <img
                  src={image}
                  alt={`${post.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div
            className="blog-content text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content
                .split('\n')
                .map((line, index, array) => {
                  const trimmed = line.trim()
                  
                  // Convert markdown-style headers to HTML
                  if (trimmed.startsWith('# ')) {
                    return `<h1 class="text-4xl font-bold mb-6 mt-8 text-gray-900 dark:text-gray-100">${trimmed.substring(2)}</h1>`
                  }
                  if (trimmed.startsWith('## ')) {
                    return `<h2 class="text-3xl font-bold mb-4 mt-6 text-gray-900 dark:text-gray-100">${trimmed.substring(3)}</h2>`
                  }
                  if (trimmed.startsWith('### ')) {
                    return `<h3 class="text-2xl font-semibold mb-3 mt-5 text-gray-900 dark:text-gray-100">${trimmed.substring(4)}</h3>`
                  }
                  
                  // Handle unordered lists
                  if (trimmed.startsWith('- ')) {
                    const isFirstItem = index === 0 || array[index - 1].trim() === '' || !array[index - 1].trim().startsWith('- ')
                    const isLastItem = index === array.length - 1 || array[index + 1].trim() === '' || !array[index + 1].trim().startsWith('- ')
                    let html = ''
                    if (isFirstItem) html += '<ul class="list-disc list-inside mb-4 space-y-2 ml-4">'
                    html += `<li>${trimmed.substring(2)}</li>`
                    if (isLastItem) html += '</ul>'
                    return html
                  }
                  
                  // Handle bold text (inline)
                  if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
                    return `<p class="font-semibold text-gray-900 dark:text-gray-100 mb-4">${trimmed.substring(2, trimmed.length - 2)}</p>`
                  }
                  
                  if (trimmed === '') {
                    return '<br />'
                  }
                  
                  // Convert markdown links
                  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
                  let processedLine = trimmed.replace(linkRegex, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
                  
                  // Handle inline bold
                  processedLine = processedLine.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>')
                  
                  return `<p class="mb-4">${processedLine}</p>`
                })
                .join(''),
            }}
          />
        </div>

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </article>
      </main>
    </ThemeProvider>
  )
}

