// Internationalization (i18n) system for natural, native translations
// Replaces Google Translate with proper translation files

import { LAYER_CONTENT_FR } from './fr/layerContent'
import type { LayerContent } from '../layerContent'

export type SupportedLanguage = 'en' | 'fr'

export interface TranslationConfig {
  language: SupportedLanguage
  locale: string
}

// Get current language from localStorage or browser
export function getCurrentLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en'
  
  const saved = localStorage.getItem('preferredLanguage')
  if (saved === 'fr' || saved === 'en') {
    return saved
  }
  
  // Check browser language
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('fr')) {
    return 'fr'
  }
  
  return 'en'
}

// Get layer content in the current language
export function getLayerContent(layer: string): LayerContent {
  const lang = getCurrentLanguage()
  
  if (lang === 'fr') {
    return LAYER_CONTENT_FR[layer] || LAYER_CONTENT_FR.europeans // fallback
  }
  
  // For English, import and return original
  // This will be handled by the component importing from layerContent.ts
  return {} as LayerContent // Placeholder - components should import directly for English
}

// Translation helper for simple strings
export function t(key: string, params?: Record<string, string | number>): string {
  const lang = getCurrentLanguage()
  
  // For now, return key as fallback
  // This can be extended with a full translation dictionary
  if (params) {
    let result = key
    Object.entries(params).forEach(([paramKey, value]) => {
      result = result.replace(`{{${paramKey}}}`, String(value))
    })
    return result
  }
  
  return key
}

// Check if French is the current language
export function isFrench(): boolean {
  return getCurrentLanguage() === 'fr'
}

// Set language preference
export function setLanguage(lang: SupportedLanguage): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('preferredLanguage', lang)
  localStorage.setItem('userLanguage', lang)
  
  // Update HTML lang attribute
  document.documentElement.lang = lang
  
  // Trigger language change event
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }))
}





