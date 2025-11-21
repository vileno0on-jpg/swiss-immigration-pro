'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SessionProvider } from './SessionProvider'
import { InitialQuizGate } from '@/components/quiz/InitialQuizGate'
import { TranslationLoader } from '@/components/TranslationLoader'
import Header from '@/components/layout/Header'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ScrollToTop from '@/components/layout/ScrollToTop'
import { ToastProvider } from '@/components/providers/ToastProvider'
import dynamic from 'next/dynamic'

// Dynamically import FloatingChatWidget to avoid SSR issues - completely separate component
const FloatingChatWidget = dynamic(
  () => import('@/components/chat/FloatingChatWidget'),
  { 
    ssr: false,
    loading: () => null
  }
)

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  
  // Hide header on home page - check for exact root path
  // Normalize pathname by removing trailing slash and checking for root
  const isHomePage = React.useMemo(() => {
    if (!pathname) return true // Assume home if no pathname yet
    const normalized = pathname.replace(/\/$/, '').split('?')[0] // Remove trailing slash and query params
    return normalized === '' || normalized === '/'
  }, [pathname])

  useEffect(() => {
    setMounted(true)
    
    // Add class to body based on route for CSS fallback
    if (isHomePage) {
      document.body.classList.add('home-page')
    } else {
      document.body.classList.remove('home-page')
    }
    
    return () => {
      document.body.classList.remove('home-page')
    }
  }, [isHomePage])

  // Don't render anything until mounted to prevent flash
  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <SessionProvider>
      <ToastProvider>
        <TranslationLoader />
        <InitialQuizGate />
        {!isHomePage && pathname ? (
          <>
            <Header />
            <Breadcrumbs />
          </>
        ) : null}
        <main id="main-content" className="flex-1 transition-all duration-300 ease-out">
          {children}
        </main>
        <ScrollToTop />
        <FloatingChatWidget />
      </ToastProvider>
    </SessionProvider>
  )
}