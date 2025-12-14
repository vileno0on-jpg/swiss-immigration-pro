'use client'

import { useState, useEffect, useCallback } from 'react'
import { Globe, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
]

// Cache for translations to avoid re-translating the same text
const translationCache = new Map<string, string>()

// Elements that should not be translated
const NO_TRANSLATE_SELECTORS = [
  'script',
  'style',
  'noscript',
  'code',
  'pre',
  '.notranslate',
  '[translate="no"]',
  'input[type="email"]',
  'input[type="password"]',
  'input[type="url"]',
  'input[type="search"]',
  'textarea',
  'select',
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0])
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationProgress, setTranslationProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang && savedLang !== 'en') {
      const lang = LANGUAGES.find(l => l.code === savedLang)
      if (lang) {
        setCurrentLang(lang)
        // Auto-translate on load if not English
        setTimeout(() => {
          translatePage(savedLang)
        }, 500)
      }
    }
  }, [])

  // Check if element should be translated
  const shouldTranslate = (element: Element): boolean => {
    // Skip if element or parent has notranslate class
    if (element.closest('.notranslate')) {
      return false
    }

    // Skip if element matches no-translate selectors
    for (const selector of NO_TRANSLATE_SELECTORS) {
      if (element.matches(selector) || element.closest(selector)) {
        return false
      }
    }

    // Skip if element has translate="no" attribute
    if (element.getAttribute('translate') === 'no') {
      return false
    }

    // Skip empty or whitespace-only text
    const text = element.textContent?.trim()
    if (!text || text.length === 0) {
      return false
    }

    // Skip if it's already translated (has data-deepl attribute)
    if (element.hasAttribute('data-deepl-translated')) {
      return false
    }

    return true
  }

  // Extract text nodes from element
  const getTextNodes = (element: Node): Node[] => {
    const textNodes: Node[] = []
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT
          
          // Check if parent should be translated
          if (!shouldTranslate(parent)) {
            return NodeFilter.FILTER_REJECT
          }

          // Only include non-empty text nodes
          if (node.textContent?.trim()) {
            return NodeFilter.FILTER_ACCEPT
          }
          return NodeFilter.FILTER_REJECT
        }
      }
    )

    let node
    while (node = walker.nextNode()) {
      textNodes.push(node)
    }

    return textNodes
  }

  // Translate a single text element
  const translateText = async (text: string, targetLang: string): Promise<string> => {
    if (!text || !text.trim()) {
      return text
    }

    // Check cache first
    const cacheKey = `${text}:${targetLang}`
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!
    }

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          targetLang,
          sourceLang: 'EN',
        }),
      })

      if (!response.ok) {
        throw new Error('Translation failed')
      }

      const data = await response.json()
      const translatedText = data.translatedText || text

      // Cache the translation
      translationCache.set(cacheKey, translatedText)

      return translatedText
    } catch (error) {
      console.error('Translation error:', error)
      return text // Return original text on error
    }
  }

  // Translate the entire page
  const translatePage = async (targetLang: string) => {
    if (targetLang === 'en') {
      // Reset to English - restore original text
      const translatedElements = document.querySelectorAll('[data-deepl-translated]')
      translatedElements.forEach((el) => {
        const originalText = el.getAttribute('data-deepl-original')
        if (originalText !== null && el.textContent) {
          el.textContent = originalText
          el.removeAttribute('data-deepl-translated')
          el.removeAttribute('data-deepl-original')
        }
      })
      translationCache.clear()
      setIsTranslating(false)
      return
    }

    setIsTranslating(true)
    setTranslationProgress(0)

    try {
      // Get all translatable elements
      const mainContent = document.querySelector('main') || document.body
      const allElements = mainContent.querySelectorAll('*')
      const translatableElements: Element[] = []

      allElements.forEach((el) => {
        if (shouldTranslate(el)) {
          const textNodes = getTextNodes(el)
          if (textNodes.length > 0) {
            translatableElements.push(el)
          }
        }
      })

      const total = translatableElements.length
      let processed = 0

      // Translate elements in batches to avoid overwhelming the API
      const batchSize = 10
      for (let i = 0; i < translatableElements.length; i += batchSize) {
        const batch = translatableElements.slice(i, i + batchSize)
        
        await Promise.all(
          batch.map(async (el) => {
            const textNodes = getTextNodes(el)
            
            for (const textNode of textNodes) {
              const originalText = textNode.textContent || ''
              if (originalText.trim()) {
                const translated = await translateText(originalText, targetLang)
                textNode.textContent = translated
                
                // Mark as translated
                if (el instanceof HTMLElement) {
                  el.setAttribute('data-deepl-translated', 'true')
                  el.setAttribute('data-deepl-original', originalText)
                }
              }
            }
          })
        )

        processed += batch.length
        setTranslationProgress(Math.round((processed / total) * 100))
        
        // Small delay between batches to avoid rate limiting
        if (i + batchSize < translatableElements.length) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }

      // Store current language in localStorage
      localStorage.setItem('preferredLanguage', targetLang)
      document.documentElement.setAttribute('lang', targetLang)
    } catch (error) {
      console.error('Page translation error:', error)
    } finally {
      setIsTranslating(false)
      setTranslationProgress(0)
    }
  }

  const handleLanguageChange = async (language: Language) => {
    // Prevent rapid clicking
    if (isTranslating) return
    
    setCurrentLang(language)
    setIsOpen(false)
    
    // Apply translation
    await translatePage(language.code)
  }

  return (
    <div className="relative">
      {/* Custom Language Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        aria-label="Change language"
        disabled={isTranslating}
      >
        <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <span className="text-2xl">{currentLang.flag}</span>
        <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentLang.code.toUpperCase()}
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
            >
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Choose Language
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Auto-translate entire site
                </p>
              </div>

              <div className="p-2">
                {LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language)}
                    disabled={isTranslating}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left transition-colors ${
                      currentLang.code === language.code
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300'
                    } ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{language.flag}</span>
                      <div>
                        <div className="text-sm font-medium">{language.nativeName}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {language.name}
                        </div>
                      </div>
                    </div>
                    {currentLang.code === language.code && (
                      <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  ⚡ Powered by DeepL
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Translation Loading Indicator */}
      {isTranslating && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 min-w-[300px]"
        >
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Translating to {currentLang.nativeName}...</div>
            {translationProgress > 0 && (
              <div className="mt-1 w-full bg-blue-500 rounded-full h-1.5">
                <div
                  className="bg-white h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${translationProgress}%` }}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
