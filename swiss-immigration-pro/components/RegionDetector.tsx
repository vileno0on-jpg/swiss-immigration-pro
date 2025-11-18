'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { detectRegionFromIP, RegionType, storeRegionDetection } from '@/lib/geolocation'

export default function RegionDetector() {
  const router = useRouter()
  const [isDetecting, setIsDetecting] = useState(true)

  useEffect(() => {
    const detectRegion = async () => {
      try {
        // Check if user has already been detected
        const storedRegion = localStorage.getItem('userRegion') as RegionType | null
        if (storedRegion && ['us', 'eu', 'other'].includes(storedRegion)) {
          setIsDetecting(false)
          return
        }

        // Get user's IP (this would typically come from an API route)
        const response = await fetch('/api/region/detect')
        const data = await response.json()

        if (data.region) {
          storeRegionDetection(data.region)
        }
      } catch (error) {
        console.error('Error detecting region:', error)
      } finally {
        setIsDetecting(false)
      }
    }

    detectRegion()
  }, [router])

  // This component doesn't render anything, it just handles region detection
  return null
}