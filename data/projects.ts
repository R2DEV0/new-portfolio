export interface Project {
  title: string
  description: string
  technologies: string[]
  highlights: string[]
  metrics?: { value: string; label: string }[]
  period?: string
  link?: string
  github?: string
  company?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'Android Stripe Ticketing Kiosks',
    company: 'AREA15',
    period: '2023 - Present',
    featured: true,
    description:
      'Designed and deployed self-service Android ticketing kiosks with Stripe payment processing, handling high-volume traffic across the venue floor every single day.',
    technologies: ['Android', 'React', 'Stripe API', 'Node.js', 'Express.js', 'Claude Code', 'Cursor'],
    metrics: [
      { value: '8,500+', label: 'customers / day' },
      { value: '+15%', label: 'ticket sales' },
    ],
    highlights: [
      'Serves 8,500+ customers per day with near-zero downtime',
      'Drove a 15% increase in ticket sales after rollout',
      'Hardened Stripe payment flow with retries and graceful failure handling',
      'Built with AI-assisted development (Claude Code, Cursor) for faster iteration',
    ],
  },
  {
    title: 'AWS + Cloudflare Cloud Infrastructure',
    company: 'AREA15',
    period: '2023 - Present',
    featured: true,
    description:
      'Architected and maintain the cloud backbone for 6+ production entertainment and e-commerce sites — AWS compute and storage fronted by Netlify and Cloudflare DNS, with automated zero-downtime releases.',
    technologies: ['AWS EC2', 'AWS S3', 'Route 53', 'Cloudflare DNS', 'Netlify', 'GitHub Actions', 'Nginx', 'SSL/TLS'],
    metrics: [
      { value: '99.9%', label: 'uptime' },
      { value: '6+', label: 'production sites' },
    ],
    highlights: [
      'Maintains 99.9% uptime across 6+ live production sites',
      'CI/CD pipelines (GitHub Actions) enable zero-downtime deploys',
      'Unified Stripe, Square, HubSpot & Strapi APIs across MERN / Next.js apps',
      'DNS, SSL/TLS, and edge caching managed through Cloudflare + Route 53',
    ],
  },
  {
    title: 'Virtual Education Platform',
    company: 'J Taylor Education',
    period: '2019 - 2024',
    featured: true,
    github: 'https://github.com/R2DEV0/Depth-Complexity-Plugin',
    description:
      'Led the AWS cloud infrastructure and MERN-stack development for a virtual learning platform that scaled to serve millions of students through the shift to remote education.',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'AWS EC2', 'S3', 'CloudFront', 'PHP', 'WordPress'],
    metrics: [
      { value: '2M+', label: 'students served' },
      { value: '99.9%', label: 'uptime' },
    ],
    highlights: [
      'Powered learning for 2M+ students with 99.9% uptime',
      '25% faster page loads and 40% better scalability via MERN refactor',
      'AWS architecture (EC2, S3, CloudFront) built to absorb pandemic-era traffic spikes',
      'PHP/WordPress e-learning tools deployed across 45 states and 9 countries',
    ],
  },
  {
    title: 'Depth & Complexity Chrome Extension',
    company: 'J Taylor Education',
    period: '2019 - 2024',
    github: 'https://github.com/R2DEV0/Depth_Complexity_Chrome_Extension',
    description:
      'Built and shipped a free Chrome extension for educators that became a top-of-funnel growth engine, driving organic traffic and brand awareness for the company.',
    technologies: ['JavaScript', 'Chrome Extension API', 'HTML/CSS'],
    metrics: [
      { value: '50,000+', label: 'active installs' },
      { value: '+300%', label: 'organic traffic' },
    ],
    highlights: [
      '50,000+ active downloads and counting',
      'Grew organic traffic by 300%+ as a free acquisition channel',
      'Lightweight, privacy-respecting design with a frictionless install',
    ],
  },
  {
    title: 'Immersive Games with MERN & AI',
    company: 'AREA15',
    period: '2023 - Present',
    github: 'https://github.com/R2DEV0/area15_origin_quest',
    description:
      'Developed interactive, story-driven games and installations on the MERN stack with AI-powered mechanics to create memorable in-venue digital experiences.',
    technologies: ['MongoDB', 'Express.js', 'React', 'Next.js', 'Node.js', 'AI Integration'],
    highlights: [
      'AI-driven game mechanics and dynamic content',
      'Real-time, multiplayer-ready MERN architecture',
      'Designed for high engagement in a walk-up venue setting',
    ],
  },
  {
    title: 'SMS Valet Management Platform',
    company: 'Strategy9',
    period: '2021 - 2024',
    description:
      'Created a real-time, SMS-based valet queue platform with advanced queue management that cut operational overhead for casino valet teams.',
    technologies: ['C#', 'ASP.NET Core', 'Twilio / SMS', 'SQL Server'],
    metrics: [
      { value: '-40%', label: 'management time' },
    ],
    highlights: [
      'Reduced valet management time by 40%',
      'Real-time queue engine with live SMS notifications to guests',
      'Built to stay reliable under peak weekend load',
    ],
  },
  {
    title: 'Email & SMS Marketing Engine',
    company: 'Strategy9',
    period: '2021 - 2024',
    description:
      'Built a compliant, high-volume email and SMS marketing platform serving a portfolio of casino clients, with contests, coupons, and promotions delivered at scale.',
    technologies: ['C#', 'ASP.NET Core', 'SendGrid', 'Twilio / SMS', 'SQL Server'],
    metrics: [
      { value: '800K+', label: 'emails / month' },
      { value: '12+', label: 'casino clients' },
    ],
    highlights: [
      'Orchestrated 800,000+ monthly emails at 99%+ compliance',
      'Maintained brand consistency across 12+ casino clients',
      'Boosted customer engagement 25% via contests, coupons & promotions',
    ],
  },
  {
    title: 'Sportspool Data Applications',
    company: 'Strategy9',
    period: '2021 - 2024',
    description:
      'Developed sports-pool and contest data apps that dramatically increased first-party data capture, enabling targeted, data-driven marketing campaigns.',
    technologies: ['C#', 'ASP.NET Core', 'SQL Server', 'REST APIs'],
    metrics: [
      { value: '3x', label: 'data capture' },
    ],
    highlights: [
      'Tripled user data capture for the marketing team',
      'Turned casual engagement into rich, actionable customer profiles',
      'Fed downstream email/SMS targeting for measurable ROI',
    ],
  },
  {
    title: 'Multi-Location Food Ordering Kiosk',
    company: 'AREA15',
    period: '2023 - Present',
    description:
      'Launched a Square-powered food ordering kiosk on Android/React supporting multiple venue locations, integrated checkout, and physical payment hardware.',
    technologies: ['Android', 'React', 'Square API', 'Node.js', 'Physical Card Readers'],
    highlights: [
      'Multi-location ordering with unified Square checkout',
      'Integrated physical card readers for tap-to-pay',
      'Intuitive touch UI optimized for quick self-service',
    ],
  },
  {
    title: 'Custom WordPress Plugins',
    company: 'AREA15',
    period: '2023 - Present',
    description:
      'Engineered custom WordPress plugins with PHP and React to extend marketing sites, improve editor workflows, and speed up page delivery.',
    technologies: ['PHP', 'React', 'WordPress', 'JavaScript'],
    metrics: [
      { value: '-30%', label: 'page load time' },
    ],
    highlights: [
      'Cut page load times by 30%',
      'React-powered admin experiences on top of WordPress',
      'Reusable, maintainable plugin architecture',
    ],
  },
  {
    title: 'Locker Rental System',
    company: 'AREA15',
    period: '2023 - Present',
    github: 'https://github.com/R2DEV0/lockers',
    description:
      'Built a self-service locker rental system for venue guests with automated assignment, integrated payments, and an operator dashboard.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Payment API'],
    highlights: [
      'End-to-end self-service rental flow',
      'Automated locker assignment and release',
      'Integrated payment processing with receipts',
    ],
  },
  {
    title: 'Destabilizer Interactive Experience',
    company: 'AREA15',
    period: '2023 - Present',
    github: 'https://github.com/R2DEV0/destabilizer',
    description:
      'Created an immersive interactive installation blending web tech and physical space to deliver a memorable, engaging visitor experience.',
    technologies: ['React', 'Next.js', 'Node.js', 'Interactive Media'],
    highlights: [
      'Immersive, physical-meets-digital experience',
      'Real-time interactivity tuned for a live venue',
      'Reliable performance in a public, high-traffic setting',
    ],
  },
]
