import { Metadata } from 'next'
import { ClientLayout } from '@/components/providers/ClientLayout'

export const metadata: Metadata = {
  title: 'Swiss Immigration Tools | Cost Calculator & Timeline Planner',
  description: 'Interactive calculators for Swiss immigration: cost calculator, timeline planner, and canton comparison. Plan your move to Switzerland.',
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

