import { Metadata } from 'next'
import { ClientLayout } from '@/components/providers/ClientLayout'

export const metadata: Metadata = {
  title: 'EU/EFTA Citizens Swiss Immigration | Freedom of Movement | No Quotas Required',
  description: 'Complete guide for EU/EFTA citizens immigrating to Switzerland. Benefit from freedom of movement - no quotas, simplified procedures, immediate work rights. 5-year path to Swiss citizenship. Expert guidance for Germans, French, Italians, and all EU nationals.',
  keywords: 'EU citizens Switzerland, EFTA immigration, German Swiss immigration, French Swiss immigration, Italian Swiss immigration, EU freedom of movement Switzerland, Swiss B permit EU, Swiss C permit EU, EU EFTA bilateral agreement, work in Switzerland EU',
  openGraph: {
    title: 'EU/EFTA Citizens | Swiss Immigration - Freedom of Movement',
    description: 'No quotas. Immediate work rights. 5-year citizenship path. Your complete guide to Swiss immigration as an EU/EFTA citizen.',
    type: 'website',
    url: 'https://swissimmigrationpro.com/eu',
  },
  alternates: {
    canonical: '/eu',
  },
}

export default function EULayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

