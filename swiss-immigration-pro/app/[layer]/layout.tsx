import { ClientLayout } from '@/components/providers/ClientLayout'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { layer: string } }): Promise<Metadata> {
  const layer = params?.layer || 'others'
  const layerNames = {
    europeans: 'EU/EFTA Citizens',
    americans: 'US/Canadian Citizens',
    others: 'International Citizens',
  }
  const layerName = layerNames[layer as keyof typeof layerNames] || 'International Citizens'

  return {
    title: `${layerName} - Swiss Immigration Guide | Swiss Immigration Pro`,
    description: `Comprehensive Swiss immigration guide for ${layerName}. Expert guidance for work permits, visas, and citizenship. 96% success rate. Join 18,500+ successful applicants.`,
    keywords: `Swiss immigration ${layerName}, Switzerland visa ${layer}, Swiss work permit ${layer}, ${layerName} Switzerland, Swiss citizenship ${layer}`,
    openGraph: {
      title: `${layerName} - Swiss Immigration Guide`,
      description: `Expert Swiss immigration guidance for ${layerName}. 96% success rate.`,
      url: `https://swissimmigrationpro.com/${layer}`,
      type: 'website',
    },
    alternates: {
      canonical: `/${layer}`,
    },
  }
}

export default function LayerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}














