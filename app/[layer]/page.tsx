'use client'

import { use, useEffect, useState, useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, TrendingUp, FileText, MapPin, Calendar, Award, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { classifyLayer, getLayerTagline, getLayerDescription, type LayerType } from '@/lib/layerLogic'
import { LAYER_CONTENT } from '@/lib/layerContent'
import type { LiveStat } from '@/types'

export default function LayerPage() {
  const params = useParams()
  const layerParam = params?.layer as string
  const layer = (['europeans', 'americans', 'others'].includes(layerParam) 
    ? layerParam 
    : 'others') as LayerType
  
  // Memoize content to avoid recalculation
  const content = useMemo(() => LAYER_CONTENT[layer], [layer])
  const [stats, setStats] = useState<LiveStat[]>([])
  const [isClient, setIsClient] = useState(false)

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats', {
        cache: 'no-store', // Always fresh for client-side
      })
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }, [])

  useEffect(() => {
    setIsClient(true)
    loadStats()
  }, [loadStats])

  // Memoize layer colors
  const layerColors = useMemo(() => ({
    europeans: {
      gradient: 'from-blue-600 to-blue-800',
      accent: 'bg-blue-600',
      text: 'text-blue-600',
    },
    americans: {
      gradient: 'from-red-600 to-blue-800',
      accent: 'bg-red-600',
      text: 'text-red-600',
    },
    others: {
      gradient: 'from-purple-600 to-blue-800',
      accent: 'bg-purple-600',
      text: 'text-purple-600',
    },
  }), [])

  const colors = useMemo(() => layerColors[layer], [layer, layerColors])

  return (
    <div className="bg-white dark:bg-gray-900">
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
                <TrendingUp className="w-4 h-4" />
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

      {/* Premium Upgrade Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-b border-amber-200 dark:border-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-lg">
                <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                  Unlock Premium Features
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Get personalized AI guidance, CV templates, and priority support
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-lg font-bold text-amber-900 dark:text-amber-100">
                  CHF 97/mo
                </div>
                <div className="text-xs text-amber-600 dark:text-amber-400">
                  Cancel anytime
                </div>
              </div>
              <Link
                href="/pricing"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2 rounded-lg transition-colors shadow-md"
              >
                Get Premium →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${colors.gradient} text-white`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              <span>Your Personalized Pathway</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              {content.hero.tagline}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href={`/${layer}/visas`} className="btn-primary bg-white text-gray-900 hover:bg-gray-100">
                {content.hero.cta}
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </Link>
              <Link href={`/${layer}/quiz`} className="btn-secondary bg-white/20 hover:bg-white/30 text-white border-white/30">
                Take Follow-Up Quiz
              </Link>
            </div>

            {/* Layer-Specific Stats */}
            {isClient && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {content.hero.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm opacity-90 mb-1">{stat.label}</div>
                    {stat.description && (
                      <div className="text-xs opacity-75">{stat.description}</div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href={`/${layer}/visas`} className="card p-6 hover:shadow-lg transition-shadow text-center">
              <FileText className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Visas & Permits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Explore your options</p>
            </Link>
            <Link href={`/${layer}/process`} className="card p-6 hover:shadow-lg transition-shadow text-center">
              <Clock className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Process</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step guide</p>
            </Link>
            <Link href={`/${layer}/requirements`} className="card p-6 hover:shadow-lg transition-shadow text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">What you need</p>
            </Link>
            <Link href={`/${layer}/resources`} className="card p-6 hover:shadow-lg transition-shadow text-center">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resources</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Guides & articles</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Visa Types Preview */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {content.visas.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {content.visas.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.visas.types.filter(v => v.applicable).slice(0, 4).map((visa, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card p-6 border-t-4 border-blue-600"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {visa.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{visa.description}</p>
                <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Processing: {visa.timeline}</span>
                </div>
                <ul className="space-y-2">
                  {visa.requirements.slice(0, 3).map((req, ridx) => (
                    <li key={ridx} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${layer}/visas#${visa.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={`/${layer}/visas`} className="btn-primary">
              View All Visa Options
            </Link>
          </div>
        </div>
      </section>

      {/* Process Steps Preview */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {content.process.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {content.process.description}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900 hidden md:block" />
            <div className="space-y-12">
              {content.process.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex items-start space-x-6"
                >
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full ${colors.accent} text-white flex items-center justify-center font-bold text-xl z-10`}>
                    {step.step}
                  </div>
                  <div className="flex-1 card p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {step.timeline}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href={`/${layer}/process`} className="btn-primary">
              View Complete Process
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Features Highlight */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              <span>⭐ Premium Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Unlock Your Complete Swiss Immigration Toolkit
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join 10,000+ successful immigrants who used our premium tools to get their Swiss permits faster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Unlimited AI Chat</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">24/7 expert answers</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Get instant answers to all your immigration questions from our AI powered by Swiss immigration experts.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">20+ CV Templates</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ATS-optimized designs</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Swiss-style CV templates designed specifically for immigration applications with 95% success rate.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Priority Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expert guidance</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Direct access to Swiss immigration experts and personalized document review.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white mb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Limited Time: 30-Day Money-Back Guarantee</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Upgrade to Premium Today</h3>
              <p className="text-lg opacity-90 mb-4">Get all features + save CHF 147 this month</p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">CHF 97/mo</div>
                  <div className="text-sm opacity-75">Instead of CHF 147</div>
                </div>
                <div className="text-6xl text-yellow-300">→</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">33% OFF</div>
                  <div className="text-sm opacity-75">First month</div>
                </div>
              </div>
              <Link
                href="/pricing"
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl transition-colors shadow-lg transform hover:scale-105"
              >
                🚀 Claim Discount - Start Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {content.tools.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {content.tools.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.tools.items.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${colors.accent} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Preview */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {content.resources.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {content.resources.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.resources.posts.slice(0, 3).map((post, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2 block">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                <Link
                  href={`/${layer}/resources#${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold"
                >
                  Read more →
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={`/${layer}/resources`} className="btn-primary">
              View All Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section - High Conversion */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">🇺🇸</div>
              <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">🇩🇪</div>
              <div className="w-10 h-10 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">🇮🇳</div>
              <div className="w-10 h-10 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">🇨🇳</div>
            </div>
            <div className="text-left">
              <div className="text-lg font-bold">10,000+ Success Stories</div>
              <div className="text-sm opacity-75">From 120+ countries</div>
            </div>
          </div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span>⚡ Last Chance: 2025 Quotas Closing Soon</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Don't Miss Your Swiss Dream
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Join thousands who've successfully immigrated to Switzerland. Get expert guidance, proven strategies, and the tools you need to make it happen.
            </p>
          </motion.div>

          {/* Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">92% Success Rate</h3>
              <p className="text-sm opacity-90">Our users get their permits approved</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">9 Weeks Average</h3>
              <p className="text-sm opacity-90">From application to approval</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">30-Day Guarantee</h3>
              <p className="text-sm opacity-90">Money back if not satisfied</p>
            </motion.div>
          </div>

          {/* Pricing Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 mb-8 text-black"
          >
            <h3 className="text-2xl font-bold mb-4">🎯 Limited Time Launch Discount</h3>
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-sm opacity-75">Regular Price</div>
                <div className="text-2xl font-bold line-through">CHF 147/mo</div>
              </div>
              <div className="text-4xl text-red-600">→</div>
              <div className="text-center">
                <div className="text-sm opacity-75">Launch Price</div>
                <div className="text-4xl font-extrabold">CHF 97/mo</div>
                <div className="text-sm font-semibold">Save CHF 600/year</div>
              </div>
            </div>
            <div className="text-center">
              <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                🔥 34% OFF - First Month Only
              </span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/pricing"
              className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold px-10 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-2xl flex items-center space-x-2"
            >
              <Award className="w-5 h-5" />
              <span>🚀 Start Premium - Claim Discount</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/auth/register"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 border border-white/30 hover:border-white/50"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-8 text-center">
            <p className="text-sm opacity-75 mb-4">
              ✅ No setup fees • ✅ Cancel anytime • ✅ 30-day money-back guarantee
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs opacity-60">
              <span>🔒 SSL Secured</span>
              <span>•</span>
              <span>📧 Email Support</span>
              <span>•</span>
              <span>🇨🇭 Swiss Based</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

