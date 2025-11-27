'use client'

import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2">
            About Me
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
              I'm a Senior Full-Stack Developer with a passion for creating innovative digital experiences 
              and scalable solutions. Currently working remotely at <strong>AREA15</strong> in Las Vegas, I've been 
              at the forefront of managing, enhancing, and constructing diverse projects for entertainment 
              and sales-focused applications.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
              My expertise spans the full development stack, from designing Android kiosks that serve 
              thousands of customers daily, to building immersive games with MERN stack and AI, to crafting 
              custom WordPress plugins. I'm particularly skilled in integrating custom APIs (Stripe, Square, 
              HubSpot, Strapi) and leveraging CI/CD pipelines for efficient deployment.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
              With experience at <strong>Strategy9</strong> and <strong>J Taylor Education</strong>, I've 
              developed solutions that have reduced operational time by 40%, improved platform speed by 25%, 
              and maintained 99.9% uptime. I'm AWS certified and hold dual degrees in Computer Science and 
              Business Administration from City University of Seattle.
            </p>
            
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact</h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Phone:</strong> (206) 519-4870</p>
                <p><strong>Resume:</strong> <a href="https://kevtech.net/KevinChanceyResume.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Download PDF</a></p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

