'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Sparkles, TrendingUp, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { LAYER_CONTENT } from '@/lib/layerContent'
import type { LayerType } from '@/lib/layerLogic'

export default function LayerQuizPage() {
  const params = useParams()
  const router = useRouter()
  const layerParam = params?.layer as string
  const layer = (['europeans', 'americans', 'others'].includes(layerParam)
    ? layerParam
    : 'others') as LayerType

  const content = LAYER_CONTENT[layer]

  // Redirect to resources page since quiz is removed
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/${layer}/resources`)
    }, 3000)

    return () => clearTimeout(timer)
  }, [router, layer])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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

      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-8">
            <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Removed
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              We've replaced our quiz system with automatic region detection. You'll be redirected to your personalized resources in a moment.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Your Region: {layer.charAt(0).toUpperCase() + layer.slice(1)}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Based on your location, we've tailored content specifically for your immigration pathway.
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <Link
              href={`/${layer}/resources`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Go to Resources Now</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

