'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Video, CheckCircle, AlertCircle, CreditCard, Search, X, Building2, Phone, Mail, Globe, MapPin, Award, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import MainHeader from '@/components/layout/MainHeader'

const CONSULTATION_TYPES = [
  {
    id: 'quick',
    name: 'Quick Consultation',
    duration: '30 minutes',
    price: 200,
    description: 'Perfect for specific questions or quick review of your situation',
    features: [
      '30-minute video call',
      'Review your specific situation',
      'Get personalized advice',
      'Q&A session',
      'Email summary after call'
    ]
  },
  {
    id: 'full',
    name: 'Full Review',
    duration: '60 minutes',
    price: 500,
    description: 'Comprehensive review of your immigration path',
    features: [
      '60-minute video call',
      'Complete application review',
      'Personalized action plan',
      'Document checklist',
      'Priority email support (1 week)',
      'Follow-up call available'
    ],
    popular: true
  },
  {
    id: 'support',
    name: 'Application Support Package',
    duration: 'Ongoing',
    price: 1500,
    description: 'Full support through your entire application process',
    features: [
      'Initial 60-minute strategy call',
      'Application review and feedback',
      'Document preparation guidance',
      'Email support throughout process',
      '3 follow-up calls (30min each)',
      'Priority response (24h)',
      'Application submission review'
    ]
  }
]

// Top Swiss Immigration Attorneys
const SWISS_ATTORNEYS = [
  {
    id: '1',
    name: 'Dr. Thomas Müller',
    firm: 'Müller & Partners',
    specialization: 'Work Permits & Quota Applications',
    address: 'Bahnhofstrasse 45, 8001 Zurich',
    phone: '+41 44 123 4567',
    email: 'info@mueller-partners.ch',
    website: 'https://www.mueller-partners.ch',
    languages: ['German', 'English', 'French'],
    rating: 4.9,
    experience: '25+ years',
    description: 'Leading expert in non-EU work permit applications and quota strategies',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces'
  },
  {
    id: '2',
    name: 'Me. Sophie Dubois',
    firm: 'Dubois Legal',
    specialization: 'EU/EFTA & Family Reunification',
    address: 'Rue du Rhône 14, 1204 Geneva',
    phone: '+41 22 789 0123',
    email: 'contact@dubois-legal.ch',
    website: 'https://www.dubois-legal.ch',
    languages: ['French', 'English', 'German'],
    rating: 4.8,
    experience: '20+ years',
    description: 'Specialized in EU freedom of movement and family immigration cases',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces'
  },
  {
    id: '3',
    name: 'Dr. Michael Schneider',
    firm: 'Schneider Immigration Law',
    specialization: 'Citizenship & Naturalization',
    address: 'Aeschenvorstadt 24, 4051 Basel',
    phone: '+41 61 234 5678',
    email: 'office@schneider-immigration.ch',
    website: 'https://www.schneider-immigration.ch',
    languages: ['German', 'English'],
    rating: 4.9,
    experience: '30+ years',
    description: 'Expert in citizenship applications, naturalization, and integration requirements',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces'
  },
  {
    id: '4',
    name: 'Me. Alessandro Rossi',
    firm: 'Rossi & Associates',
    specialization: 'Investor Visas & Business Immigration',
    address: 'Via Nassa 12, 6900 Lugano',
    phone: '+41 91 345 6789',
    email: 'info@rossi-associates.ch',
    website: 'https://www.rossi-associates.ch',
    languages: ['Italian', 'English', 'German'],
    rating: 4.7,
    experience: '18+ years',
    description: 'Specialized in investor visas, business establishment, and entrepreneur permits',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces'
  },
  {
    id: '5',
    name: 'Dr. Sarah Weber',
    firm: 'Weber Immigration Services',
    specialization: 'Appeals & Complex Cases',
    address: 'Bundesgasse 20, 3001 Bern',
    phone: '+41 31 456 7890',
    email: 'contact@weber-immigration.ch',
    website: 'https://www.weber-immigration.ch',
    languages: ['German', 'English', 'French'],
    rating: 4.8,
    experience: '22+ years',
    description: 'Handles complex cases, appeals, and administrative court proceedings',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces'
  },
  {
    id: '6',
    name: 'Me. Jean-Pierre Martin',
    firm: 'Martin Legal Group',
    specialization: 'Cross-Border & G Permits',
    address: 'Avenue de la Gare 10, 1003 Lausanne',
    phone: '+41 21 567 8901',
    email: 'info@martin-legal.ch',
    website: 'https://www.martin-legal.ch',
    languages: ['French', 'English', 'German'],
    rating: 4.6,
    experience: '15+ years',
    description: 'Expert in cross-border commuter permits and frontier worker regulations',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces'
  },
  {
    id: '7',
    name: 'Dr. Anna Fischer',
    firm: 'Fischer & Co.',
    specialization: 'International Talent & Tech Workers',
    address: 'Limmatstrasse 270, 8005 Zurich',
    phone: '+41 44 678 9012',
    email: 'office@fischer-co.ch',
    website: 'https://www.fischer-co.ch',
    languages: ['German', 'English'],
    rating: 4.9,
    experience: '12+ years',
    description: 'Specialized in IT/Tech sector work permits and international talent recruitment',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces'
  },
  {
    id: '8',
    name: 'Me. Pierre Laurent',
    firm: 'Laurent Immigration Law',
    specialization: 'Healthcare & Medical Professionals',
    address: 'Rue de la Corraterie 10, 1204 Geneva',
    phone: '+41 22 890 1234',
    email: 'contact@laurent-immigration.ch',
    website: 'https://www.laurent-immigration.ch',
    languages: ['French', 'English', 'German'],
    rating: 4.7,
    experience: '16+ years',
    description: 'Expert in medical professional licensing and healthcare worker permits',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces'
  }
]

