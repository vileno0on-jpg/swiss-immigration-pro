import { CVData, ATSIssue } from '@/types/cv'

// Common ATS keywords by industry
const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  tech: [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker',
    'Kubernetes', 'CI/CD', 'Agile', 'Scrum', 'Microservices', 'REST API', 'GraphQL',
    'Machine Learning', 'AI', 'Cloud Computing', 'DevOps', 'Git', 'SQL', 'NoSQL'
  ],
  finance: [
    'Financial Analysis', 'Risk Management', 'Portfolio Management', 'CFA', 'FRM',
    'Excel', 'Bloomberg', 'VBA', 'SQL', 'Financial Modeling', 'Valuation',
    'Compliance', 'Regulatory', 'Basel III', 'IFRS', 'GAAP'
  ],
  healthcare: [
    'Patient Care', 'Clinical Trials', 'HIPAA', 'EMR', 'EHR', 'Medical Coding',
    'FDA', 'Regulatory Compliance', 'Quality Assurance', 'Research', 'Evidence-Based'
  ],
  engineering: [
    'CAD', 'AutoCAD', 'SolidWorks', 'Project Management', 'Lean Manufacturing',
    'Six Sigma', 'Quality Control', 'ISO', 'Risk Assessment', 'Technical Design'
  ]
}

// ATS-friendly action verbs
const ACTION_VERBS = [
  'Achieved', 'Implemented', 'Developed', 'Managed', 'Led', 'Created', 'Designed',
  'Improved', 'Increased', 'Reduced', 'Optimized', 'Streamlined', 'Collaborated',
  'Delivered', 'Executed', 'Launched', 'Established', 'Maintained', 'Analyzed',
  'Resolved', 'Trained', 'Mentored', 'Coordinated', 'Organized', 'Supervised'
]

export function analyzeATS(cvData: CVData): { score: number; issues: ATSIssue[] } {
  const issues: ATSIssue[] = []
  let score = 100

  // Check personal info completeness
  if (!cvData.personalInfo.email || !cvData.personalInfo.email.includes('@')) {
    issues.push({
      type: 'missing',
      severity: 'error',
      message: 'Valid email address is required',
      field: 'email',
      suggestion: 'Add a professional email address'
    })
    score -= 10
  }

  if (!cvData.personalInfo.phone) {
    issues.push({
      type: 'missing',
      severity: 'error',
      message: 'Phone number is required',
      field: 'phone',
      suggestion: 'Add your contact phone number'
    })
    score -= 5
  }

  // Check summary
  if (!cvData.summary || cvData.summary.length < 50) {
    issues.push({
      type: 'missing',
      severity: 'warning',
      message: 'Professional summary is too short',
      field: 'summary',
      suggestion: 'Add a 2-3 sentence professional summary highlighting your key qualifications'
    })
    score -= 5
  }

  // Check experience
  if (cvData.experience.length === 0) {
    issues.push({
      type: 'missing',
      severity: 'error',
      message: 'Work experience is required',
      field: 'experience',
      suggestion: 'Add at least one work experience entry'
    })
    score -= 15
  } else {
    cvData.experience.forEach((exp, idx) => {
      if (!exp.description || exp.description.length === 0) {
        issues.push({
          type: 'missing',
          severity: 'warning',
          message: `Experience ${idx + 1} is missing description`,
          field: `experience.${idx}.description`,
          suggestion: 'Add bullet points describing your responsibilities and achievements'
        })
        score -= 3
      }

      // Check for action verbs
      const hasActionVerbs = exp.description.some(desc =>
        ACTION_VERBS.some(verb => desc.toLowerCase().startsWith(verb.toLowerCase()))
      )
      if (!hasActionVerbs) {
        issues.push({
          type: 'format',
          severity: 'warning',
          message: `Experience ${idx + 1} should start with action verbs`,
          field: `experience.${idx}.description`,
          suggestion: 'Start bullet points with action verbs like "Achieved", "Implemented", "Developed"'
        })
        score -= 2
      }

      // Check for quantifiable achievements
      const hasNumbers = exp.description.some(desc => /\d/.test(desc))
      if (!hasNumbers) {
        issues.push({
          type: 'format',
          severity: 'info',
          message: `Experience ${idx + 1} could benefit from quantifiable metrics`,
          field: `experience.${idx}.description`,
          suggestion: 'Add numbers, percentages, or metrics to show impact (e.g., "Increased sales by 25%")'
        })
        score -= 1
      }
    })
  }

  // Check education
  if (cvData.education.length === 0) {
    issues.push({
      type: 'missing',
      severity: 'warning',
      message: 'Education section is missing',
      field: 'education',
      suggestion: 'Add your educational background'
    })
    score -= 5
  }

  // Check skills
  if (cvData.skills.length === 0) {
    issues.push({
      type: 'missing',
      severity: 'warning',
      message: 'Skills section is missing',
      field: 'skills',
      suggestion: 'Add relevant technical and soft skills'
    })
    score -= 5
  }

  // Check for keywords (basic check)
  const allText = [
    cvData.summary,
    ...cvData.experience.flatMap(e => [...e.description, ...e.achievements]),
    ...cvData.skills.map(s => s.name)
  ].join(' ').toLowerCase()

  // Check for common formatting issues
  if (allText.includes('i ') || allText.includes(' i ')) {
    issues.push({
      type: 'format',
      severity: 'warning',
      message: 'Avoid using first person (I, me, my)',
      field: 'general',
      suggestion: 'Use third person or omit pronouns (e.g., "Developed" instead of "I developed")'
    })
    score -= 3
  }

  // Check length
  const totalLength = JSON.stringify(cvData).length
  if (totalLength < 2000) {
    issues.push({
      type: 'structure',
      severity: 'warning',
      message: 'CV appears too short',
      field: 'general',
      suggestion: 'Add more detail to experience, skills, and achievements'
    })
    score -= 5
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score)

  return { score, issues }
}

export function suggestKeywords(industry: string): string[] {
  return INDUSTRY_KEYWORDS[industry.toLowerCase()] || []
}

export function optimizeForATS(cvData: CVData, industry?: string): CVData {
  const optimized = { ...cvData }

  // Add suggested keywords if industry is specified
  if (industry) {
    const keywords = suggestKeywords(industry)
    const existingSkills = new Set(cvData.skills.map(s => s.name.toLowerCase()))
    
    keywords.forEach(keyword => {
      if (!existingSkills.has(keyword.toLowerCase())) {
        optimized.skills.push({
          id: `suggested-${Date.now()}-${Math.random()}`,
          name: keyword,
          category: 'technical'
        })
      }
    })
  }

  // Ensure all experience descriptions start with action verbs
  optimized.experience = optimized.experience.map(exp => ({
    ...exp,
    description: exp.description.map(desc => {
      // If doesn't start with action verb, suggest one
      const startsWithVerb = ACTION_VERBS.some(verb =>
        desc.toLowerCase().trim().startsWith(verb.toLowerCase())
      )
      if (!startsWithVerb && desc.trim().length > 0) {
        // Don't auto-modify, just return as is
        return desc
      }
      return desc
    })
  }))

  return optimized
}

export function validateCVData(cvData: Partial<CVData>): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!cvData.personalInfo?.firstName || !cvData.personalInfo?.lastName) {
    errors.push('First name and last name are required')
  }

  if (!cvData.personalInfo?.email || !cvData.personalInfo.email.includes('@')) {
    errors.push('Valid email address is required')
  }

  if (!cvData.templateId) {
    errors.push('Template selection is required')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}





