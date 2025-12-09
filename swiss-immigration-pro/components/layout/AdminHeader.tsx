'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Shield, Settings, LogOut, User, Home, ArrowLeft } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { useState, useCallback, useMemo, useEffect } from 'react'

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous)
  }, [])

  const handleSignOut = useCallback(async () => {
    await signOut({ callbackUrl: '/' })
  }, [])

  const appUser = useMemo(() => {
    if (!mounted || status === 'loading' || !session?.user) {
      return null
    }
    return {
      id: session.user.id,
      email: session.user.email ?? null,
      name: session.user.name ?? null,
      isAdmin: session.user.isAdmin ?? false,
    }
  }, [session, status, mounted])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg transition-transform duration-200 hover:scale-105">
              <Shield className="h-6 w-6" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-semibold text-gray-900">
                Admin<span className="text-blue-600">Dashboard</span>
              </span>
              <span className="text-xs text-gray-500">Management Panel</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 sm:hidden">
              Admin
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/admin"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                pathname === '/admin'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-blue-50/60 hover:text-blue-600'
              }`}
            >
              Overview
            </Link>
            <Link
              href="/admin/settings"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                pathname === '/admin/settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-blue-50/60 hover:text-blue-600'
              }`}
            >
              Settings
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100"
            >
              User Dashboard
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white bg-blue-600 transition-all duration-200 hover:bg-blue-700 shadow-sm"
            >
              <Home className="h-4 w-4" />
              <span>Exit to Website</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {appUser && (
              <div className="hidden items-center gap-2 lg:flex">
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                    {appUser.name?.charAt(0)?.toUpperCase() ?? <User className="h-4 w-4" />}
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-xs font-semibold text-gray-900">{appUser.name ?? 'Admin'}</p>
                    <p className="text-xs text-gray-500">{appUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden xl:inline">Sign out</span>
                </button>
              </div>
            )}

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
              <Link
                href="/admin"
                onClick={closeMenu}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  pathname === '/admin'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                Overview
              </Link>
              <Link
                href="/admin/settings"
                onClick={closeMenu}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  pathname === '/admin/settings'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                Settings
              </Link>
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                User Dashboard
              </Link>
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-white bg-blue-600 transition-colors hover:bg-blue-700 shadow-sm"
              >
                <Home className="h-4 w-4" />
                <span>Exit to Website</span>
              </Link>

              {appUser && (
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                      {appUser.name?.charAt(0)?.toUpperCase() ?? <User className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{appUser.name ?? 'Admin'}</p>
                      <p className="text-xs text-gray-500">{appUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      closeMenu()
                      handleSignOut()
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

