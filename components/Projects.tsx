'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { ExternalLink, Code, Github } from 'lucide-react'

export function Projects() {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {project.title}
                      </h3>
                    </div>
                    {project.company && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                        {project.company}
                      </p>
                    )}
                    {project.period && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {project.period}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        aria-label="View GitHub repository"
                        title="View on GitHub"
                      >
                        <Github className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        aria-label="View project"
                        title="View live project"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Key Highlights:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    {project.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

