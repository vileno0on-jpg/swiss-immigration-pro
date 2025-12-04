import { NextRequest, NextResponse } from 'next/server'

// Proxy middleware for Next.js 16
// Replaces the deprecated middleware.ts file in the root
export default function proxy(request: NextRequest) {
  // Pass-through proxy - allow everything
  // Can be extended for auth, redirects, etc. in the future
  return NextResponse.next()
}
