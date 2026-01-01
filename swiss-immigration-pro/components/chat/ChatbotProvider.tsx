'use client'

import dynamic from 'next/dynamic'
import { SessionProvider } from '@/components/providers/SessionProvider'

// Dynamically import FloatingChatWidget to avoid SSR issues
const FloatingChatWidget = dynamic(
  () => import('@/components/chat/FloatingChatWidget'),
  { 
    ssr: false,
    loading: () => null
  }
)

export default function ChatbotProvider() {
  return (
    <SessionProvider>
      <FloatingChatWidget />
    </SessionProvider>
  )
}