export default function ConsultationPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAttorneys, setShowAttorneys] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const consultationType = CONSULTATION_TYPES.find(t => t.id === selectedType)
      if (!consultationType) {
        throw new Error('Please select a consultation type')
      }

      // Combine date and time
      const preferredDateTime = formData.preferredDate && formData.preferredTime
        ? new Date(`${formData.preferredDate}T${formData.preferredTime}`)
        : null

      const response = await fetch('/api/consultations/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultationType: selectedType,
          ...formData,
          preferredDate: preferredDateTime?.toISOString()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book consultation')
      }

      // Redirect to Stripe checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <MainHeader />

      {/* Hero Section with Image */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=600&fit=crop"
            alt="Swiss Alps"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Book a Consultation
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 max-w-2xl mx-auto mb-8">
              Get personalized guidance from our Swiss immigration experts. Choose the consultation that fits your needs.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-12 -mt-8"
        >
          <div className="relative bg-white rounded-2xl shadow-xl p-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for attorneys, specializations, or locations..."
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2 px-4">
              Or use <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+K</kbd> for advanced AI search
            </p>
          </div>
        </motion.div>

        {/* Consultation Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {CONSULTATION_TYPES.map((type) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setSelectedType(type.id)}
              className={`relative bg-white rounded-xl shadow-lg p-8 cursor-pointer transition-all ${
                selectedType === type.id
                  ? 'ring-4 ring-blue-500 scale-105'
                  : 'hover:shadow-xl hover:scale-102'
              } ${type.popular ? 'border-2 border-blue-500' : ''}`}
            >
              {type.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{type.name}</h3>
                <div className="flex items-center justify-center gap-2 text-slate-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{type.duration}</span>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  CHF {type.price}
                </div>
                {type.id !== 'support' && (
                  <p className="text-sm text-slate-500">one-time payment</p>
                )}
              </div>

              <p className="text-slate-600 mb-6 text-center">{type.description}</p>

              <ul className="space-y-3 mb-6">
                {type.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <div className={`w-6 h-6 rounded-full border-2 mx-auto ${
                  selectedType === type.id
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-slate-300'
                }`}>
                  {selectedType === type.id && (
                    <div className="w-full h-full rounded-full bg-blue-500 scale-50" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Form */}
        {selectedType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Video className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">
                Book Your {CONSULTATION_TYPES.find(t => t.id === selectedType)?.name}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Timezone
                </label>
                <input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50"
                  readOnly
                />
                <p className="text-xs text-slate-500 mt-1">
                  We'll confirm the exact time based on your timezone
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about your specific situation or questions..."
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-700 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">
                    CHF {CONSULTATION_TYPES.find(t => t.id === selectedType)?.price}
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  Payment will be processed securely through Stripe. You'll receive a confirmation email with meeting details after payment.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Proceed to Payment
                  </>
                )}
              </button>
            </form>

            <p className="text-sm text-slate-500 text-center mt-6">
              By booking a consultation, you agree to our{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            </p>
          </motion.div>
        )}

        {/* Swiss Immigration Attorneys Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-20 mb-16"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              Verified Attorneys
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Top Swiss Immigration Attorneys
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Connect with certified Swiss immigration lawyers specializing in work permits, citizenship, and visa applications
            </p>
          </div>

          {/* Filtered Attorneys */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SWISS_ATTORNEYS
              .filter(attorney => {
                if (!searchQuery) return true
                const query = searchQuery.toLowerCase()
                return (
                  attorney.name.toLowerCase().includes(query) ||
                  attorney.firm.toLowerCase().includes(query) ||
                  attorney.specialization.toLowerCase().includes(query) ||
                  attorney.address.toLowerCase().includes(query) ||
                  attorney.languages.some(lang => lang.toLowerCase().includes(query))
                )
              })
              .map((attorney, idx) => (
                <motion.div
                  key={attorney.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 p-6 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {/* Attorney Photo */}
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden ring-2 ring-blue-100">
                        <img
                          src={attorney.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(attorney.name)}&size=80&background=2563eb&color=fff&bold=true`}
                          alt={attorney.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(attorney.name)}&size=80&background=2563eb&color=fff&bold=true`
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{attorney.name}</h3>
                      <p className="text-sm font-semibold text-blue-600 mb-2">{attorney.firm}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                          ⭐ {attorney.rating}
                        </span>
                        <span className="text-xs text-gray-500">{attorney.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">{attorney.specialization}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{attorney.description}</p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{attorney.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <a href={`tel:${attorney.phone}`} className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                        {attorney.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <a href={`mailto:${attorney.email}`} className="text-sm text-gray-700 hover:text-blue-600 transition-colors break-all">
                        {attorney.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <a 
                        href={attorney.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-500">Languages:</span>
                      {attorney.languages.map((lang, langIdx) => (
                        <span key={langIdx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {searchQuery && SWISS_ATTORNEYS.filter(attorney => {
            const query = searchQuery.toLowerCase()
            return (
              attorney.name.toLowerCase().includes(query) ||
              attorney.firm.toLowerCase().includes(query) ||
              attorney.specialization.toLowerCase().includes(query) ||
              attorney.address.toLowerCase().includes(query) ||
              attorney.languages.some(lang => lang.toLowerCase().includes(query))
            )
          }).length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No attorneys found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'How do the consultations work?',
                a: 'After booking and payment, you\'ll receive a confirmation email with a video call link (Zoom or Google Meet). At the scheduled time, you\'ll connect with one of our immigration experts for your consultation.'
              },
              {
                q: 'What if I need to reschedule?',
                a: 'Contact us at least 24 hours before your scheduled consultation, and we\'ll work with you to find a new time. Rescheduling is free.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes, we offer a full refund if you cancel at least 48 hours before your consultation. After that, refunds are handled on a case-by-case basis.'
              },
              {
                q: 'What languages are consultations available in?',
                a: 'Consultations are available in English, German, French, and Italian. Please mention your preferred language in the notes when booking.'
              },
              {
                q: 'Is this legal advice?',
                a: 'Our consultations provide general guidance and information. For specific legal matters, we recommend consulting with a certified Swiss immigration lawyer.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

