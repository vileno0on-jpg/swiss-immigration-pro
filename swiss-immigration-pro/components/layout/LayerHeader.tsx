'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, User, LogOut, Shield, Settings, Globe, Star, AlertTriangle } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

import AdvancedSearch from '@/components/AdvancedSearch'

type AppUser = {
  id?: string
  email?: string | null
  name?: string | null
  isAdmin?: boolean
  packId?: string | null
}

type LayerHeaderProps = {
  layer: 'eu' | 'us' | 'other'
  homeHref: string
  customBadge?: {
    icon: React.ReactNode
    text: string
    bgColor?: string
    textColor?: string
  }
}

export default function LayerHeader({ layer, homeHref, customBadge }: LayerHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  
  // Get session safely - SessionProvider should wrap this component
  const { data: session, status } = useSession()

  useEffect(() => {
    setMounted(true)
    // Ensure light mode - remove any dark mode
    if (typeof window !== 'undefined') {
      const html = document.documentElement
      html.classList.remove('dark')
      html.style.colorScheme = 'light'
      localStorage.removeItem('darkMode')
      
      // Ensure body is light
      document.body.style.removeProperty('background-color')
      document.body.style.removeProperty('color')
    }
  }, [])

  // Handle session safely - work even if SessionProvider isn't ready
  const appUser: AppUser | null = useMemo(() => {
    if (!mounted) {
      return null
    }
    
    try {
      if (status === 'loading' || !session?.user) {
        return null
      }

      const candidate = session.user as AppUser
      return {
        id: candidate.id,
        email: candidate.email ?? null,
        name: candidate.name ?? null,
        isAdmin: candidate.isAdmin ?? false,
        packId: candidate.packId ?? null,
      }
    } catch (error) {
      console.error('Error reading session:', error)
      return null
    }
  }, [session, status, mounted])

  // Layer-specific navigation - layer-specific pages + global tools/pricing
  const navigationItems = useMemo(() => {
    const base = [
      { href: homeHref, label: 'Home' },
      { href: `/${layer}/visas`, label: 'Visas' },
      { href: `/${layer}/citizenship`, label: 'Citizenship' },
      { href: `/${layer}/tools`, label: 'Tools' },
      { href: `/${layer}/pricing`, label: 'Pricing' },
    ]
    return base
  }, [layer, homeHref])

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous)
  }, [])


  const handleSignOut = useCallback(async () => {
    await signOut({ callbackUrl: '/' })
  }, [])

  // Layer-specific badge defaults
  const badge = customBadge || {
    icon: layer === 'eu' ? <Star className="w-4 h-4" /> : layer === 'us' ? <AlertTriangle className="w-4 h-4" /> : <Globe className="w-4 h-4" />,
    text: layer === 'eu' 
      ? 'EU/EFTA Freedom of Movement: No Work Permit Quotas Required'
      : layer === 'us' 
      ? '2025 Quota Alert: ~4,500 B Permits for Third-Country Nationals • Apply Early'
      : 'Serving Citizens from 190+ Countries • Expert Third-Country Immigration Guidance',
    bgColor: layer === 'eu' ? 'bg-blue-600' : layer === 'us' ? 'bg-black' : 'bg-blue-600',
    textColor: 'text-white'
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between sm:h-20">
            <Link href={homeHref} className="flex items-center gap-3">
              {logoError ? (
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-2xl shadow-lg transition-transform duration-200 hover:scale-105">
                  🇨🇭
                </div>
              ) : (
                <div className="flex h-11 w-11 items-center justify-center transition-transform duration-200 hover:scale-105 overflow-hidden">
                  <img
                    src="/images/logo-removebg.png"
                    alt="Swiss Immigration Pro"
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                </div>
              )}
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-semibold text-gray-900">
                  Swiss<span className="text-blue-600">Immigration</span>Pro
                </span>
                <span className="text-xs text-gray-500">Expert Guidance</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 sm:hidden">
                SIP
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-blue-50/60 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block">
                <AdvancedSearch />
              </div>

              {appUser ? (
                <div className="hidden items-center gap-2 lg:flex">
                  {!appUser.isAdmin && (
                    <>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 rounded-lg border border-blue-200/50 px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:bg-blue-50/60"
                      >
                        <User className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </>
                  )}

                  {appUser.isAdmin && (
                    <>
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 hover:shadow-lg"
                      >
                        <Shield className="h-4 w-4" />
                        Admin
                      </Link>
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg lg:inline-flex"
                >
                  Login
                </Link>
              )}

              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.openInitialQuiz) {
                    window.openInitialQuiz()
                  }
                }}
                className="ml-2 rounded-lg p-2 transition-colors hover:bg-gray-100 hidden sm:flex items-center space-x-1"
                aria-label="Change Language"
                title="Change Language"
              >
                <Globe className="h-5 w-5 text-gray-700" />
              </button>

              <button
                onClick={toggleMenu}
                className="ml-1 rounded-lg p-3 transition-colors hover:bg-gray-100 active:bg-gray-200 lg:hidden touch-manipulation"
                aria-label="Toggle navigation menu"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="space-y-2 border-t border-gray-200 bg-white p-4 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto -webkit-overflow-scrolling-touch">
                <div className="sm:hidden mb-4">
                  <AdvancedSearch />
                </div>

                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-4 text-base font-medium text-gray-700 transition-all active:bg-blue-100 active:scale-[0.98] touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent', minHeight: '48px' }}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="border-t border-gray-200 pt-3">
                  <button
                    onClick={() => {
                      closeMenu()
                      if (typeof window !== 'undefined' && window.openInitialQuiz) {
                        window.openInitialQuiz()
                      }
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <Globe className="h-4 w-4" />
                    Change Language
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  {appUser ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white flex-shrink-0">
                          {appUser.name?.charAt(0)?.toUpperCase() ?? <User className="h-6 w-6" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {appUser.name ?? 'Member'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {appUser.email ?? 'No email set'}
                          </p>
                        </div>
                      </div>

                      {!appUser.isAdmin && (
                        <>
                          <Link
                            href="/dashboard"
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-xl px-4 py-4 text-base font-medium text-gray-700 transition-all active:bg-gray-100 active:scale-[0.98] touch-manipulation"
                            style={{ WebkitTapHighlightColor: 'transparent', minHeight: '48px' }}
                          >
                            <User className="h-5 w-5" />
                            Dashboard
                          </Link>
                          <Link
                            href="/profile"
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-xl px-4 py-4 text-base font-medium text-gray-700 transition-all active:bg-gray-100 active:scale-[0.98] touch-manipulation"
                            style={{ WebkitTapHighlightColor: 'transparent', minHeight: '48px' }}
                          >
                            <User className="h-5 w-5" />
                            Profile
                          </Link>
                        </>
                      )}

                      {appUser.isAdmin && (
                        <>
                          <Link
                            href="/admin"
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-xl px-4 py-4 text-base font-semibold text-purple-600 transition-all active:bg-purple-50 active:scale-[0.98] touch-manipulation"
                            style={{ WebkitTapHighlightColor: 'transparent', minHeight: '48px' }}
                          >
                            <Shield className="h-5 w-5" />
                            Admin
                          </Link>
                          <Link
                            href="/admin/settings"
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-xl px-4 py-4 text-base font-medium text-gray-700 transition-all active:bg-gray-100 active:scale-[0.98] touch-manipulation"
                            style={{ WebkitTapHighlightColor: 'transparent', minHeight: '48px' }}
                          >
                            <Settings className="h-5 w-5" />
                            Settings
                          </Link>
                        </>
                      )}

                      <button
                        onClick={async () => {
                          closeMenu()
                          await handleSignOut()
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-4 text-base font-medium text-gray-600 transition-all active:bg-red-50 active:text-red-600 active:scale-[0.98] touch-manipulation"
                        style={{ WebkitTapHighlightColor: 'transparent', minHeight: '48px' }}
                      >
                        <LogOut className="h-5 w-5" />
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/auth/login"
                        onClick={closeMenu}
                        className="block rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 text-center text-base font-semibold text-white shadow-md transition-all duration-200 active:from-blue-700 active:to-blue-800 active:scale-[0.98] touch-manipulation"
                        style={{ WebkitTapHighlightColor: 'transparent', minHeight: '48px' }}
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/auth/register"
                        onClick={closeMenu}
                        className="block rounded-xl px-4 py-4 text-center text-base font-medium text-gray-700 transition-all active:bg-gray-100 active:scale-[0.98] touch-manipulation"
                        style={{ WebkitTapHighlightColor: 'transparent', minHeight: '48px' }}
                      >
                        Create account
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Layer-Specific Announcement Bar */}
      {badge && (
        <div className={`${badge.bgColor} ${badge.textColor} py-2 px-4 border-b-2 border-black`}>
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-semibold">
            {badge.icon}
            <span>{badge.text}</span>
          </div>
        </div>
      )}
    </>
  )
}

