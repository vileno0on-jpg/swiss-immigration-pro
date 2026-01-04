'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function LayerPage() {
  const params = useParams()
  const router = useRouter()
  const layerParam = params?.layer as string
  
  // Redirect old layer routes to new static routes
  useEffect(() => {
    const routeMap: Record<string, string> = {
      'europeans': '/eu',
      'americans': '/us',
      'others': '/other'
    }
    
    if (layerParam && routeMap[layerParam]) {
      router.replace(routeMap[layerParam])
    } else {
      router.replace('/other') // Default fallback
    }
  }, [layerParam, router])
  
  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}
