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
    degree: 'Associate AWS Certified Developer',
    location: 'Remote',
    certification: true,
    description: 'Certified in designing, developing, and deploying cloud-based applications using AWS services.',
  },
  {
    institution: 'City University of Seattle',
    degree: 'BS Computer Science',
    location: 'Seattle, WA',
    description: 'Comprehensive study of computer science fundamentals, software engineering, and modern development practices.',
  },
  {
    institution: 'City University of Seattle',
    degree: 'BS Business Administration',
    location: 'Seattle, WA',
    description: 'Business management and administration with focus on technology integration and strategic planning.',
  },
]

