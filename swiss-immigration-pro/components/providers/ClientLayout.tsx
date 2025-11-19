'use client'

import React, { useEffect, useState } from 'react'
import { SessionProvider } from './SessionProvider'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frameId)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}