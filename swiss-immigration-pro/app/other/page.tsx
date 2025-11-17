'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, TrendingUp, FileText, MapPin, Calendar, Award, MessageCircle, Star, Globe } from 'lucide-react'
import Link from 'next/link'
import { getRegionTagline, getRegionDescription, RegionType } from '@/lib/geolocation'
import type { LiveStat } from '@/types'

const region: RegionType = 'other'

export default function OtherPage() {
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
    gradient: 'from-purple-600 to-blue-600',
    accent: 'bg-purple-600',
    text: 'text-purple-600',
  }

  const heroStats = [
    { value: 'Annual Quotas', label: 'Permit System', description: 'Limited availability' },
    { value: 'Competitive', label: 'Application Process', description: 'Points-based system' },
    { value: '8-12 Weeks', label: 'Processing Time', description: 'Average timeline' },
    { value: 'Multiple', label: 'Pathways Available', description: 'Work, study, family' }
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
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors shadow-sm"
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
              <Globe className="w-4 h-4" />
              <span>International Pathway</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              {getRegionTagline(region)}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              {getRegionDescription(region)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/other/visas" className="btn-primary bg-white text-gray-900 hover:bg-gray-100">
                Explore Pathways
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </Link>
              <Link href="/other/requirements" className="btn-secondary bg-white/20 hover:bg-white/30 text-white border-white/30">
                Check Eligibility
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
            <Link href="/other/visas" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <FileText className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Visa Options</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Multiple pathways</p>
            </Link>
            <Link href="/other/process" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <Clock className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Application Process</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step guide</p>
            </Link>
            <Link href="/other/requirements" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Points system</p>
            </Link>
            <Link href="/other/resources" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resources</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Country-specific guides</p>
            </Link>
          </div>
        </div>
      </section>

      {/* International Pathways */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              International Immigration Pathways
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive support for third-country nationals with multiple visa options and strategic pathways to Swiss residency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6 border-t-4 border-purple-600"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Work Visa (B Permit)
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">For skilled professionals with job offers from Swiss employers.</p>
              <div className="flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>Processing: 8-12 weeks</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Swiss employer sponsorship required</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Subject to annual quotas</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Valid for 1 year initially</span>
                </li>
              </ul>
              <Link
                href="/other/visas#work-visa"
                className="text-purple-600 dark:text-purple-400 hover:underline"
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
                EU Blue Card (EU Blue Card)
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">EU-wide work permit for highly qualified non-EU citizens.</p>
              <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>Processing: 30-60 days</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Minimum salary: CHF 80,000+</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Higher education degree required</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Fast-track to permanent residency</span>
                </li>
              </ul>
              <Link
                href="/other/visas#blue-card"
                className="text-green-600 dark:text-green-400 hover:underline"
              >
                Learn more →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6 border-t-4 border-blue-600"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Student Visa
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">For international students accepted into Swiss universities.</p>
              <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>Processing: 4-6 weeks</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>University acceptance letter required</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Financial proof for living expenses</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Work permission after 6 months</span>
                </li>
              </ul>
              <Link
                href="/other/visas#student-visa"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Learn more →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6 border-t-4 border-orange-600"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Family Reunification
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Join family members who are already legally residing in Switzerland.</p>
              <div className="flex items-center space-x-2 text-sm text-orange-600 dark:text-orange-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>Processing: 8-12 weeks</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Sponsor must have stable residency</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Proof of relationship required</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Financial support may be required</span>
                </li>
              </ul>
              <Link
                href="/other/visas#family-visa"
                className="text-orange-600 dark:text-orange-400 hover:underline"
              >
                Learn more →
              </Link>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link href="/other/visas" className="btn-primary">
              View All International Pathways
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional International Immigration Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Expert guidance for third-country nationals navigating Swiss immigration quotas and requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Global Immigration AI</h3>
                  <p className="text-sm text-gray-600">Multi-country expertise</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                AI assistant with knowledge of immigration systems from 120+ countries, tailored to Swiss requirements.
              </p>
              <div className="text-sm text-purple-600 font-medium">Premium feature</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Quota System Navigation</h3>
                  <p className="text-sm text-gray-600">Strategic timing</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Expert guidance on permit quotas, optimal application timing, and alternative pathways when quotas are full.
              </p>
              <div className="text-sm text-purple-600 font-medium">Premium feature</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Embassy Coordination</h3>
                  <p className="text-sm text-gray-600">Global network</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Direct coordination with Swiss embassies worldwide for expedited document processing and visa appointments.
              </p>
              <div className="text-sm text-purple-600 font-medium">Premium feature</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}