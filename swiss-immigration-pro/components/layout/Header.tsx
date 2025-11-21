'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, User, LogOut, Shield, Settings, Globe } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

import AdvancedSearch from '@/components/AdvancedSearch'

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
  { href: '/resources', label: 'Resources' },
  { href: '/tools', label: 'Tools' },
]

// Layer-specific navigation removed - using classic header for all layers

// Theme functions removed - light mode only

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
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

  // Use classic navigation for all layers - no layer-specific customization
  const navigationItems = defaultNavigation

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous)
  }, [])

  // Force light mode only - dark mode removed
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark-mode')
      // Remove any stored dark mode preference
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('darkMode')
      }
    }
  }, [])

  const handleSignOut = useCallback(async () => {
    await signOut({ callbackUrl: '/' })
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <nav className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link href="/" className="flex items-center gap-3">
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

            <Link
              href="/pricing"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50/60 hover:text-blue-600"
            >
              Pricing
            </Link>
            <Link
              href="/employment"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50/60 hover:text-blue-600"
            >
              Employment
            </Link>
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

            {/* Language Switcher Button */}
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
              className="ml-1 rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-3 border-t border-gray-200 bg-white p-4 shadow-lg">
              <div className="sm:hidden">
                <AdvancedSearch />
              </div>

              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-blue-50"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/pricing"
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-blue-50"
              >
                Pricing
              </Link>
              <Link
                href="/employment"
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-blue-50"
              >
                Employment
              </Link>

              {/* Language Switcher in Mobile Menu */}
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
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                        {appUser.name?.charAt(0)?.toUpperCase() ?? <User className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {appUser.name ?? 'Member'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appUser.email ?? 'No email set'}
                        </p>
                      </div>
                    </div>

                    {!appUser.isAdmin && (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={closeMenu}
                          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                        >
                          <User className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          onClick={closeMenu}
                          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
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
                          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-50"
                        >
                          <Shield className="h-4 w-4" />
                          Admin
                        </Link>
                        <Link
                          href="/admin/settings"
                          onClick={closeMenu}
                          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
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
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
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
                      className="block rounded-lg px-4 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
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



