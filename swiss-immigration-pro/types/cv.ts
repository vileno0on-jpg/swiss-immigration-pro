export interface CVData {
  id?: string
  name: string
  templateId: string
  personalInfo: PersonalInfo
  summary: string
  experience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  certifications: Certification[]
  projects: Project[]
  customSections: CustomSection[]
  metadata: {
    createdAt?: string
    updatedAt?: string
    atsScore?: number
    atsIssues?: ATSIssue[]
  }
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  linkedin?: string
  website?: string
  github?: string
  photo?: string
}

export interface WorkExperience {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string[]
  achievements: string[]
  keywords: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string | null
  gpa?: string
  honors?: string[]
  coursework?: string[]
}

export interface Skill {
  id: string
  name: string
  category: 'technical' | 'soft' | 'language' | 'other'
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsOfExperience?: number
}

export interface Language {
  id: string
  name: string
  proficiency: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'native'
  certification?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  startDate?: string
  endDate?: string
}

export interface CustomSection {
  id: string
  title: string
  content: string[]
}

export interface ATSIssue {
  type: 'missing' | 'format' | 'keyword' | 'structure' | 'warning'
  severity: 'error' | 'warning' | 'info'
  message: string
  field?: string
  suggestion?: string
}

export interface CVTemplate {
  id: string
  name: string
  category: string
  description: string
  preview: string
  isPremium: boolean
  config: TemplateConfig
}

export interface TemplateConfig {
  layout: 'modern' | 'classic' | 'creative' | 'minimal'
  colorScheme: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  typography: {
    headingFont: string
    bodyFont: string
    fontSize: 'small' | 'medium' | 'large'
  }
  sections: {
    showPhoto: boolean
    showSummary: boolean
    showSkills: boolean
    showLanguages: boolean
    showCertifications: boolean
    showProjects: boolean
    customSections: boolean
  }
}





