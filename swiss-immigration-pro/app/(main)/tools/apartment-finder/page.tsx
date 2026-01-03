'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Loader2 } from 'lucide-react'

export default function ApartmentFinderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const success = searchParams?.get('success') === '1'

  const [step, setStep] = useState<'form' | 'payment' | 'results'>(success ? 'results' : 'form')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [maxRent, setMaxRent] = useState('')
  const [minRooms, setMinRooms] = useState('')
  const [results, setResults] = useState<any[]>([])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // Fire email capture
    await fetch('/api/email/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'apartment-finder' }),
    })

    // generate stripe checkout session
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oneTimeProductId: 'apartment_finder_access' }),
    })

    const json = await res.json()
    if (json.url) {
      router.push(json.url)
    } else {
      alert(json.error || 'Failed to start payment')
    }
    setLoading(false)
  }

  async function fetchResults() {
    setLoading(true)
    const params = new URLSearchParams({ city, maxRent, minRooms })
    const res = await fetch(`/api/apartments?${params.toString()}`)
    const json = await res.json()
    setResults(json.apartments || [])
    setLoading(false)
  }

  if (step === 'form') {
    return (
      <div className="max-w-xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Swiss Apartment Finder</h1>
        <p className="mb-4 text-slate-600">Enter your criteria and pay CHF&nbsp;19 one-time to unlock a curated list of apartments.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Your email"
            className="w-full border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="City (e.g. Zurich)"
            className="w-full border px-4 py-2 rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max rent (CHF)"
            className="w-full border px-4 py-2 rounded"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
          />
          <input
            type="number"
            step="0.5"
            placeholder="Min rooms"
            className="w-full border px-4 py-2 rounded"
            value={minRooms}
            onChange={(e) => setMinRooms(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Pay CHF&nbsp;19 &amp; Search
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-4">We’ll email you occasional tips. Unsubscribe any time.</p>
      </div>
    )
  }

  if (step === 'results') {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-green-700">
          <CheckCircle /> Results unlocked
        </h1>
        <button
          onClick={fetchResults}
          disabled={loading}
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />} Refresh Results
        </button>
        {results.length === 0 && !loading && <p>No apartments found for your filters.</p>}
        <ul className="space-y-4">
          {results.map((apt) => (
            <li key={apt.id} className="border rounded p-4">
              <h2 className="font-semibold text-lg">{apt.title}</h2>
              <p>{apt.city} — CHF {apt.rent} / month — {apt.rooms} rooms</p>
              <a href={apt.link} target="_blank" rel="noopener" className="text-blue-600 hover:underline text-sm">View listing →</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return null
}