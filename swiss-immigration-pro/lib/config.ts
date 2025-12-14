export const CONFIG = {
  app: {
    name: 'Swiss Immigration Pro',
    firm: 'Alpine Legal Partners',
    lawyer: 'Dr. Alpine Esq.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@alpinelegalpartners.ch',
  },
  colors: {
    primary: '#0056B3',
    primaryLight: '#007BFF',
    accent: '#E3F2FD',
    background: '#FFFFFF',
    backgroundAlt: '#F8F9FA',
    dark: '#1A1A1A',
  },
  ai: {
    provider: 'groq', // Primary: Groq (Llama 3.1 70B), fallback: OpenAI, xAI/Grok
    model: 'llama-3.1-70b-versatile', // Groq model (llama-3.1-70b-versatile, mixtral-8x7b-32768)
    maxTokens: 1000,
    freeDailyLimit: 30,
    temperature: 0.7,
  },
  discord: {
    disclaimer: 'General information only (updated Nov 2025). Not legal advice. Book consultation with Dr. Alpine Esq. for your case.',
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID,
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID,
  },
  translation: {
    provider: 'deepl', // DeepL translation service
    apiKey: process.env.DEEPL_API_KEY,
  },
} as const

