'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 flex items-center justify-center">
      <motion.div
        {...fadeInUp}
        className="text-center max-w-2xl mx-auto px-4"
      >
        <div className="mb-8">
          <Globe className="w-20 h-20 mx-auto text-blue-600 dark:text-blue-400 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Swiss Immigration Pro
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Personalizing your Swiss immigration experience based on your location...
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Detecting Your Region
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're automatically detecting your location to provide you with the most relevant immigration information and pathways for your region.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>United States</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>Europe (EU/EFTA)</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>International</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This process is automatic and takes just a few seconds. You'll be redirected to your personalized experience shortly.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
