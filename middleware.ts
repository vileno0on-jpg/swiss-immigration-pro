import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const LAYERS = new Set(['europeans', 'americans', 'others'])
const LAYER_ROUTE_ROOTS = new Set(['', 'visas', 'process', 'requirements', 'resources', 'quiz'])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore internal assets/api routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const userLayer = request.cookies.get('userLayer')?.value
  if (!userLayer || !LAYERS.has(userLayer)) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)

  // Already on correct layer path
  if (segments.length > 0 && LAYERS.has(segments[0])) {
    return NextResponse.next()
  }

  const firstSegment = segments[0] ?? ''
  if (!LAYER_ROUTE_ROOTS.has(firstSegment)) {
    return NextResponse.next()
  }

  const targetSegments = [userLayer, ...segments]
  const targetPath = '/' + targetSegments.join('/')

  const url = request.nextUrl.clone()
  url.pathname = targetPath.replace(/\/+$/, '') || `/${userLayer}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|static|fonts|images|.*\\..*).*)'],
}









