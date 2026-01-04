'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, User, LogOut, Shield, Settings, Mail, BookOpen } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

import AdvancedSearch from '@/components/AdvancedSearch'
import LanguageSwitcher from '@/components/LanguageSwitcher'

type AppUser = {
  id?: string
  email?: string | null
  name?: string | null
  isAdmin?: boolean
  packId?: string | null
}

export default function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  
  const { data: session, status } = useSession()

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const html = document.documentElement
      html.classList.remove('dark')
      html.style.colorScheme = 'light'
      localStorage.removeItem('darkMode')
      document.body.style.removeProperty('background-color')
      document.body.style.removeProperty('color')
    }
  }, [])

  const appUser: AppUser | null = useMemo(() => {
    // Only compute on client to avoid hydration mismatch
    if (typeof window === 'undefined' || !mounted) {
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

  const navigationItems = useMemo(() => {
    return [
      { href: '/', label: 'Home' },
      { href: '/visas', label: 'Visas' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/tools', label: 'Tools' },
    ] as Array<{ href: string; label: string; highlight?: boolean }>
  }, [])

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous)
  }, [])

  const handleSignOut = useCallback(async () => {
    await signOut({ callbackUrl: '/' })
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link href="/" className="flex items-center gap-3">
            {logoError && mounted ? (
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-2xl shadow-lg transition-transform duration-200 hover:scale-105">
                🇨🇭
              </div>
            ) : (
              <div className="flex h-11 w-11 items-center justify-center transition-transform duration-200 hover:scale-105 overflow-hidden rounded-xl bg-white/50">
                <img
                  src="/images/logo-removebg.png"
                  alt="Swiss Immigration Pro Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                  onError={() => setLogoError(true)}
                  onLoad={() => setLogoError(false)}
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
                  item.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : pathname === item.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-50/60 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Book Consultation & Contact Buttons */}
            <div className="ml-2 flex items-center gap-1 border-l border-gray-200 pl-2">
              <Link
                href="/consultation"
                className="flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-700 px-2 py-1.5 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-md min-w-[32px]"
                title="Book Consultation"
              >
                <BookOpen className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden 2xl:inline ml-1.5 whitespace-nowrap">Consultation</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm min-w-[32px]"
                title="Contact Us"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden 2xl:inline ml-1.5 whitespace-nowrap">Contact</span>
              </Link>
            </div>
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
                      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 hover:shadow-lg"
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

            <div className="ml-2 hidden sm:block">
              <LanguageSwitcher />
            </div>

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
                  className={`block rounded-xl px-4 py-4 text-base font-medium transition-all active:scale-[0.98] touch-manipulation ${
                    item.highlight
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-700 active:bg-blue-100'
                  }`}
                  style={{ WebkitTapHighlightColor: 'transparent', minHeight: '48px' }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Book Consultation & Contact in Mobile Menu */}
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <Link
                  href="/consultation"
                  onClick={closeMenu}
                  className="flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2.5 text-sm font-medium text-white shadow-sm transition-all active:from-blue-700 active:to-blue-800 active:scale-[0.98] touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent', minHeight: '44px' }}
                >
                  <BookOpen className="h-4 w-4" />
                  Consultation
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="flex items-center gap-2.5 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition-all active:bg-gray-50 active:scale-[0.98] touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent', minHeight: '44px' }}
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div onClick={closeMenu}>
                  <LanguageSwitcher />
                </div>
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
                          className="flex items-center gap-3 rounded-xl px-4 py-4 text-base font-semibold text-blue-600 transition-all active:bg-blue-50 active:scale-[0.98] touch-manipulation"
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
  )
}



