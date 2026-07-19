export interface Education {
  institution: string
  degree: string
  location: string
  period?: string
  description?: string
  certification?: boolean
}

export const education: Education[] = [
  {
    institution: 'Amazon Web Services',
    degree: 'AWS Certified Developer – Associate',
    location: 'Remote',
    period: '2024',
    certification: true,
    description:
      'Certified in designing, building, deploying, and debugging cloud applications on AWS — the foundation behind the 99.9%-uptime infrastructure I run in production.',
  },
  {
    institution: 'City University of Seattle',
    degree: 'B.S. Computer Science',
    location: 'Seattle, WA',
    period: '2021',
    description:
      'Software engineering, data structures, algorithms, and systems design — the core toolkit I apply to full-stack architecture every day.',
  },
  {
    institution: 'City University of Seattle',
    degree: 'B.S. Business Administration',
    location: 'Seattle, WA',
    period: '2017',
    description:
      'Business strategy and management that lets me translate technical work into measurable business outcomes and speak fluently with stakeholders.',
  },
]
