import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Additional custom middleware logic can go here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes - always allow
        if (pathname.startsWith('/auth/') ||
            pathname.startsWith('/api/auth/') ||
            pathname === '/' ||
            pathname.startsWith('/about') ||
            pathname.startsWith('/pricing') ||
            pathname.startsWith('/contact') ||
            pathname.startsWith('/visas') ||
            pathname.startsWith('/citizenship') ||
            pathname.startsWith('/employment') ||
            pathname.startsWith('/faq') ||
            pathname.startsWith('/resources') ||
            pathname.startsWith('/tools') ||
            pathname.startsWith('/us-citizens') ||
            pathname.startsWith('/cantons') ||
            pathname.startsWith('/us') ||
            pathname.startsWith('/eu') ||
            pathname.startsWith('/other')) {
          return true
        }

        // Protected routes - require authentication
        if (pathname.startsWith('/dashboard') ||
            pathname.startsWith('/profile') ||
            pathname.startsWith('/api/user') ||
            pathname.startsWith('/api/chat') ||
            pathname.startsWith('/api/modules')) {
          return !!token
        }

        // Admin routes - require authentication and admin role
        if (pathname.startsWith('/admin') ||
            pathname.startsWith('/api/admin')) {
          // TEMPORARILY DISABLED FOR DEBUGGING - Allow all authenticated users
          console.log('Admin route access - token exists:', !!token)
          console.log('Admin route access - token data:', token)
          return !!token // Allow any authenticated user for now
        }

        // Default - allow
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/api/user/:path*',
    '/api/admin/:path*',
    '/api/chat/:path*',
    '/api/modules/:path*'
  ]
}
