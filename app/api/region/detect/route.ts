import { NextResponse } from 'next/server'
import { RegionType } from '@/lib/geolocation'

// Explicit module export for TypeScript
export {}

export async function GET() {
  // For now, return 'other' region
  // The quiz will redirect users to the appropriate layer page directly
  return NextResponse.json({
    region: 'other' as RegionType,
    autoDetected: false
  })
}

// Runtime configuration for Next.js
export const runtime = 'nodejs'