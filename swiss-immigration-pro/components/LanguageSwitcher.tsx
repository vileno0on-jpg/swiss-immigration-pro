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

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0])
  const [isTranslating, setIsTranslating] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [pendingLanguageCode, setPendingLanguageCode] = useState<string | null>(null)

  const loadGoogleTranslate = useCallback(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return
    }

    // Add Google Translate script only once
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      
      // Add error handling
      script.onerror = () => {
        console.error('Failed to load Google Translate script')
        setIsScriptLoaded(false)
      }
      
      // Add load event
      script.onload = () => {
        // Give it a moment for the callback to execute
        setTimeout(() => {
          if ((window as any).google?.translate?.TranslateElement) {
            setIsScriptLoaded(true)
          }
        }, 500)
      }
      
      document.head.appendChild(script)

      // Initialize callback
      ;(window as any).googleTranslateElementInit = function() {
        try {
          if (!(window as any).google?.translate?.TranslateElement) {
            console.error('Google Translate API not available')
            return
          }
          
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: LANGUAGES.map(l => l.code).join(','),
              layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            'google_translate_element'
          )
          setIsScriptLoaded(true)
        } catch (error) {
          console.error('Google Translate initialization failed:', error)
          setIsScriptLoaded(false)
        }
      }
    } else {
      // Script already exists, check if it's loaded
      if ((window as any).google?.translate?.TranslateElement) {
        setIsScriptLoaded(true)
      } else {
        // Wait a bit for it to load
        setTimeout(() => {
          if ((window as any).google?.translate?.TranslateElement) {
            setIsScriptLoaded(true)
          }
        }, 500)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang) {
      const lang = LANGUAGES.find(l => l.code === savedLang)
      if (lang) {
        setCurrentLang(lang)
      }
    }

    // Load Google Translate script
    loadGoogleTranslate()

    // Don't initialize observer or mark content until script is loaded
    // This prevents lag on initial load

    return () => {
      // Cleanup
    }
  }, [loadGoogleTranslate])

  // Handle translation when language is selected
  useEffect(() => {
    if (!pendingLanguageCode || !isScriptLoaded || typeof window === 'undefined') {
      return
    }

    const triggerTranslation = () => {
      try {
        // Check current translation cookie
        const currentCookie = document.cookie.match(/googtrans=([^;]+)/)
        const expectedValue = pendingLanguageCode === 'en' ? '' : `/en/${pendingLanguageCode}`
        const currentValue = currentCookie ? decodeURIComponent(currentCookie[1]) : ''
        
        // If already translated to this language, skip
        if (currentValue === expectedValue && pendingLanguageCode !== 'en') {
          setIsTranslating(false)
          setPendingLanguageCode(null)
          return
        }
        
        // For English, restore original language
        if (pendingLanguageCode === 'en') {
          // Remove Google Translate cookie to show original language
          document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname
          
          // Reload page to apply changes
          window.location.reload()
          return
        }

        // Set the translation cookie (format: "/en/de" means translate from en to de)
        const translateValue = `/en/${pendingLanguageCode}`
        document.cookie = `googtrans=${translateValue}; path=/; max-age=31536000`
        
        // Try to find and use the Google Translate select element
        const selectElement = document.querySelector<HTMLSelectElement>('.goog-te-combo')
        
        if (selectElement) {
          // Set the language value (format: "en|de" means translate from en to de)
          const selectValue = `en|${pendingLanguageCode}`
          if (selectElement.value !== selectValue) {
            selectElement.value = selectValue
            // Trigger change event to activate translation
            const changeEvent = new Event('change', { bubbles: true })
            selectElement.dispatchEvent(changeEvent)
            
            // Also try click event
            selectElement.click()
            
            // Give it a moment, then reload if translation didn't trigger
            setTimeout(() => {
              // Check if translation was applied
              const newCookie = document.cookie.match(/googtrans=([^;]+)/)
              if (newCookie && newCookie[1] === translateValue) {
                // Translation applied, just reload to show it
                window.location.reload()
              } else {
                // Force reload to apply cookie
                window.location.reload()
              }
            }, 300)
            return
          }
        }
        
        // If select element not found or didn't work, reload to apply cookie
        setTimeout(() => {
          window.location.reload()
        }, 200)
        
      } catch (error) {
        console.error('Translation error:', error)
        setIsTranslating(false)
        setPendingLanguageCode(null)
      }
    }

    // Small delay to ensure Google Translate is fully initialized
    const timer = setTimeout(() => {
      triggerTranslation()
    }, 200)

    return () => {
      clearTimeout(timer)
    }
  }, [pendingLanguageCode, isScriptLoaded])

  const handleLanguageChange = (language: Language) => {
    // Prevent rapid clicking
    if (isTranslating) return
    
    setCurrentLang(language)
    localStorage.setItem('preferredLanguage', language.code)
    setIsOpen(false)
    
    // Apply translation
    setIsTranslating(true)
    setPendingLanguageCode(language.code)
  }

  return (
    <div className="relative">
      {/* Hidden Google Translate Element - Must be in DOM but visually hidden */}
      <div 
        id="google_translate_element" 
        style={{ position: 'absolute', left: '-9999px', width: '0', height: '0', overflow: 'hidden' }}
      ></div>

      {/* Custom Language Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        aria-label="Change language"
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
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left transition-colors ${
                      currentLang.code === language.code
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300'
                    }`}
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
                  ⚡ Powered by Google Translate
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
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3"
        >
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          <span className="text-sm font-semibold">Translating to {currentLang.nativeName}...</span>
        </motion.div>
      )}

      <style jsx global>{`
        /* Hide Google Translate banner and attribution */
        .goog-te-banner-frame {
          display: none !important;
        }
        
        body {
          top: 0 !important;
        }
        
        .skiptranslate {
          display: none !important;
        }
        
        /* Style Google Translate dropdown if visible */
        .goog-te-combo {
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
          background: white;
          font-size: 14px;
        }

        /* Prevent layout shift - keep in DOM but visually hidden */
        #google_translate_element {
          position: absolute;
          left: -9999px;
          width: 0;
          height: 0;
          overflow: hidden;
          visibility: hidden;
        }
        
        /* Ensure Google Translate select is accessible */
        .goog-te-combo {
          position: absolute;
          left: -9999px;
        }

        /* Ensure translated content is visible */
        .translated-ltr {
          direction: ltr !important;
        }
        
        .translated-rtl {
          direction: rtl !important;
        }

        /* Make sure all content is translatable */
        html.translated-ltr,
        html.translated-rtl {
          font-size: inherit !important;
        }

        /* Preserve dark mode styles during translation */
        body.dark-mode {
          background-color: #111827 !important;
          color: #f9fafb !important;
        }

        /* Fix iframe positioning from Google Translate */
        body > .skiptranslate {
          display: none !important;
        }
        
        iframe.skiptranslate {
          display: none !important;
        }

        /* Prevent layout shift during translation */
        body {
          transition: none !important;
        }

        /* Speed up Google Translate rendering */
        .translated-ltr, .translated-rtl {
          transition: none !important;
        }

        /* Hide Google Translate top frame completely */
        body > .goog-te-banner-frame {
          display: none !important;
        }
        
        #goog-gt-tt {
          display: none !important;
        }
      `}</style>
    </div>
  )
}

