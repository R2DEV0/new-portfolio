export interface Project {
  title: string
  description: string
  technologies: string[]
  highlights: string[]
  period?: string
  link?: string
  github?: string
  company?: string
}

export const projects: Project[] = [
  {
    title: 'Android Stripe Ticketing Kiosks',
    company: 'AREA15',
    period: '2023 - Present',
    description: 'Designed and implemented Android-based ticketing kiosks integrated with Stripe payment processing, serving over 8,500 customers daily.',
    technologies: ['Android', 'React', 'Stripe API', 'Node.js', 'Express.js'],
    highlights: [
      '15% increase in ticket sales',
      'Enhanced user experience for high-volume traffic',
      'Seamless payment processing integration'
    ],
  },
  {
    title: 'Immersive Games with MERN & AI',
    company: 'AREA15',
    period: '2023 - Present',
    github: 'https://github.com/R2DEV0/area15_origin_quest',
    description: 'Developed engaging interactive games using MERN stack (MongoDB, Express.js, React, Next.js) with AI integration for captivating digital experiences.',
    technologies: ['MongoDB', 'Express.js', 'React', 'Next.js', 'AI Integration', 'Node.js'],
    highlights: [
      'Interactive and engaging user experiences',
      'AI-powered game mechanics',
      'Scalable MERN architecture'
    ],
  },
  {
    title: 'SMS-Based Valet Management System',
    company: 'Strategy9',
    period: '2021 - 2024',
    description: 'Created an advanced SMS-based valet system with queue management, reducing valet management time by 40%.',
    technologies: ['C#', 'ASP.NET Core', 'SMS API', 'SQL Server'],
    highlights: [
      '40% reduction in valet management time',
      'Advanced queue management system',
      'Real-time SMS notifications'
    ],
  },
  {
    title: 'Multi-Location Food Ordering Kiosk',
    company: 'AREA15',
    period: '2023 - Present',
    description: 'Built a comprehensive food ordering kiosk system utilizing Square ordering and payment system on Android/React platform.',
    technologies: ['Android', 'React', 'Square API', 'Node.js'],
    highlights: [
      'Multi-location support',
      'Integrated payment processing',
      'User-friendly interface'
    ],
  },
  {
    title: 'Virtual Education Platform',
    company: 'J Taylor Education',
    period: '2019 - 2024',
    github: 'https://github.com/R2DEV0/Depth-Complexity-Plugin',
    description: 'Led development of a robust virtual education platform with 99.9% uptime, improving platform speed by 25% using MERN stack.',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'AWS', 'PHP', 'WordPress'],
    highlights: [
      '99.9% uptime achievement',
      '25% improvement in platform speed',
      'Scalable infrastructure on AWS'
    ],
  },
  {
    title: 'Chrome Extension',
    company: 'J Taylor Education',
    period: '2019 - 2024',
    github: 'https://github.com/R2DEV0/Depth_Complexity_Chrome_Extension',
    description: 'Developed a free Chrome extension that increased site traffic, currently with over 50,000 downloads.',
    technologies: ['JavaScript', 'Chrome Extension API', 'HTML/CSS'],
    highlights: [
      '50,000+ downloads',
      'Significant traffic increase',
      'User-friendly design'
    ],
  },
  {
    title: 'Email & SMS Marketing Platform',
    company: 'Strategy9',
    period: '2021 - 2024',
    description: 'Built comprehensive email and SMS marketing system for casino industry, handling 800,000+ monthly emails with compliance standards.',
    technologies: ['C#', 'ASP.NET Core', 'Email API', 'SMS API', 'SQL Server'],
    highlights: [
      '800,000+ monthly emails processed',
      'Compliance standards maintained',
      'Engaging contests and promotions'
    ],
  },
  {
    title: 'Custom WordPress Plugins',
    company: 'AREA15',
    period: '2023 - Present',
    description: 'Crafted custom WordPress plugins with PHP and React, improving platform functionality and user interface.',
    technologies: ['PHP', 'React', 'WordPress', 'JavaScript'],
    highlights: [
      'Enhanced platform functionality',
      'Improved user interface',
      'Seamless WordPress integration'
    ],
  },
  {
    title: 'Locker Rental System',
    company: 'AREA15',
    period: '2023 - Present',
    github: 'https://github.com/R2DEV0/lockers',
    description: 'Developed a comprehensive locker rental system for venue management, enabling seamless customer self-service and automated locker assignments.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Payment API'],
    highlights: [
      'Streamlined customer experience',
      'Automated locker management',
      'Integrated payment processing'
    ],
  },
  {
    title: 'Restabilizer Experience',
    company: 'AREA15',
    period: '2023 - Present',
    github: 'https://github.com/R2DEV0/destabilizer',
    description: 'Created an immersive interactive experience using cutting-edge technology to deliver engaging and memorable visitor interactions.',
    technologies: ['React', 'Next.js', 'MERN Stack', 'Interactive Media', 'Node.js'],
    highlights: [
      'Immersive user experience',
      'Interactive technology integration',
      'Engaging visitor interactions'
    ],
  },
]

