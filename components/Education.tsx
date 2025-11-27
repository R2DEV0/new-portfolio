'use client'

import { motion } from 'framer-motion'
import { education } from '@/data/education'
import { GraduationCap, Award } from 'lucide-react'

export function Education() {
  return (
    <section id="education" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2">
            Education & Certifications
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={`${edu.institution}-${edu.degree}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    {edu.certification ? (
                      <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {edu.location}
                    </p>
                    {edu.description && (
                      <p className="text-gray-700 dark:text-gray-300 mt-3">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

