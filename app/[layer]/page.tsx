'use client'

import { use, useEffect, useState, useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, TrendingUp, FileText, MapPin, Calendar, Award } from 'lucide-react'
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

      {/* CTA Section */}
      <section className={`py-24 bg-gradient-to-r ${colors.gradient} text-white`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Swiss Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get personalized guidance, tools, and resources for your immigration pathway
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={`/${layer}/quiz`} className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105">
              Take Follow-Up Quiz →
            </Link>
            <Link href="/pricing" className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 border border-white/30">
              Explore Premium Packs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

