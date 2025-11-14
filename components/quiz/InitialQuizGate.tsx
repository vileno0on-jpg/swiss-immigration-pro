'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import type { QuizAnswers } from '@/lib/layerLogic'

const InitialQuizModal = dynamic(() => import('./InitialQuizModal'), {
  ssr: false,
  loading: () => null,
})

type LayerType = 'europeans' | 'americans' | 'others'

declare global {
  interface Window {
    openInitialQuiz?: () => void
  }
}

export function InitialQuizGate() {
  const [isOpen, setIsOpen] = useState(false)

  const openQuiz = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeQuiz = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    window.openInitialQuiz = openQuiz
    return () => {
      delete window.openInitialQuiz
    }
  }, [openQuiz])

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const pathname = window.location.pathname
        if (pathname.startsWith('/admin')) {
          return
        }
      }

      const quizCompleted = typeof window !== 'undefined'
        ? window.localStorage.getItem('quizCompleted')
        : null

      if (!quizCompleted) {
        const timer = setTimeout(() => {
          setIsOpen(true)
        }, 1200)
        return () => clearTimeout(timer)
      }
    } catch {
      // Ignore localStorage access issues
    }
  }, [])

  const handleComplete = useCallback((answers: QuizAnswers, layer: LayerType) => {
    setIsOpen(false)
  }, [])

  return useMemo(() => (
    <InitialQuizModal
      key={isOpen ? 'open' : 'closed'}
      isOpen={isOpen}
      onClose={closeQuiz}
      onComplete={handleComplete}
    />
  ), [isOpen, closeQuiz, handleComplete])
}

