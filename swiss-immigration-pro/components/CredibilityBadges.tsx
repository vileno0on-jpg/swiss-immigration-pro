'use client'

import { motion } from 'framer-motion'
import { Shield, Users, Award, TrendingUp, FileCheck, MessageCircle } from 'lucide-react'

export default function CredibilityBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'Verified Legal Partner',
      description: 'Partnered with certified Swiss immigration lawyers',
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900'
    },
    {
      icon: Award,
      title: 'Expert Team',
      description: 'Certified immigration professionals & lawyers',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900'
    },
    {
      icon: FileCheck,
      title: 'Official Data Sources',
      description: 'Data from SEM, cantonal migration offices, embassies',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900'
    },
    {
      icon: Users,
      title: '10,000+ Success Stories',
      description: 'Real immigrants sharing their journeys',
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900'
    },
    {
      icon: MessageCircle,
      title: '24/7 AI Support',
      description: 'Instant answers to your questions',
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-900'
    },
    {
      icon: TrendingUp,
      title: 'Success Rate: 92%',
      description: 'Higher approval rate with our guidance',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900'
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Immigrants Worldwide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Built on decades of Swiss immigration expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, idx) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
            >
              <div className={`w-14 h-14 rounded-full ${badge.bg} flex items-center justify-center mb-4`}>
                <badge.icon className={`w-7 h-7 ${badge.color}`} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
                {badge.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

