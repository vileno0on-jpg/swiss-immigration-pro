import Stripe from 'stripe'

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
      typescript: true,
    })
  : ({} as Stripe)

// Stripe Price IDs for subscription packs (test mode by default)
export const SUBSCRIPTION_PRICE_IDS = {
  immigration: {
    monthly: process.env.STRIPE_PRICE_IMMIGRATION_MONTHLY ?? 'price_immigration_monthly_test',
    annual: process.env.STRIPE_PRICE_IMMIGRATION_ANNUAL ?? 'price_immigration_annual_test',
  },
  advanced: {
    monthly: process.env.STRIPE_PRICE_ADVANCED_MONTHLY ?? 'price_advanced_monthly_test',
    annual: process.env.STRIPE_PRICE_ADVANCED_ANNUAL ?? 'price_advanced_annual_test',
  },
  citizenship: {
    monthly: process.env.STRIPE_PRICE_CITIZENSHIP_MONTHLY ?? 'price_citizenship_monthly_test',
    annual: process.env.STRIPE_PRICE_CITIZENSHIP_ANNUAL ?? 'price_citizenship_annual_test',
  },
} as const

export type PackCycle = 'monthly' | 'annual'

export function getSubscriptionPriceId(packId: keyof typeof SUBSCRIPTION_PRICE_IDS, cycle: PackCycle = 'monthly') {
  return SUBSCRIPTION_PRICE_IDS[packId][cycle]
}

export const PRICING_PACKS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: null,
    description: 'Get started with essential Swiss immigration resources and basic AI guidance at no cost. Perfect for exploring the platform and understanding Swiss immigration basics.',
    shortDescription: 'Essential Swiss immigration resources at no cost',
    valueProposition: 'Start your Swiss immigration journey completely free',
    recommendedFor: 'Newcomers exploring Swiss immigration options',
    keywords: ['free swiss immigration guide', 'swiss immigration resources', 'free immigration quiz', 'swiss visa information'],
    features: [
      'Access to 2 comprehensive guide modules',
      'Immigration eligibility quiz & assessment',
      'AI chatbot assistance (10 messages/day)',
      'Basic work permit information & pathways',
      'Canton comparison overview',
      'Essential document checklists',
      'Community forum access',
      'Email newsletter with updates',
    ],
  },
  immigration: {
    id: 'immigration',
    name: 'Immigration Pack',
    price: 9,
    priceId: SUBSCRIPTION_PRICE_IDS.immigration.monthly,
    description: 'Complete Swiss immigration toolkit with unlimited AI assistance, professional CV templates, employment guides, and comprehensive checklists. Everything you need to navigate work permits, visa applications, and employment in Switzerland.',
    shortDescription: 'Complete Swiss immigration toolkit with AI assistance and CV templates',
    valueProposition: 'All-in-one immigration resource center with AI-powered guidance',
    recommendedFor: 'Professionals actively applying for Swiss work permits and visas',
    keywords: ['swiss immigration pack', 'swiss work permit guide', 'swiss cv templates', 'swiss visa application help', 'ats optimized cv switzerland'],
    badge: 'Most Popular for Job Seekers',
    features: [
      'Unlimited AI chatbot access (24/7 expert guidance)',
      '25+ professional Swiss CV templates (ATS-optimized)',
      'Complete work permit application checklists',
      'Cantonal quota tracking & availability alerts',
      'Salary benchmarking by industry & canton',
      'Embassy submission guides & document kits',
      'ATS-optimized CV builder with real-time feedback',
      'Interactive permit eligibility calculator',
      'Priority email support (48h response)',
      'Access to all 5 core immigration modules',
      'Downloadable PDF guides & templates',
      'Job application strategy playbook',
    ],
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced Pack',
    price: 29,
    priceId: SUBSCRIPTION_PRICE_IDS.advanced.monthly,
    description: 'Premium Swiss immigration masterclass with comprehensive learning modules, AI tutoring, progress tracking, and expert strategies. Advanced tools for job hunting, cantonal optimization, and long-term immigration success in Switzerland.',
    shortDescription: 'Premium masterclass with comprehensive learning modules and AI tutoring',
    valueProposition: 'Master Swiss immigration with expert guidance and advanced tools',
    recommendedFor: 'Serious applicants committed to long-term success in Switzerland',
    keywords: ['swiss immigration masterclass', 'swiss immigration course', 'advanced swiss visa guide', 'swiss cantonal immigration tips', 'swiss job search strategies'],
    badge: 'Best Value',
    features: [
      'Everything in Immigration Pack (all features included)',
      '10 comprehensive guide modules (66,000+ words)',
      'Advanced AI tutor with personalized learning paths',
      'Progress tracking dashboard & milestone system',
      'Strategic job hunt playbook (Swiss market secrets)',
      'Cantonal optimization strategies & insider tips',
      'Tax & financial planning calculator',
      'Language test preparation toolkit',
      'Healthcare & insurance system guide',
      'Housing & cost of living analysis',
      'Family reunification process roadmap',
      'Integration test preparation materials',
      'Priority email support (24h response)',
      'Success stories & real case studies',
      'Annual strategy review session',
    ],
  },
  citizenship: {
    id: 'citizenship',
    name: 'Citizenship Pro Pack',
    price: 79,
    priceId: SUBSCRIPTION_PRICE_IDS.citizenship.monthly,
    description: 'Ultimate Swiss citizenship roadmap with lifetime access, personalized coaching, and expert video content. Complete 10-year pathway guidance including language test preparation, spouse shortcuts, and comprehensive application strategies for Swiss naturalization.',
    shortDescription: 'Ultimate Swiss citizenship roadmap with lifetime access and personalized coaching',
    valueProposition: 'Your complete path to Swiss citizenship with lifetime expert support',
    recommendedFor: 'Long-term residents committed to obtaining Swiss citizenship',
    keywords: ['swiss citizenship guide', 'swiss naturalization process', 'swiss citizenship roadmap', 'swiss citizenship test preparation', 'swiss citizenship application help'],
    badge: 'Ultimate Solution',
    features: [
      'Everything in Advanced Pack (complete access)',
      'Complete 10-year citizenship roadmap & timeline',
      'Spouse & 3rd-generation naturalization shortcuts',
      'Comprehensive language test preparation (B1-B2 level)',
      'Lifetime access to all content & future updates',
      'Priority support with 24-hour response guarantee',
      'Personalized application coaching sessions',
      'Cantonal naturalization requirements database',
      'Integration test question bank & practice tests',
      'Legal citation templates & application forms',
      'Success rate optimization strategies',
      'Community access to citizenship applicants',
      'Quarterly strategy review sessions',
      'Expert document review (up to 3 critical docs)',
      'Naturalization interview preparation guide',
      'All future content & feature additions included',
    ],
  },
} as const

