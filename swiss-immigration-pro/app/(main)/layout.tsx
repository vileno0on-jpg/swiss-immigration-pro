import React from 'react'
import { ClientLayout } from '@/components/providers/ClientLayout'

// Force dynamic rendering for all pages in this route group
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}





