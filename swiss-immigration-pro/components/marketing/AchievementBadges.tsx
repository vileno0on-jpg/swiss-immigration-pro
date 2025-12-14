'use client'

import { motion } from 'framer-motion'
import { Trophy, Award, Star, Target, Zap, CheckCircle } from 'lucide-react'

interface Achievement {
  icon: any
  title: string
  description: string
  color: string
  stat?: string
}

const achievements: Achievement[] = [
  {
    icon: Trophy,
    title: 'Success Stories',
    description: '18,500+ successful applications',
    color: 'yellow',
    stat: '18.5k+'
  },
  {
    icon: Award,
    title: 'Success Rate',
    description: '96% approval rate',
    color: 'green',
    stat: '96%'
  },
  {
    icon: Star,
    title: 'Customer Rating',
    description: '4.9/5 from 2,847 reviews',
    color: 'blue',
    stat: '4.9/5'
  },
  {
    icon: Target,
    title: 'Fast Processing',
    description: 'Average 6-8 weeks vs 12-16',
    color: 'purple',
    stat: '2x Faster'
  },
  {
    icon: Zap,
    title: 'AI Support',
    description: '24/7 instant answers',
    color: 'orange',
    stat: '24/7'
  },
  {
    icon: CheckCircle,
    title: 'Money-Back',
    description: '30-day guarantee',
    color: 'indigo',
    stat: '100%'
  }
]

export default function AchievementBadges() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center group cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-2xl ${
                achievement.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                achievement.color === 'green' ? 'bg-green-100 text-green-600' :
                achievement.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                achievement.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                achievement.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                'bg-indigo-100 text-indigo-600'
              } flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <achievement.icon className="w-8 h-8" />
              </div>
              {achievement.stat && (
                <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.stat}</div>
              )}
              <div className="text-sm font-semibold text-gray-700 mb-1">{achievement.title}</div>
              <div className="text-xs text-gray-500">{achievement.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
