// Cantonal immigration variations
export const CANTONS = [
  { code: 'ZH', name: 'Zurich', language: 'German', capital: 'Zurich', population: '1.5M' },
  { code: 'GE', name: 'Geneva', language: 'French', capital: 'Geneva', population: '500k' },
  { code: 'BS', name: 'Basel', language: 'German', capital: 'Basel', population: '200k' },
  { code: 'VD', name: 'Vaud', language: 'French', capital: 'Lausanne', population: '800k' },
  { code: 'BE', name: 'Bern', language: 'German', capital: 'Bern', population: '1M' },
  { code: 'TI', name: 'Ticino', language: 'Italian', capital: 'Bellinzona', population: '350k' },
  { code: 'VS', name: 'Valais', language: 'French/German', capital: 'Sion', population: '350k' },
  { code: 'AG', name: 'Aargau', language: 'German', capital: 'Aarau', population: '700k' },
  { code: 'SG', name: 'St. Gallen', language: 'German', capital: 'St. Gallen', population: '500k' },
  { code: 'GR', name: 'Grisons', language: 'German/Romansh/Italian', capital: 'Chur', population: '200k' },
] as const

// Sample CV categories
export const CV_CATEGORIES = [
  'Tech & IT',
  'Finance & Banking',
  'Medicine & Healthcare',
  'Engineering',
  'Consulting',
  'Legal',
  'Marketing & Sales',
  'General',
] as const

// Sample embassy locations
export const EMBASSY_LOCATIONS = [
  { country: 'USA', city: 'Washington DC', link: 'https://www.swissinfo.ch' },
  { country: 'UK', city: 'London', link: 'https://www.swissinfo.ch' },
  { country: 'Germany', city: 'Berlin', link: 'https://www.swissinfo.ch' },
  { country: 'France', city: 'Paris', link: 'https://www.swissinfo.ch' },
  { country: 'India', city: 'New Delhi', link: 'https://www.swissinfo.ch' },
  { country: 'China', city: 'Beijing', link: 'https://www.swissinfo.ch' },
  { country: 'Canada', city: 'Ottawa', link: 'https://www.swissinfo.ch' },
  { country: 'Australia', city: 'Canberra', link: 'https://www.swissinfo.ch' },
] as const

// Sample test questions for quiz
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'How long does it take to get Swiss citizenship through ordinary naturalization?',
    options: ['5 years', '10 years', '15 years', '20 years'],
    correct: 1,
    explanation: 'Ordinary naturalization requires 10 years of residency with a C permit.',
  },
  {
    id: 2,
    question: 'What language proficiency is required for Swiss citizenship?',
    options: ['A1', 'A2', 'B1', 'C1'],
    correct: 2,
    explanation: 'B1 level is required for ordinary naturalization in German, French, or Italian.',
  },
  {
    id: 3,
    question: 'How many non-EU work permits are available in 2025?',
    options: ['6,500', '8,500', '10,500', '12,500'],
    correct: 1,
    explanation: 'SEM allocated 8,500 permits (4,000 L + 4,500 B) for 2025.',
  },
] as const

// Monetization trigger points
export const MONETIZATION_TRIGGERS = {
  FREE_MESSAGE_LIMIT: 3,
  CV_PREVIEW_ONLY: true,
  MASTERCLASS_LOCKED: 8, // Lock modules 3-10
  CITIZENSHIP_ROADMAP_LOCKED: true,
} as const

// SEO keywords
export const SEO_KEYWORDS = [
  'swiss immigration',
  'swiss visa',
  'swiss citizenship',
  'switzerland work permit',
  'L permit switzerland',
  'B permit switzerland',
  'swiss work visa',
  'swiss immigration lawyer',
  'switzerland residency',
  'naturalization switzerland',
] as const

