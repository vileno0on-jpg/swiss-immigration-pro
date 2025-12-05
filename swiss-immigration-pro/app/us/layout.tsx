import { Metadata } from 'next'
import { ClientLayout } from '@/components/providers/ClientLayout'

export const metadata: Metadata = {
  title: 'US Citizens Swiss Immigration | Work Permits & Investor Visas | Third-Country Pathway',
  description: 'Complete Swiss immigration guide for US citizens. Navigate quota system, secure work permits with CHF 80k+ salary requirements, explore investor visas. Expert guidance for American professionals, executives, and entrepreneurs moving to Switzerland.',
  keywords: 'US citizens Switzerland immigration, American work permit Switzerland, US Swiss visa, American expat Switzerland, US investor visa Switzerland, L permit US, B permit US, Swiss work visa Americans, US executives Switzerland, American professionals Swiss immigration',
  openGraph: {
    title: 'US Citizens | Swiss Immigration - Professional Pathway',
    description: 'Expert guidance for American professionals seeking Swiss residency. Navigate quotas, secure permits, achieve your Swiss dream.',
    type: 'website',
    url: 'https://swissimmigrationpro.com/us',
  },
  alternates: {
    canonical: '/us',
  },
}

export default function USLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

