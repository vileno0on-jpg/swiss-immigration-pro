'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, TrendingUp, FileText, MapPin, Calendar, Award, MessageCircle, Star } from 'lucide-react'
import Link from 'next/link'
import { getRegionTagline, getRegionDescription, RegionType } from '@/lib/geolocation'
import type { LiveStat } from '@/types'

const region: RegionType = 'us'

export default function USPage() {
  const [stats, setStats] = useState<LiveStat[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const res = await fetch('/api/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const regionColors = {
    gradient: 'from-blue-600 to-red-600',
    accent: 'bg-blue-600',
    text: 'text-blue-600',
  }

  const heroStats = [
    { value: '2-4 Years', label: 'Typical Timeline', description: 'From application to permit' },
    { value: 'CHF 80k+', label: 'Salary Threshold', description: 'For work permits' },
    { value: 'High', label: 'Success Rate', description: 'With proper preparation' },
    { value: 'Multiple', label: 'Pathways Available', description: 'Work, investment, family' }
  ]

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

      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${regionColors.gradient} text-white`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4" />
              <span>United States Pathway</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              {getRegionTagline(region)}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              {getRegionDescription(region)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/us/visas" className="btn-primary bg-white text-gray-900 hover:bg-gray-100">
                Explore US Pathways
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </Link>
              <Link href="/us/requirements" className="btn-secondary bg-white/20 hover:bg-white/30 text-white border-white/30">
                View Requirements
              </Link>
            </div>

            {/* Region-Specific Stats */}
            {isClient && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {heroStats.map((stat, idx) => (
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
            <Link href="/us/visas" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <FileText className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Visas & Permits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">US-specific pathways</p>
            </Link>
            <Link href="/us/process" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <Clock className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Process</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step guide</p>
            </Link>
            <Link href="/us/requirements" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">What you need</p>
            </Link>
            <Link href="/us/resources" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resources</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">US-focused guides</p>
            </Link>
          </div>
        </div>
      </section>

      {/* US-Specific Pathways */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              US Citizen & Resident Pathways
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Specialized immigration pathways designed for US citizens and permanent residents seeking Swiss opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6 border-t-4 border-blue-600"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Work Visa Pathway
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">For US professionals with job offers from Swiss companies.</p>
              <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>Processing: 2-4 weeks</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Salary threshold: CHF 80,000+ annually</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Swiss company sponsorship required</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Valid for up to 3 years initially</span>
                </li>
              </ul>
              <Link
                href="/us/visas#work-visa"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Learn more →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 border-t-4 border-green-600"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Investor Visa Pathway
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">For US investors looking to establish businesses in Switzerland.</p>
              <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>Processing: 4-8 weeks</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Minimum investment: CHF 500,000</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Job creation requirement</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Fast-track to permanent residency</span>
                </li>
              </ul>
              <Link
                href="/us/visas#investor-visa"
                className="text-green-600 dark:text-green-400 hover:underline"
              >
                Learn more →
              </Link>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link href="/us/visas" className="btn-primary">
              View All US Pathways
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional US Immigration Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Specialized support for US citizens navigating the Swiss immigration system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">US-Swiss AI Assistant</h3>
                  <p className="text-sm text-gray-600">Tailored for US citizens</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                AI-powered guidance specifically trained on US-to-Switzerland immigration patterns and requirements.
              </p>
              <div className="text-sm text-blue-600 font-medium">Premium feature</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">US-Style Templates</h3>
                  <p className="text-sm text-gray-600">Familiar document formats</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Swiss immigration documents formatted in US-style layouts with familiar terminology and structure.
              </p>
              <div className="text-sm text-blue-600 font-medium">Premium feature</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">US Embassy Coordination</h3>
                  <p className="text-sm text-gray-600">Streamlined processes</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Direct coordination with US embassy processes and expedited document authentication services.
              </p>
              <div className="text-sm text-blue-600 font-medium">Premium feature</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}