'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, User, LogOut, Shield, Settings } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

import AdvancedSearch from '@/components/AdvancedSearch'

type LayerKey = 'europeans' | 'americans' | 'others'

type AppUser = {
  id?: string
  email?: string | null
  name?: string | null
  isAdmin?: boolean
  packId?: string | null
}

type NavItem = {
  href: string
  label: string
  accent?: boolean
}

const defaultNavigation: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/visas', label: 'Visas' },
  { href: '/citizenship', label: 'Citizenship' },
  { href: '/tools', label: 'Tools' },
]

const layerNavigation: Record<LayerKey, NavItem[]> = {
  europeans: [
    { href: '/europeans', label: 'Home' },
    { href: '/europeans/visas', label: 'Visas' },
    { href: '/europeans/process', label: 'Process' },
    { href: '/europeans/requirements', label: 'Requirements' },
    { href: '/europeans/resources', label: 'Resources' },
  ],
  americans: [
    { href: '/americans', label: 'Home' },
    { href: '/americans/visas', label: 'Visas' },
    { href: '/americans/process', label: 'Process' },
    { href: '/americans/requirements', label: 'Requirements' },
    { href: '/americans/resources', label: 'Resources' },
  ],
  others: [
    { href: '/others', label: 'Home' },
    { href: '/others/visas', label: 'Visas' },
    { href: '/others/process', label: 'Process' },
    { href: '/others/requirements', label: 'Requirements' },
    { href: '/others/resources', label: 'Resources' },
  ],
}

const setThemeClasses = (dark: boolean) => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', dark)
  document.body.classList.toggle('dark-mode', dark)
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const appUser: AppUser | null = useMemo(() => {
    if (!session?.user) {
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
  }, [session])

  const currentLayer = useMemo<LayerKey | undefined>(() => {
    const match = pathname?.match(/\/(europeans|americans|others)(\/|$)/)
    return match ? (match[1] as LayerKey) : undefined
  }, [pathname])

  const navigationItems = currentLayer ? layerNavigation[currentLayer] : defaultNavigation

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous)
  }, [])

  const applyTheme = useCallback((dark: boolean) => {
    setThemeClasses(dark)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('darkMode', String(dark))
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const readStoredPreference = () => {
      const stored = window.localStorage.getItem('darkMode')
      if (stored !== null) {
        return stored === 'true'
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    const frameId = window.requestAnimationFrame(() => {
      const initialDark = readStoredPreference()
      setIsDarkMode(initialDark)
      setThemeClasses(initialDark)
    })

    const mediaQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null

    const handleChange = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem('darkMode') !== null) {
        return
      }
      const nextMode = event.matches
      window.requestAnimationFrame(() => {
        setIsDarkMode(nextMode)
        setThemeClasses(nextMode)
      })
    }

    mediaQuery?.addEventListener('change', handleChange)

    return () => {
      window.cancelAnimationFrame(frameId)
      mediaQuery?.removeEventListener('change', handleChange)
    }
  }, [])

  const toggleDarkMode = useCallback(() => {
    const nextMode = !isDarkMode
    setIsDarkMode(nextMode)
    applyTheme(nextMode)

    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.style.transition = 'background-color 0.3s ease, color 0.3s ease'
      window.setTimeout(() => {
        root.style.transition = ''
      }, 300)
    }
  }, [applyTheme, isDarkMode])

  const handleSignOut = useCallback(async () => {
    await signOut({ callbackUrl: '/' })
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/80 dark:border-gray-800/80 shadow-sm">
      <nav className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-2xl shadow-lg transition-transform duration-200 hover:scale-105">
              🇨🇭
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-semibold text-gray-900 dark:text-white">
                Swiss<span className="text-blue-600 dark:text-blue-400">Immigration</span>Pro
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Expert Guidance</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white sm:hidden">
              SIP
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50/60 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-blue-400"
              >
                {item.label}
              </Link>
            ))}

            {currentLayer === 'americans' && (
              <Link
                href="/us-citizens"
                className="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50/60 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-blue-400"
              >
                🇺🇸 US Resources
              </Link>
            )}

            <Link
              href="/pricing"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-md"
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <AdvancedSearch />
            </div>

            <button
              onClick={toggleDarkMode}
              className="group relative rounded-lg border border-transparent p-2.5 transition-all duration-200 hover:border-gray-200 hover:bg-gray-100 dark:hover:border-gray-700 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className="text-xl transition-transform duration-200 group-hover:scale-110">
                {isDarkMode ? '🌙' : '☀️'}
              </span>
            </button>

            {appUser ? (
              <div className="hidden items-center gap-2 lg:flex">
                {!appUser.isAdmin && (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 rounded-lg border border-blue-200/50 px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:bg-blue-50/60 dark:border-blue-900/50 dark:text-blue-400 dark:hover:bg-gray-800/60"
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </>
                )}

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
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
              onClick={toggleMenu}
              className="ml-1 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-3 border-t border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              <div className="sm:hidden">
                <AdvancedSearch />
              </div>

              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {item.label}
                </Link>
              ))}

              {currentLayer === 'americans' && (
                <Link
                  href="/us-citizens"
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  🇺🇸 US Resources
                </Link>
              )}

              <Link
                href="/pricing"
                onClick={closeMenu}
                className="block rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
              >
                Pricing
              </Link>

              <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                {appUser ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/60">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                        {appUser.name?.charAt(0)?.toUpperCase() ?? <User className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {appUser.name ?? 'Member'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {appUser.email ?? 'No email set'}
                        </p>
                      </div>
                    </div>

                    {!appUser.isAdmin && (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={closeMenu}
                          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <User className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          onClick={closeMenu}
                          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
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
                          onClick={closeMenu}
                          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-50 dark:text-purple-300 dark:hover:bg-gray-800"
                        >
                          <Shield className="h-4 w-4" />
                          Admin
                        </Link>
                        <Link
                          href="/admin/settings"
                          onClick={closeMenu}
                          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                      </>
                    )}

                    <button
                      onClick={async () => {
                        closeMenu()
                        await handleSignOut()
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-red-400"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/auth/login"
                      onClick={closeMenu}
                      className="block rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={closeMenu}
                      className="block rounded-lg px-4 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
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
  )
}


