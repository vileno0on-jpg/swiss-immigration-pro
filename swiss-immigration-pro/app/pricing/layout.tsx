import { Metadata } from 'next'
import { ClientLayout } from '@/components/providers/ClientLayout'

export const metadata: Metadata = {
  title: 'Pricing Plans | Swiss Immigration Pro',
  description: 'Choose your Swiss immigration plan. Free, Immigration Pack, Advanced Pack, and Citizenship Pro. Save CHF 5,000-15,000 vs consultants.',
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

