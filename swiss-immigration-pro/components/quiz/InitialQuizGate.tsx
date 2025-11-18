'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, MapPin, Globe, ArrowRight } from 'lucide-react'

export function InitialQuizGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [showGate, setShowGate] = useState(false)

  useEffect(() => {
    // Check if user has completed the initial quiz or been assigned a layer
    const quizCompleted = localStorage.getItem('quizCompleted')
    const userLayer = localStorage.getItem('userLayer')
    const userRegion = localStorage.getItem('userRegion')

    // Show gate if no quiz/layer/region is detected
    if (!quizCompleted && !userLayer && !userRegion) {
      setShowGate(true)
    }
  }, [])

  if (!showGate) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Swiss Immigration Pro
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Let's personalize your experience. Take our quick quiz to get tailored guidance for your situation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">EU Citizens</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Simplified access with freedom of movement rights
            </p>
          </div>

          <div className="card p-6 text-center">
            <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">US/Canadians</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Work permit procedures and sponsorship guidance
            </p>
          </div>

          <div className="card p-6 text-center">
            <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">International</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Global pathways and embassy procedures
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/quiz"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Take the Quiz</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Takes less than 2 minutes • Personalized results • Completely free
          </p>
        </div>
      </motion.div>
    </div>
  )
}