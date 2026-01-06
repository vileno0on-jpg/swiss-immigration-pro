'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SessionProvider } from './SessionProvider'
import { InitialQuizGate } from '@/components/quiz/InitialQuizGate'
import { TranslationLoader } from '@/components/TranslationLoader'
import ScrollToTop from '@/components/layout/ScrollToTop'
import Footer from '@/components/layout/Footer'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { ChatbotProvider } from '@/components/chatbot/ChatbotProvider'
import ChatbotWidget from '@/components/chatbot/ChatbotWidget'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <SessionProvider>
      <ToastProvider>
        <ChatbotProvider>
          <TranslationLoader />
          <InitialQuizGate />
          <main id="main-content" className="flex-1 transition-all duration-300 ease-out">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <ChatbotWidget />
        </ChatbotProvider>
      </ToastProvider>
    </SessionProvider>
  )
}