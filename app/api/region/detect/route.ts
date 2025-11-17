import { NextRequest, NextResponse } from 'next/server'
import { detectRegionFromIP, RegionType } from '@/lib/geolocation'

// Explicit module export for TypeScript
export {}

export async function GET(request: NextRequest) {
  try {
    // Get client IP from Vercel/Netlify headers
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const clientIP = request.headers.get('x-vercel-proxied-for') ||
                     request.headers.get('x-netlify-proxied-for') ||
                     forwardedFor?.split(',')[0]?.trim() ||
                     realIP ||
                     request.ip

    if (!clientIP) {
      console.warn('No client IP found in headers, defaulting to other region')
      return NextResponse.json({
        region: 'other' as RegionType,
        autoDetected: true
      })
    }

    console.log('Detecting region for IP:', clientIP)

    // Detect region from IP
    const region = await detectRegionFromIP(clientIP)

    console.log('Detected region:', region, 'for IP:', clientIP)

    return NextResponse.json({
      region,
      autoDetected: true,
      ip: clientIP
    })
  } catch (error) {
    console.error('Error detecting region:', error)

    // Return default region on error
    return NextResponse.json({
      region: 'other' as RegionType,
      autoDetected: false,
      error: 'Failed to detect region'
    })
  }
}

// Runtime configuration for Next.js
export const runtime = 'nodejs'