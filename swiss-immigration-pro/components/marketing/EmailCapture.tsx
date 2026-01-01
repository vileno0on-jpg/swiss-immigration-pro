'use client'

import { useState } from 'react'
import { Mail, Check, Download, AlertCircle } from 'lucide-react'

interface EmailCaptureProps {
  title?: string
  description?: string
  leadMagnet?: string
  ctaText?: string
  variant?: 'default' | 'inline' | 'modal'
  onSuccess?: () => void
}

export default function EmailCapture({
  title = 'Get Your Free Swiss Immigration Checklist',
  description = 'Download our comprehensive checklist covering work permits, documents, timelines, and requirements. Join 15,000+ successful applicants.',
  leadMagnet = 'Swiss Immigration Checklist PDF',
  ctaText = 'Get Free Checklist',
  variant = 'default',
  onSuccess
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Save to database (create API endpoint if needed)
      const response = await fetch('/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, leadMagnet })
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      // Also save to localStorage for tracking
      if (typeof window !== 'undefined') {
        const existing = JSON.parse(localStorage.getItem('emailCaptures') || '[]')
        existing.push({ email, timestamp: new Date().toISOString(), leadMagnet })
        localStorage.setItem('emailCaptures', JSON.stringify(existing))
      }

      setIsSuccess(true)
      if (onSuccess) onSuccess()

      // Auto-download or redirect after 1 second
      setTimeout(() => {
        // In a real implementation, this would trigger a PDF download
        // For now, we'll just show success
        window.open('/downloads/swiss-immigration-checklist.pdf', '_blank')
      }, 1000)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error('Email capture error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={`bg-green-50 border-2 border-green-500 rounded-xl p-6 ${variant === 'inline' ? 'w-full' : ''}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-green-900 mb-2">Check your email!</h3>
            <p className="text-green-800">
              We've sent your free {leadMagnet} to <strong>{email}</strong>. 
              The download should start automatically.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                <Download className="w-5 h-5" />
                {ctaText}
              </>
            )}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          Free download. No spam. Unsubscribe anytime.
        </p>
      </form>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <Download className="w-5 h-5" />
              {ctaText}
            </>
          )}
        </button>
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
        <p className="text-xs text-gray-600 text-center">
          🔒 We respect your privacy. Free download. No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}





