'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Clock, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { LAYER_CONTENT } from '@/lib/layerContent'
import type { LayerType } from '@/lib/layerLogic'

export default function ProcessPage() {
  const params = useParams()
  const layerParam = params?.layer as string
  const layer = (['europeans', 'americans', 'others'].includes(layerParam) 
    ? layerParam 
    : 'others') as LayerType
  
  const content = LAYER_CONTENT[layer]

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
            {content.process.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            {content.process.description}
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200 dark:bg-blue-900 hidden md:block" />
          <div className="space-y-12">
            {content.process.steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative flex items-start space-x-6"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl z-10 shadow-lg">
                  {step.step}
                </div>
                <div className="flex-1 card p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h2>
                    <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">{step.timeline}</span>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {step.description}
                  </p>
                  {idx < content.process.steps.length - 1 && (
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mt-4">
                      <ArrowLeft className="w-4 h-4 mr-2 rotate-[-90deg]" />
                      <span className="text-sm">Next: {content.process.steps[idx + 1].title}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 card p-8 bg-blue-50 dark:bg-blue-900"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 Pro Tips for {layer.charAt(0).toUpperCase() + layer.slice(1)}
          </h3>
          <ul className="space-y-3">
            {layer === 'europeans' && (
              <>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Register with your commune within 14 days of arrival - it's mandatory!</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">You don't need a job offer for the first 3 months - you can search while in Switzerland.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Consider G permit if you live near the border - it offers tax advantages.</span>
                </li>
              </>
            )}
            {layer === 'americans' && (
              <>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Start document apostille process early - it takes 4-6 weeks from the US.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Apply in January-March for best quota availability.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Negotiate salary of CHF 100k+ to be competitive in the quota system.</span>
                </li>
              </>
            )}
            {layer === 'others' && (
              <>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Quota timing is critical - apply early in the year (January-March) for best chances.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Choose cantons with lower competition - Basel, St. Gallen, or Aargau over Zurich/Geneva.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Consider education pathway - study in Switzerland first, then convert to work permit (no quota needed).</span>
                </li>
              </>
            )}
          </ul>
        </motion.div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href={`/${layer}/requirements`} className="btn-primary">
            View Requirements Checklist →
          </Link>
        </div>
      </div>
    </div>
  )
}

