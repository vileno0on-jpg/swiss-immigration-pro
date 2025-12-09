'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LayerHeader from '@/components/layout/LayerHeader'
import { UserPlus, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Determine layer from localStorage or default to 'other'
  const [layer, setLayer] = useState<'eu' | 'us' | 'other'>('other')
  const [homeHref, setHomeHref] = useState('/')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userLayer')
      if (stored) {
        try {
          const layerData = JSON.parse(stored)
          if (layerData?.layer === 'eu' || layerData?.layer === 'us' || layerData?.layer === 'other') {
            setLayer(layerData.layer)
            setHomeHref(layerData.layer === 'eu' ? '/eu' : layerData.layer === 'us' ? '/us' : '/other')
          }
        } catch {
          // Default to other
        }
      }
    }
  }, [])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Register user via API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Registration successful, redirect to login
      router.push('/auth/login?message=Registration successful! Please sign in.')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <LayerHeader layer={layer} homeHref={homeHref} />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="max-w-md w-full">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 mb-6 shadow-xl ring-4 ring-blue-100">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-gray-600 text-lg">
              Start your journey to Switzerland today
            </p>
          </div>

          {/* Registration Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/80 p-8 sm:p-10 backdrop-blur-sm">
            <form className="space-y-6" onSubmit={handleRegister}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 shadow-sm">
                  <p className="text-sm font-semibold text-red-800">{error}</p>
                </div>
              )}

              {/* Full Name Field */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-bold text-gray-800 mb-2.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 text-base touch-manipulation"
                    placeholder="Enter your full name"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 text-base touch-manipulation"
                    placeholder="you@example.com"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-2.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 text-base touch-manipulation"
                    placeholder="Create a password (min 6 characters)"
                    minLength={6}
                    style={{ fontSize: '16px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 active:text-gray-700 transition-colors touch-manipulation"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    style={{ WebkitTapHighlightColor: 'transparent', minWidth: '44px', minHeight: '44px' }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and Privacy */}
              <div className="text-sm text-gray-600 pt-2">
                By registering, you agree to our{' '}
                <Link href="/terms" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Privacy Policy
                </Link>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

