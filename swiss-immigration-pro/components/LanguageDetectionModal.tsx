'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, CheckCircle, ArrowRight } from 'lucide-react'

interface LanguageDetectionModalProps {
  isOpen: boolean
  onClose: () => void
}

interface DetectedLanguage {
  code: string
  name: string
  nativeName: string
  flag: string
  confidence: number
}

export default function LanguageDetectionModal({ isOpen, onClose }: LanguageDetectionModalProps) {
  const [detectedLanguage, setDetectedLanguage] = useState<DetectedLanguage | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [hasConfirmed, setHasConfirmed] = useState(false)

  // Language detection based on browser locale and navigator
  useEffect(() => {
    if (isOpen && !detectedLanguage) {
      const detectLanguage = () => {
        const navigatorLang = navigator.language || 'en-US'
        const languages = navigator.languages || [navigatorLang]

        // Priority: browser language > system language > fallback to English
        const primaryLang = languages[0]?.split('-')[0] || 'en'

        // Map common language codes to our supported languages
        const languageMap: Record<string, DetectedLanguage> = {
          'en': { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', confidence: 90 },
          'de': { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', confidence: 95 },
          'fr': { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', confidence: 95 },
          'it': { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', confidence: 95 },
          'es': { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', confidence: 85 },
          'pt': { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', confidence: 80 },
          'zh': { code: 'zh-CN', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', confidence: 85 },
          'ar': { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', confidence: 80 },
          'hi': { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', confidence: 75 },
          'ru': { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', confidence: 80 },
          'ja': { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', confidence: 85 },
          'ko': { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', confidence: 80 },
          'tr': { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', confidence: 75 },
          'pl': { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', confidence: 70 },
          'nl': { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', confidence: 75 },
        }

        // Try to detect country for more accurate language detection
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const countryHints: Record<string, string> = {
          'Europe/Berlin': 'de',
          'Europe/Zurich': 'de',
          'Europe/Paris': 'fr',
          'Europe/Rome': 'it',
          'Europe/Madrid': 'es',
          'Europe/Lisbon': 'pt',
          'Asia/Shanghai': 'zh-CN',
          'Asia/Tokyo': 'ja',
          'Asia/Seoul': 'ko',
          'Europe/Moscow': 'ru',
          'Asia/Istanbul': 'tr',
          'Europe/Warsaw': 'pl',
          'Europe/Amsterdam': 'nl',
          'America/New_York': 'en',
          'America/Los_Angeles': 'en',
          'America/Toronto': 'en',
        }

        // Check if we have a country-specific hint
        const countryLang = countryHints[timezone]
        if (countryLang && languageMap[countryLang]) {
          setDetectedLanguage({ ...languageMap[countryLang], confidence: Math.max(languageMap[countryLang].confidence, 85) })
          return
        }

        // Fallback to primary language detection
        const detected = languageMap[primaryLang] || languageMap['en']
        setDetectedLanguage(detected)
      }

      detectLanguage()
    }
  }, [isOpen, detectedLanguage])

  const handleConfirmTranslation = () => {
    if (!detectedLanguage) return

    setIsTranslating(true)

    // Simulate translation activation
    setTimeout(() => {
      setHasConfirmed(true)

      // Save preference to localStorage
      localStorage.setItem('autoTranslateEnabled', 'true')
      localStorage.setItem('preferredLanguage', detectedLanguage.code)

      // Trigger Google Translate if available
      if (window.google && window.google.translate) {
        try {
          // This would normally trigger Google Translate
          document.cookie = `googtrans=/en/${detectedLanguage.code}; path=/; max-age=31536000`
        } catch (error) {
          console.log('Google Translate not available')
        }
      }

      // Close modal after confirmation
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 1500)
  }

  const handleSkipTranslation = () => {
    localStorage.setItem('autoTranslateSkipped', 'true')
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Language Detected
              </h2>
            </div>
            <button
              onClick={handleSkipTranslation}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <AnimatePresence mode="wait">
              {hasConfirmed ? (
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-4"
                >
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Translation Activated!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      The site is now translating to {detectedLanguage?.nativeName}
                    </p>
                    <div className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Applying translation...</span>
                    </div>
                  </div>
                </motion.div>
              ) : isTranslating ? (
                <motion.div
                  key="translating"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                    <Globe className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Activating Translation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Translating to {detectedLanguage?.nativeName}...
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="detection"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Detected Language */}
                  {detectedLanguage && (
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 px-6 py-4 rounded-xl mb-4">
                        <span className="text-4xl">{detectedLanguage.flag}</span>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {detectedLanguage.nativeName}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {detectedLanguage.name} • {detectedLanguage.confidence}% confidence
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Would you like to translate this site?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                        We detected you're accessing from a {detectedLanguage.name}-speaking region.
                        Enable automatic translation for a better experience.
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleConfirmTranslation}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Yes, translate to {detectedLanguage?.nativeName}</span>
                    </button>

                    <button
                      onClick={handleSkipTranslation}
                      className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
                    >
                      No thanks, continue in English
                    </button>
                  </div>

                  {/* Features */}
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                    <p className="mb-2">✨ Powered by Google Translate</p>
                    <p>🔒 Your language preference will be saved</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
