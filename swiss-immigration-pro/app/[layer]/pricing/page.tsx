'use client'

import PricingContent from '@/components/pricing/PricingContent'
import { useParams } from 'next/navigation'
import { use } from 'react'
import LayerHeader from '@/components/layout/LayerHeader'
import { Star, AlertTriangle, Globe } from 'lucide-react'

export default function LayerPricingPage() {
  const params = use(params)
  const layerParam = params?.layer as string
  const layer = (layerParam === 'eu' || layerParam === 'us' || layerParam === 'other') 
    ? layerParam as 'eu' | 'us' | 'other'
    : 'eu' // fallback to eu if invalid

  // Map old layer names to new format
  const layerForHeader = layerParam === 'europeans' ? 'eu' : layerParam === 'americans' ? 'us' : layerParam === 'others' ? 'other' : layer
  const homeHref = `/${layerForHeader}`

  // Layer-specific badge configuration
  const badge = {
    icon: layerForHeader === 'eu' ? <Star className="w-3.5 h-3.5" /> : layerForHeader === 'us' ? <AlertTriangle className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />,
    text: layerForHeader === 'eu' 
      ? 'EU/EFTA Freedom of Movement'
      : layerForHeader === 'us' 
      ? '2025 Quota Alert: Apply Early'
      : 'Global Citizens Pathway',
    bgColor: layerForHeader === 'eu' ? 'bg-blue-600' : layerForHeader === 'us' ? 'bg-slate-900' : 'bg-purple-600',
    textColor: 'text-white'
  }

  return (
    <div className="min-h-screen bg-white">
      <LayerHeader
        layer={layerForHeader as 'eu' | 'us' | 'other'}
        homeHref={homeHref}
        customBadge={badge}
      />
      <PricingContent layer={layer} />
    </div>
  )
}

