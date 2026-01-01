// Swiss Standard Resume Data Interface
// Compliant with Swiss immigration and job market requirements

export type SwissPermitType = 
  | 'Citizen' 
  | 'Permit C' 
  | 'Permit B' 
  | 'Permit L' 
  | 'Permit G' 
  | 'Non-EU'

export type LanguageProficiency = 
  | 'Native' 
  | 'Fluent' 
  | 'Advanced' 
  | 'Intermediate' 
  | 'Basic'

export type MaritalStatus = 
  | 'Single' 
  | 'Married' 
  | 'Divorced' 
  | 'Widowed' 
  | 'Partnership'

export interface PersonalInfo {
  // Basic Information
  firstName: string
  lastName: string
  title?: string // e.g., "Software Engineer", "Marketing Manager"
  
  // Contact Information
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  
  // Swiss-Specific Fields (Mandatory for Swiss CVs)
  dateOfBirth: string // Format: YYYY-MM-DD
  nationality: string
  maritalStatus?: MaritalStatus
  permitType: SwissPermitType
  
  // Professional Photo (Required in Switzerland)
  photoUrl?: string
  
  // Additional Links
  linkedinUrl?: string
  websiteUrl?: string
  githubUrl?: string
}

export interface WorkExperience {
  id: string
  jobTitle: string
  company: string
  location: string // City, Country
  startDate: string // Format: YYYY-MM
  endDate?: string // Format: YYYY-MM or "Present"
  isCurrent: boolean
  description: string[] // Bullet points
}

export interface Education {
  id: string
  degree: string // e.g., "Bachelor of Science in Computer Science"
  institution: string
  location: string // City, Country
  startDate: string // Format: YYYY-MM
  endDate?: string // Format: YYYY-MM
  gpa?: string // Optional, format: "5.4/6.0" (Swiss system)
  honors?: string[]
}

export interface Skill {
  id: string
  name: string
  category: 'technical' | 'soft' | 'language' | 'other'
  proficiency?: LanguageProficiency // For languages
}

export interface Language {
  id: string
  name: string // e.g., "German", "French", "Italian", "English"
  proficiency: LanguageProficiency
  certificate?: string // e.g., "Goethe-Zertifikat C1"
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string // Format: YYYY-MM
  expiryDate?: string // Format: YYYY-MM
  credentialId?: string
}

export interface Reference {
  id: string
  name: string
  title: string
  company: string
  email?: string
  phone?: string
  relationship: string // e.g., "Former Manager", "Colleague"
}

export interface ResumeData {
  // Core Information
  personalInfo: PersonalInfo
  
  // Professional Summary (Optional but recommended)
  professionalSummary?: string
  
  // Main Sections
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  certifications: Certification[]
  references?: Reference[]
  
  // Additional Information (Optional)
  additionalInfo?: string // For interests, volunteer work, etc.
  
  // Metadata
  templateId: string // Which template is being used
  createdAt: string
  updatedAt: string
}

// Template Metadata Interface
export interface TemplateMetadata {
  id: string
  name: string
  description: string
  thumbnailUrl: string
  componentKey: string // Maps to the React component
  category: 'classic' | 'modern' | 'creative' | 'technical'
  isPremium?: boolean
}

// Default empty resume data
export const createEmptyResume = (): ResumeData => ({
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Switzerland',
    dateOfBirth: '',
    nationality: '',
    permitType: 'Non-EU',
  },
  workExperience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  references: [],
  templateId: 'swiss-classic',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})



