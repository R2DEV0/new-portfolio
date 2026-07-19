export interface Skill {
  name: string
  level: number // 0-100
  category: 'frontend' | 'backend' | 'cloud' | 'ai' | 'apis' | 'leadership'
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 98, category: 'frontend' },
  { name: 'Next.js', level: 95, category: 'frontend' },
  { name: 'JavaScript / TypeScript', level: 98, category: 'frontend' },
  { name: 'HTML / CSS', level: 100, category: 'frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend' },
  { name: 'Bootstrap', level: 92, category: 'frontend' },
  { name: 'Framer Motion', level: 85, category: 'frontend' },
  { name: 'Android (React)', level: 78, category: 'frontend' },

  // Backend
  { name: 'Node.js', level: 95, category: 'backend' },
  { name: 'Express.js', level: 92, category: 'backend' },
  { name: 'MongoDB', level: 88, category: 'backend' },
  { name: 'SQL / SQL Server', level: 85, category: 'backend' },
  { name: 'C#', level: 88, category: 'backend' },
  { name: 'ASP.NET Core', level: 87, category: 'backend' },
  { name: 'PHP', level: 82, category: 'backend' },
  { name: 'Python', level: 78, category: 'backend' },
  { name: 'WordPress', level: 90, category: 'backend' },
  { name: 'REST & GraphQL', level: 92, category: 'backend' },

  // Cloud & DevOps
  { name: 'AWS (EC2 / S3 / Lambda)', level: 90, category: 'cloud' },
  { name: 'Route 53', level: 85, category: 'cloud' },
  { name: 'CloudFront', level: 85, category: 'cloud' },
  { name: 'Cloudflare DNS', level: 88, category: 'cloud' },
  { name: 'CI/CD (GitHub Actions)', level: 88, category: 'cloud' },
  { name: 'Netlify', level: 90, category: 'cloud' },
  { name: 'Vercel', level: 88, category: 'cloud' },
  { name: 'Docker', level: 80, category: 'cloud' },
  { name: 'Nginx', level: 80, category: 'cloud' },
  { name: 'SSL / TLS & DNS', level: 88, category: 'cloud' },

  // AI-Augmented Development
  { name: 'Claude Code', level: 98, category: 'ai' },
  { name: 'Claude Cowork', level: 95, category: 'ai' },
  { name: 'Cursor', level: 96, category: 'ai' },
  { name: 'ChatGPT', level: 95, category: 'ai' },
  { name: 'Replit', level: 88, category: 'ai' },
  { name: 'Prompt Engineering', level: 95, category: 'ai' },
  { name: 'AI Workflow Design', level: 92, category: 'ai' },

  // APIs & Integrations
  { name: 'Stripe', level: 95, category: 'apis' },
  { name: 'Square', level: 93, category: 'apis' },
  { name: 'HubSpot', level: 90, category: 'apis' },
  { name: 'Strapi', level: 88, category: 'apis' },
  { name: 'Twilio / SMS', level: 90, category: 'apis' },
  { name: 'SendGrid', level: 88, category: 'apis' },
  { name: 'Payment Hardware / Kiosks', level: 88, category: 'apis' },

  // Leadership
  { name: 'Technical Leadership', level: 92, category: 'leadership' },
  { name: 'Mentorship', level: 88, category: 'leadership' },
  { name: 'Agile / Scrum', level: 90, category: 'leadership' },
  { name: 'Stakeholder Communication', level: 92, category: 'leadership' },
  { name: 'Architecture & Planning', level: 90, category: 'leadership' },
  { name: 'Code Reviews', level: 92, category: 'leadership' },
]

export const skillCategories = {
  frontend: 'Frontend',
  backend: 'Backend',
  cloud: 'Cloud & DevOps',
  ai: 'AI-Augmented Dev',
  apis: 'APIs & Integrations',
  leadership: 'Leadership',
}
