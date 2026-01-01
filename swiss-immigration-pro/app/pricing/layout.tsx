import { Metadata } from 'next'
import { ClientLayout } from '@/components/providers/ClientLayout'

export const metadata: Metadata = {
  title: 'Swiss Immigration Pricing Plans | Free to Premium Options | Swiss Immigration Pro',
  description: 'Choose the perfect Swiss immigration plan for your journey. Free resources, Immigration Pack (CHF 9/mo), Advanced Pack (CHF 29/mo), and Citizenship Pro (CHF 79/mo). AI-powered tools, expert guidance, CV templates, and comprehensive roadmaps. Save CHF 5,000-15,000 compared to traditional consultants.',
  keywords: [
    'swiss immigration pricing',
    'swiss visa cost',
    'swiss immigration plans',
    'immigration pack switzerland',
    'swiss citizenship roadmap price',
    'affordable swiss immigration help',
    'swiss immigration consultant cost',
    'swiss work permit guide price',
    'swiss cv templates price',
    'swiss immigration course cost',
  ],
  openGraph: {
    title: 'Swiss Immigration Pricing Plans | Affordable Expert Guidance',
    description: 'Choose from free to premium Swiss immigration plans. AI-powered tools, expert guidance, and comprehensive roadmaps at a fraction of consultant costs.',
    type: 'website',
  },
  alternates: {
    canonical: '/pricing',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

