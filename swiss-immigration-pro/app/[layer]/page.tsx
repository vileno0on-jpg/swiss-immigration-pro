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
      {/* Professional Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Professional Benefits */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>AI-Powered Guidance</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Professional Templates</span>
              </div>
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Expert Support</span>
              </div>
            </div>

            {/* Professional CTA */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:inline">Ready to accelerate your application?</span>
              <Link
                href="/pricing"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors shadow-sm"
              >
                View Premium Plans
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Value Proposition */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Professional Immigration Support
                </h3>
                <p className="text-sm text-gray-600">
                  Access comprehensive tools and expert guidance designed for serious applicants
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Starting from</div>
                <div className="text-xl font-bold text-gray-900">CHF 97/month</div>
              </div>
              <Link
                href="/pricing"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Explore Plans
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
              <Link href={`/${layer}/requirements`} className="btn-secondary bg-white/20 hover:bg-white/30 text-white border-white/30">
                Check Requirements
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

      {/* Professional Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Immigration Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional tools and expert guidance trusted by thousands of successful applicants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">AI-Powered Assistance</h3>
                  <p className="text-sm text-gray-600">Intelligent guidance system</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Advanced AI technology provides personalized answers to your immigration questions, available 24/7.
              </p>
              <div className="text-sm text-blue-600 font-medium">Premium feature</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Professional Templates</h3>
                  <p className="text-sm text-gray-600">Swiss-standard documents</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Industry-standard CV and document templates specifically designed for Swiss immigration requirements.
              </p>
              <div className="text-sm text-blue-600 font-medium">Premium feature</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Expert Consultation</h3>
                  <p className="text-sm text-gray-600">Professional immigration support</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Direct access to certified immigration specialists for personalized guidance and document review.
              </p>
              <div className="text-sm text-blue-600 font-medium">Premium feature</div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready for Professional Support?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join thousands of successful applicants who have accelerated their Swiss immigration journey with our comprehensive premium services.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">CHF 97/month</div>
                  <div className="text-sm text-gray-600">Professional plan</div>
                </div>
              </div>
              <Link
                href="/pricing"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-sm"
              >
                View Premium Plans
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

      {/* Professional CTA Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">10,000+</div>
              <div className="text-sm text-gray-600">Successful Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">92%</div>
              <div className="text-sm text-gray-600">Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">120+</div>
              <div className="text-sm text-gray-600">Countries Served</div>
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Swiss Immigration Journey Starts Here
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Access professional tools and expert guidance designed to streamline your Swiss immigration process.
              Join thousands of successful applicants who have achieved their immigration goals.
            </p>
          </div>

          {/* Service Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Proven Success Rate</h3>
              <p className="text-gray-600 text-sm">92% of our premium users successfully obtain their Swiss permits</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Faster Processing</h3>
              <p className="text-gray-600 text-sm">Average 9 weeks from application to permit approval</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">Professional immigration consultants and document review</p>
            </div>
          </div>

          {/* Professional CTA */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Take the Next Step?</h3>
            <p className="text-gray-600 mb-6">
              Choose the professional plan that best fits your immigration needs.
            </p>
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">CHF 97/month</div>
                <div className="text-sm text-gray-600">Professional Plan</div>
              </div>
              <div className="text-gray-300">•</div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">CHF 147/month</div>
                <div className="text-sm text-gray-600">Citizenship Plan</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-sm"
              >
                Compare Plans
              </Link>
              <Link
                href="/auth/register"
                className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors border border-gray-300"
              >
                Start Free Account
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-3 h-3 text-purple-600" />
                </div>
                <span>Swiss Based</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

