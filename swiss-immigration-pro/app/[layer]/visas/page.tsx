'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, FileText, ArrowLeft, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { LAYER_CONTENT } from '@/lib/layerContent'
import type { LayerType } from '@/lib/layerLogic'

export default function VisasPage() {
  const params = useParams()
  const layerParam = params?.layer as string
  const layer = (['europeans', 'americans', 'others'].includes(layerParam) 
    ? layerParam 
    : 'others') as LayerType
  
  const content = LAYER_CONTENT[layer]
  const visas = content.visas.types.filter(v => v.applicable)

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/${layer}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {layer.charAt(0).toUpperCase() + layer.slice(1)} Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {content.visas.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            {content.visas.description}
          </p>
        </div>

        {/* Visa Types */}
        <div className="space-y-8">
          {visas.map((visa, idx) => (
            <motion.div
              key={idx}
              id={visa.name.toLowerCase().replace(/\s+/g, '-')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card p-8 border-l-4 border-blue-600"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {visa.name}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {visa.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{visa.timeline}</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Requirements
                </h3>
                <ul className="space-y-3">
                  {visa.requirements.map((req, ridx) => (
                    <li key={ridx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  💡 This permit is available for {layer} applicants
                </div>
                <Link
                  href={`/${layer}/process`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  View application process →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 card p-8 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help Choosing?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Not sure which permit is right for you? Take our follow-up quiz to get personalized recommendations based on your specific situation.
          </p>
          <Link href={`/${layer}/quiz`} className="btn-primary inline-block">
            Take Follow-Up Quiz
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

