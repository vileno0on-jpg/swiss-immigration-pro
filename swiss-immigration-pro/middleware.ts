import { NextResponse } from 'next/server'

// Temporarily disable middleware to test if it's causing 500 errors
export default function middleware() {
  // Temporary pass-through middleware - allow everything
  return NextResponse.next()
}

export const config = {
  matcher: []
}