export type PackId = keyof typeof PRICING_PACKS

// One-time purchase products (not subscriptions)
export const ONE_TIME_PRODUCTS = {
  masterclass: {
    id: 'masterclass',
    name: 'Swiss Immigration Masterclass',
    price: 49700, // CHF 497 in cents
    description: 'Complete self-paced course covering everything from work permits to citizenship',
    type: 'course',
    features: [
      '8-hour video course',
      'Comprehensive study materials',
      'Certificate of completion',
      'Lifetime access',
      'Bonus: CV templates pack',
      'Bonus: Application checklists'
    ]
  },
  citizenship_roadmap: {
    id: 'citizenship_roadmap',
    name: 'Citizenship Roadmap PDF',
    price: 9700, // CHF 97 in cents
    description: 'Detailed 10-year roadmap to Swiss citizenship',
    type: 'pdf',
    features: [
      'Step-by-step 10-year plan',
      'Timeline visualization',
      'Requirements checklist',
      'Cantonal variations guide',
      'Language test preparation tips'
    ]
  },
  application_support: {
    id: 'application_support',
    name: 'Application Support Package',
    price: 150000, // CHF 1,500 in cents
    description: 'Full support through your entire application process',
    type: 'service',
    features: [
      '60-minute strategy call',
      'Application review & feedback',
      'Document preparation guidance',
      '3 follow-up calls (30min each)',
      'Email support throughout process',
      'Priority response (24h)'
    ]
  }
  apartment_finder_access: {
    id: 'apartment_finder_access',
    name: 'Apartment Finder Access',
    price: 1900, // CHF 19 in cents
    description: 'Unlock apartment search results for 24 hours',
    type: 'tool',
    features: ['24h access to Apartment Finder results']
  }
} as const

export type OneTimeProductId = keyof typeof ONE_TIME_PRODUCTS
