'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import type { LayerType } from '@/lib/layerLogic'

const CountryLanguageDetectionModal = dynamic(
  () => import('../CountryLanguageDetectionModal'),
  {
    ssr: false,
    loading: () => null,
  }
)

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
        // Don't auto-show on admin pages, layer pages, or if already completed
        if (pathname.startsWith('/admin') || pathname.startsWith('/europeans') || pathname.startsWith('/americans') || pathname.startsWith('/others')) {
          return
        }

        // Check if detection was already completed or skipped
        const detectionCompleted = localStorage.getItem('detectionCompleted')
        const detectionSkipped = localStorage.getItem('detectionSkipped')

        // Only auto-open if not completed and not skipped
        if (!detectionCompleted && !detectionSkipped) {
          const timer = setTimeout(() => {
            setIsOpen(true)
          }, 1000)
          return () => clearTimeout(timer)
        }
      }
    } catch {
      // Ignore localStorage access issues
    }
  }, [])

  const handleComplete = useCallback((data: {
    country: string
    countryName: string
    language: string
    currency: string
    layer: LayerType
  }) => {
    setIsOpen(false)
    // Preferences are saved in the modal component
  }, [])

  if (!isOpen) return null

  return (
    <CountryLanguageDetectionModal
      key={isOpen ? 'open' : 'closed'}
      isOpen={isOpen}
      onClose={closeQuiz}
      onComplete={handleComplete}
    />
  )
}

