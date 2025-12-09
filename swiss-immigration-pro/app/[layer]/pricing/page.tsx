'use client'

import PricingContent from '@/components/pricing/PricingContent'
import LayerHeader from '@/components/layout/LayerHeader'
import { useParams } from 'next/navigation'
import { Globe, Star, AlertTriangle } from 'lucide-react'

export default function LayerPricingPage() {
  const params = useParams()
  const layerParam = params?.layer as string
  const layer = (layerParam === 'eu' || layerParam === 'us' || layerParam === 'other') 
    ? layerParam as 'eu' | 'us' | 'other'
    : 'eu' // fallback to eu if invalid

  // Layer-specific badge configuration
  const badge = {
    icon: layer === 'eu' ? <Star className="w-3.5 h-3.5" /> : layer === 'us' ? <AlertTriangle className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />,
    text: layer === 'eu' 
      ? 'EU/EFTA Freedom of Movement'
      : layer === 'us' 
      ? '2025 Quota Alert: Apply Early'
      : 'Global Citizens Pathway',
    bgColor: layer === 'eu' ? 'bg-blue-600' : layer === 'us' ? 'bg-slate-900' : 'bg-purple-600',
    textColor: 'text-white'
  }

  return (
    <div className="min-h-screen bg-white">
      <LayerHeader
        layer={layer}
        homeHref={`/${layer}`}
        customBadge={badge}
      />
      <PricingContent layer={layer} />
    </div>
  )
}

