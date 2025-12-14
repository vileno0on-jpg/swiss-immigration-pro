'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Clock, Users, TrendingUp, X } from 'lucide-react'

interface UrgencyMessage {
  id: string
  type: 'quota' | 'deadline' | 'popular'
  message: string
  subtext?: string
  icon: any
  color: string
}

const urgencyMessages: UrgencyMessage[] = [
  {
    id: 'quota',
    type: 'quota',
    message: '⚠️ Limited Quota Remaining: Only 23% of 2026 Non-EU permits left',
    subtext: 'Last year, quotas filled by March. Don\'t miss your chance.',
    icon: AlertCircle,
    color: 'orange'
  },
  {
    id: 'popular',
    type: 'popular',
    message: '🔥 247 people joined this week',
    subtext: 'Join the growing community of successful applicants',
    icon: Users,
    color: 'blue'
  },
  {
    id: 'deadline',
    type: 'deadline',
    message: '⏰ Early Bird: Save 30% on Annual Plans - Ends in 7 days',
    subtext: 'Lock in the best price before the offer expires',
    icon: Clock,
    color: 'green'
  }
]

export default function UrgencyBanner() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % urgencyMessages.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const message = urgencyMessages[currentMessage]

  if (!isVisible) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMessage}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`bg-gradient-to-r ${
          message.color === 'orange' ? 'from-orange-500 to-red-500' :
          message.color === 'blue' ? 'from-blue-500 to-indigo-500' :
          'from-green-500 to-emerald-500'
        } text-white py-3 px-4 relative overflow-hidden`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <message.icon className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <div className="flex-1">
                <div className="font-bold text-sm md:text-base">
                  {message.message}
                </div>
                {message.subtext && (
                  <div className="text-xs md:text-sm opacity-90 mt-1">
                    {message.subtext}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-30"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
