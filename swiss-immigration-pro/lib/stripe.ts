import Stripe from 'stripe'

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
      typescript: true,
    })
  : ({} as Stripe)

export const PRICING_PACKS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: null,
    features: [
      'Basic site access',
      'Immigration quiz',
      'Limited AI chatbot (3 messages/day)',
      'General information pages',
    ],
  },
  immigration: {
    id: 'immigration',
    name: 'Immigration Pack',
    price: 9.99,
    priceId: null, // Will be set with actual Stripe Price ID
    features: [
      'Unlimited AI chatbot access',
      '20+ Swiss-style CV templates',
      'Full employment checklists & PDFs',
      'Employment guides (quotas, salaries, embassy contacts)',
      'Dashboard access',
      'ATS-optimized CV editor',
      'Interactive quizzes & assessments',
    ],
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced Pack',
    price: 29.99,
    priceId: null,
    features: [
      'Everything in Immigration Pack',
      '10 comprehensive guide modules',
      'AI tutor bot access',
      'Progress tracker',
      'Job hunt strategies',
      'Cantonal tips & visa hacks',
      'Interactive learning tools',
      'Video tutorials & walkthroughs',
      'Practice exercises & quizzes',
    ],
  },
  citizenship: {
    id: 'citizenship',
    name: 'Citizenship Pro Pack',
    price: 89.99,
    priceId: null,
    features: [
      'Everything in Advanced Pack',
      'Citizenship roadmap (10yr path)',
      'Spouse & 3rd-gen shortcuts',
      'Language test preparation',
      'Lifetime access',
      'Priority support',
      'Personalized application coaching',
      'Advanced interactive modules',
      'Expert video content',
    ],
  },
} as const

export type PackId = keyof typeof PRICING_PACKS

