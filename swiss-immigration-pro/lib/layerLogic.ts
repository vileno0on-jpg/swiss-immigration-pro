// Layer classification logic for Swiss Immigration Advisor
// Categorizes users into: Europeans (EU/EFTA), Americans (USA/CA), or Others (all other countries)

export type LayerType = 'europeans' | 'americans' | 'others'

// EU/EFTA countries (ISO 3166-1 alpha-2 codes)
export const EU_COUNTRIES = [
  'AT', // Austria
  'BE', // Belgium
  'BG', // Bulgaria
  'HR', // Croatia
  'CY', // Cyprus
  'CZ', // Czech Republic
  'DK', // Denmark
  'EE', // Estonia
  'FI', // Finland
  'FR', // France
  'DE', // Germany
  'GR', // Greece
  'HU', // Hungary
  'IE', // Ireland
  'IT', // Italy
  'LV', // Latvia
  'LT', // Lithuania
  'LU', // Luxembourg
  'MT', // Malta
  'NL', // Netherlands
  'PL', // Poland
  'PT', // Portugal
  'RO', // Romania
  'SK', // Slovakia
  'SI', // Slovenia
  'ES', // Spain
  'SE', // Sweden
] as const

// EFTA countries (not in EU but have freedom of movement)
export const EFTA_COUNTRIES = [
  'IS', // Iceland
  'LI', // Liechtenstein
  'NO', // Norway
  'CH', // Switzerland (home country)
] as const

// All EU/EFTA countries combined
export const EU_EFTA_COUNTRIES = [...EU_COUNTRIES, ...EFTA_COUNTRIES] as const

// American countries (USA and Canada)
export const AMERICAN_COUNTRIES = [
  'US', // United States
  'CA', // Canada
] as const

export interface QuizAnswers {
  countryOfOrigin: string // ISO country code
  nationality?: string // ISO country code (if different from origin)
  immigrationReason: string[] // Work, Study, Family, Investment, Other
  ageRange?: '18-25' | '26-40' | '41+'
  hasJobOffer: boolean
  languageSkills: {
    en?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
    de?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
    fr?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
    it?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  }
  email?: string
}

/**
 * Classifies user into a layer based on country of origin
 */
export function classifyLayer(countryCode: string): LayerType {
  const upperCode = countryCode.toUpperCase().trim()
  
  // Check if EU/EFTA
  if (EU_EFTA_COUNTRIES.includes(upperCode as any)) {
    return 'europeans'
  }
  
  // Check if American (USA/Canada)
  if (AMERICAN_COUNTRIES.includes(upperCode as any)) {
    return 'americans'
  }
  
  // All others
  return 'others'
}

/**
 * Gets the layer-specific route path
 * Maps layer types to static routes (eu, us, other)
 */
export function getLayerRoute(layer: LayerType): string {
  switch (layer) {
    case 'europeans':
      return '/eu'
    case 'americans':
      return '/us'
    case 'others':
      return '/other'
    default:
      return '/other'
  }
}

/**
 * Gets layer-specific hero tagline
 */
export function getLayerTagline(layer: LayerType): string {
  switch (layer) {
    case 'europeans':
      return 'Easy EU Mobility to Swiss Bliss'
    case 'americans':
      return 'From Stars & Stripes to Swiss Precision'
    case 'others':
      return 'Global Pathways to Switzerland'
    default:
      return 'Your Swiss Immigration Journey'
  }
}

/**
 * Gets layer-specific hero description
 */
export function getLayerDescription(layer: LayerType): string {
  switch (layer) {
    case 'europeans':
      return 'Leverage your EU/EFTA freedom of movement rights for fast-track Swiss residency. No quotas, simplified processes, and 5-year path to citizenship.'
    case 'americans':
      return 'Navigate non-EU work visas, sponsorships, and salary thresholds. Expert guidance for US and Canadian professionals seeking Swiss opportunities.'
    case 'others':
      return 'Comprehensive support for third-country nationals: quotas, lotteries, embassy guides, and strategic pathways to Swiss residency and citizenship.'
    default:
      return 'Your personalized Swiss immigration platform'
  }
}

/**
 * Checks if a country code is EU/EFTA
 */
export function isEUEFTA(countryCode: string): boolean {
  return EU_EFTA_COUNTRIES.includes(countryCode.toUpperCase().trim() as any)
}

/**
 * Checks if a country code is American (US/CA)
 */
export function isAmerican(countryCode: string): boolean {
  return AMERICAN_COUNTRIES.includes(countryCode.toUpperCase().trim() as any)
}

/**
 * Gets all ISO country codes for dropdowns
 */
export function getAllCountries(): Array<{ code: string; name: string }> {
  // Comprehensive list of countries with ISO codes
  // This is a simplified version - in production, use a library like 'country-list'
  return [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' },
    { code: 'AT', name: 'Austria' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'PL', name: 'Poland' },
    { code: 'RO', name: 'Romania' },
    { code: 'GR', name: 'Greece' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'HU', name: 'Hungary' },
    { code: 'SE', name: 'Sweden' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
    { code: 'NO', name: 'Norway' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IS', name: 'Iceland' },
    { code: 'IN', name: 'India' },
    { code: 'CN', name: 'China' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'BR', name: 'Brazil' },
    { code: 'MX', name: 'Mexico' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AU', name: 'Australia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'SG', name: 'Singapore' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'RU', name: 'Russia' },
    { code: 'TR', name: 'Turkey' },
    { code: 'EG', name: 'Egypt' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'PH', name: 'Philippines' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'TH', name: 'Thailand' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'CL', name: 'Chile' },
    { code: 'CO', name: 'Colombia' },
    { code: 'PE', name: 'Peru' },
    { code: 'VE', name: 'Venezuela' },
    // Add more as needed
  ].sort((a, b) => a.name.localeCompare(b.name))
}

