// Preselection options for the chatbot

export interface PreselectionCategory {
  id: string
  title: string
  icon: string
  options: PreselectionOption[]
}

export interface PreselectionOption {
  id: string
  label: string
  query: string
  category: string
}

export const PRESELECTION_CATEGORIES: PreselectionCategory[] = [
  {
    id: 'visas',
    title: 'Visa & Permits',
    icon: '📋',
    options: [
      { id: 'l-permit', label: 'L Permit (Short-term)', query: 'What is an L permit and how do I apply?', category: 'visas' },
      { id: 'b-permit', label: 'B Permit (Residence)', query: 'How do I apply for a B permit in Switzerland?', category: 'visas' },
      { id: 'c-permit', label: 'C Permit (Permanent)', query: 'What is a C permit and how do I get it?', category: 'visas' },
      { id: 'g-permit', label: 'G Permit (Cross-border)', query: 'What is a G permit for cross-border workers?', category: 'visas' },
      { id: 'quota', label: 'Quota Information', query: 'What are the current quotas for work permits?', category: 'visas' },
    ],
  },
  {
    id: 'application',
    title: 'Application Process',
    icon: '📝',
    options: [
      { id: 'how-to-apply', label: 'How to Apply', query: 'What is the step-by-step process to apply for a Swiss work permit?', category: 'application' },
      { id: 'documents', label: 'Required Documents', query: 'What documents do I need for a work permit application?', category: 'application' },
      { id: 'timeline', label: 'Processing Time', query: 'How long does it take to get a work permit approved?', category: 'application' },
      { id: 'rejection', label: 'Common Rejections', query: 'What are the most common reasons for permit rejection?', category: 'application' },
      { id: 'salary', label: 'Salary Requirements', query: 'What are the minimum salary requirements for work permits?', category: 'application' },
    ],
  },
  {
    id: 'citizenship',
    title: 'Citizenship',
    icon: '🇨🇭',
    options: [
      { id: 'citizenship-path', label: 'Citizenship Pathways', query: 'How do I become a Swiss citizen?', category: 'citizenship' },
      { id: 'naturalization', label: 'Naturalization Process', query: 'What is the naturalization process for Swiss citizenship?', category: 'citizenship' },
      { id: 'language-req', label: 'Language Requirements', query: 'What language level do I need for citizenship?', category: 'citizenship' },
      { id: 'integration', label: 'Integration Test', query: 'What is the integration test for citizenship?', category: 'citizenship' },
      { id: 'spouse-citizenship', label: 'Spouse of Swiss Citizen', query: 'How can I get citizenship as a spouse of a Swiss citizen?', category: 'citizenship' },
    ],
  },
  {
    id: 'living',
    title: 'Living in Switzerland',
    icon: '🏠',
    options: [
      { id: 'cost-living', label: 'Cost of Living', query: 'What is the cost of living in Switzerland?', category: 'living' },
      { id: 'health-insurance', label: 'Health Insurance', query: 'What health insurance do I need in Switzerland?', category: 'living' },
      { id: 'family-reunion', label: 'Family Reunification', query: 'How can I bring my family to Switzerland?', category: 'living' },
      { id: 'cantons', label: 'Cantons Information', query: 'What are the differences between Swiss cantons?', category: 'living' },
      { id: 'taxes', label: 'Tax Information', query: 'How does the Swiss tax system work?', category: 'living' },
    ],
  },
  {
    id: 'site',
    title: 'Site Features',
    icon: '💻',
    options: [
      { id: 'pricing', label: 'Pricing Plans', query: 'What pricing plans do you offer?', category: 'site' },
      { id: 'modules', label: 'Learning Modules', query: 'What modules and courses are available?', category: 'site' },
      { id: 'tools', label: 'Tools & Calculators', query: 'What tools and calculators do you have?', category: 'site' },
      { id: 'cv-templates', label: 'CV Templates', query: 'Do you have CV templates for Swiss jobs?', category: 'site' },
      { id: 'dashboard', label: 'User Dashboard', query: 'What can I do in my dashboard?', category: 'site' },
    ],
  },
]

export const QUICK_QUESTIONS: PreselectionOption[] = [
  { id: 'overview', label: 'Swiss Immigration Overview', query: 'Give me an overview of Swiss immigration', category: 'quick' },
  { id: 'eu-path', label: 'EU/EFTA Citizens Path', query: 'What is the immigration process for EU/EFTA citizens?', category: 'quick' },
  { id: 'non-eu-path', label: 'Non-EU Citizens Path', query: 'What is the immigration process for non-EU citizens?', category: 'quick' },
  { id: 'best-canton', label: 'Best Canton for Me', query: 'Which canton is best for my situation?', category: 'quick' },
]
