'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, TrendingUp, FileText, MapPin, Calendar, Award, MessageCircle, Star, Shield } from 'lucide-react'
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
    gradient: 'from-red-600 to-blue-600',
    accent: 'bg-red-600',
    text: 'text-red-600',
  }

  const heroStats = [
    { value: 'H-1B', label: 'Work Visa', description: 'Specialty occupation' },
    { value: 'E-2', label: 'Treaty Investor', description: 'Business visa' },
    { value: 'L-1', label: 'Intra-company', description: 'Transfer visa' },
    { value: 'Perm', label: 'Green Card', description: 'Permanent residency' }
  ]

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className={`relative overflow-hidden bg-gradient-to-br ${regionColors.gradient} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              <span>US Pathway</span>
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
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/us/visas" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <FileText className="w-8 h-8 mx-auto mb-3 text-red-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Work Visas</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">H-1B, E-2, L-1 visas</p>
            </Link>
            <Link href="/us/process" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <Clock className="w-8 h-8 mx-auto mb-3 text-red-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Application Process</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step guide</p>
            </Link>
            <Link href="/us/requirements" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-red-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">What you need</p>
            </Link>
            <Link href="/us/resources" className="card p-6 hover:shadow-lg transition-shadow text-center">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-red-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resources</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">US-focused guides</p>
            </Link>
          </div>
        </div>
      </section>

      <div className="text-center py-12">
        <Link href="/us/visas" className="btn-primary">
          Explore US Advantages
        </Link>
      </div>
    </div>
  )
}