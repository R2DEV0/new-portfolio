export interface Skill {
  name: string
  level: number // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'cloud' | 'management' | 'other'
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 98, category: 'frontend' },
  { name: 'Next.js', level: 95, category: 'frontend' },
  { name: 'JavaScript/TypeScript', level: 98, category: 'frontend' },
  { name: 'HTML/CSS', level: 100, category: 'frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend' },
  { name: 'Bootstrap CSS', level: 98, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 95, category: 'backend' },
  { name: 'Express.js', level: 90, category: 'backend' },
  { name: 'MongoDB', level: 85, category: 'backend' },
  { name: 'SQL', level: 80, category: 'backend' },
  { name: 'C#', level: 85, category: 'backend' },
  { name: 'ASP.NET Core', level: 85, category: 'backend' },
  { name: 'PHP', level: 80, category: 'backend' },
  { name: 'Python', level: 75, category: 'backend' },
  
  // Tools & Platforms
  { name: 'WordPress', level: 90, category: 'tools' },
  { name: 'Git/GitHub', level: 90, category: 'tools' },
  { name: 'CI/CD', level: 85, category: 'tools' },
  { name: 'Stripe API', level: 90, category: 'tools' },
  { name: 'Square API', level: 85, category: 'tools' },
  { name: 'HubSpot API', level: 100, category: 'tools' },
  
  // Cloud
  { name: 'AWS', level: 90, category: 'cloud' },
  { name: 'Netlify', level: 85, category: 'cloud' },
  { name: 'Azure', level: 70, category: 'cloud' },
  { name: 'Docker', level: 80, category: 'cloud' },
  
  // Management
  { name: 'Project Management', level: 95, category: 'management' },
  { name: 'Team Management', level: 90, category: 'management' },
  { name: 'Leadership', level: 90, category: 'management' },
  { name: 'Communication', level: 100, category: 'management' },
  { name: 'Problem Solving', level: 90, category: 'management' },
  { name: 'Decision Making', level: 95, category: 'management' },

  // Other
  { name: 'AI Integration', level: 75, category: 'other' },
  { name: 'Android Development', level: 70, category: 'other' },
  { name: 'Serverless Architecture', level: 75, category: 'other' },
  { name: 'Physical Checkout Readers', level: 80, category: 'other' },
  { name: 'Touch Screen Kiosks ', level: 95, category: 'other' },
]

export const skillCategories = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & APIs',
  cloud: 'Cloud & Hosting',
  management: 'Management',
  other: 'Other',
}

