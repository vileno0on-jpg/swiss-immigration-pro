'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SessionProvider } from './SessionProvider'
import { InitialQuizGate } from '@/components/quiz/InitialQuizGate'
import { TranslationLoader } from '@/components/TranslationLoader'
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

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <SessionProvider>
      <ToastProvider>
        <TranslationLoader />
        <InitialQuizGate />
        {pathname && pathname !== '/' && !pathname.startsWith('/eu') && !pathname.startsWith('/us') && !pathname.startsWith('/other') ? (
          <Breadcrumbs />
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