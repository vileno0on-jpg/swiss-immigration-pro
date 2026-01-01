'use client'

import MainHeader from '@/components/layout/MainHeader'
import PricingContent from '@/components/pricing/PricingContent'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      <PricingContent layer="default" />
    </div>
  )
}
