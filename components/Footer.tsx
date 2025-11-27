'use client'

import { Github, Linkedin, FileText, Instagram, Facebook } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Kevin R. Chancey</h3>
            <p className="text-gray-400">
              Senior Full-Stack Developer passionate about creating innovative digital experiences.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
              </li>
              <li>
                <a href="#education" className="hover:text-blue-400 transition-colors">Education</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
              </li>
              <li>
                <a href="#blog" className="hover:text-blue-400 transition-colors">Blog</a>
              </li>
              <li>
                <a href="/KevinChanceyResume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Resume
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Connect</h3>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://www.linkedin.com/in/kevin-chancey"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.github.com/R2DEV0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/kevchancey/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/kevinr.chancey"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="/KevinChanceyResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Resume"
              >
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Kevin R. Chancey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

