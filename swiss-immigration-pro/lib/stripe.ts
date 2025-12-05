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
    price: 9,
    priceId: null, // Will be set with actual Stripe Price ID
    features: [
      'Unlimited AI chatbot access',
      '20+ Swiss-style CV templates',
      'Full employment checklists & PDFs',
      'Employment guides (quotas, salaries, embassy contacts)',
      'Dashboard access',
      'ATS-optimized CV editor',
      'Interactive quizzes & assessments',
      'Email support',
    ],
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced Pack',
    price: 29,
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
      'Priority email support',
    ],
  },
  citizenship: {
    id: 'citizenship',
    name: 'Citizenship Pro Pack',
    price: 79,
    priceId: null,
    features: [
      'Everything in Advanced Pack',
      'Citizenship roadmap (10yr path)',
      'Spouse & 3rd-gen shortcuts',
      'Language test preparation',
      'Lifetime access to all content',
      'Priority support (24h response)',
      'Personalized application coaching',
      'Advanced interactive modules',
      'Expert video content',
      'Annual strategy review',
    ],
  },
} as const

export type PackId = keyof typeof PRICING_PACKS

