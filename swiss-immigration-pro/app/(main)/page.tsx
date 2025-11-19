'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, Globe, ArrowRight, Sparkles } from 'lucide-react'
import RegionDetectionModal from '@/components/RegionDetectionModal'
import LanguageDetectionModal from '@/components/LanguageDetectionModal'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [showLanguageModal, setShowLanguageModal] = useState(false)

  // Auto-show modals on page load
  useEffect(() => {
    // Check if user has already seen language detection
    const hasSeenLanguageModal = localStorage.getItem('autoTranslateSkipped') || localStorage.getItem('autoTranslateEnabled')
    const hasSeenRegionModal = localStorage.getItem('quizCompleted')

    // Show language modal first if not seen before
    if (!hasSeenLanguageModal) {
      const languageTimer = setTimeout(() => {
        setShowLanguageModal(true)
      }, 1500)
      return () => clearTimeout(languageTimer)
    }

    // Then show region modal if not completed
    if (!hasSeenRegionModal) {
      const regionTimer = setTimeout(() => {
        setShowModal(true)
      }, 2000)
      return () => clearTimeout(regionTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Conversion Header - Sticky */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Left: Urgency Message */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">🔥 2025 Quotas Filling Fast</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Only 2,500 permits left</span>
              </div>
            </div>

            {/* Center: Premium Benefits */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>Unlimited AI Chat</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>20+ CV Templates</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>Expert Support</span>
              </div>
            </div>

            {/* Right: CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                href="/pricing"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors shadow-md"
              >
                ⭐ Upgrade Now
              </Link>
              <Link
                href="/auth/register"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm font-semibold px-4 py-2 rounded-lg text-sm transition-colors border border-white/30"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Swiss Immigration Pro
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Your Swiss Immigration
              <span className="block text-blue-600">Journey Starts Here</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get personalized immigration guidance based on your nationality, location, and goals.
              Whether you're from Europe, the Americas, or anywhere else, we have your pathway to Switzerland.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <span>Start Your Assessment</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                EU/EFTA Citizens
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Leverage freedom of movement for simplified Swiss residency and work permits.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <MapPin className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                US & Canadian Citizens
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Specialized guidance for American professionals seeking Swiss opportunities.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Globe className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                International Citizens
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive support for navigating Swiss immigration quotas and requirements.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Language Detection Modal */}
      <LanguageDetectionModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />

      {/* Region Detection Modal */}
      <RegionDetectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  )
}
