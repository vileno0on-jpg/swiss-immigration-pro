import { NextResponse } from 'next/server'
import { RegionType } from '@/lib/geolocation'

// Explicit module export for TypeScript
export {}

export async function GET() {
  // Simplified: Always return 'other' region without IP detection
  return NextResponse.json({
    region: 'other' as RegionType,
    autoDetected: false
  })
}

// Runtime configuration for Next.js
export const runtime = 'nodejs'