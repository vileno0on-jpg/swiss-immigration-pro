'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Crown, Sparkles, Shield, Star, Zap, MessageSquare, BookOpen, LayoutDashboard, Users, FileText } from 'lucide-react'
import { PRICING_PACKS } from '@/lib/stripe'
import { PricingPack } from '@/types'

export default function PricingContent({ layer = 'default' }: { layer?: string }) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  const handleCheckout = async (packId: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId, cycle: billingCycle }),
      })

      const data = await response.json()

      if (response.status === 401) {
        window.location.href = '/auth/login?redirect=' + encodeURIComponent(window.location.pathname)
        return
      }

      if (!response.ok) {
        const errorMessage = data.error || 'Failed to create checkout session. Please try again or contact support.'
        console.error('Checkout error:', data.error || 'Unknown error')
        alert(errorMessage)
        return
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Failed to initiate checkout. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to initiate checkout. Please check your connection and try again.')
    }
  }

  return (
    <div className={`min-h-screen bg-white font-sans transition-colors duration-300`}>
      {/* Header Section with Light Background */}
      <div className="relative bg-gradient-to-b from-white via-blue-50/30 to-white pt-24 pb-32 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-100/20 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Invest in Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Future</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Premium guidance, AI-powered tools, and expert resources at a fraction of the cost of traditional consultants.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-16 h-8 bg-gray-200 rounded-full p-1 relative transition-colors hover:bg-gray-300"
              >
                <motion.div
                  animate={{ x: billingCycle === 'annual' ? 32 : 0 }}
                  className="w-6 h-6 bg-blue-600 rounded-full shadow-lg"
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual <span className="text-green-600 text-xs ml-1 font-bold">-20%</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards - Floating Effect */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(PRICING_PACKS).map((pack: PricingPack, idx) => {
            const isPopular = pack.id === 'advanced'
            const price = billingCycle === 'annual' && pack.price > 0 ? Math.round(pack.price * 0.8) : pack.price

            return (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col bg-white rounded-3xl p-6 shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  isPopular ? 'ring-4 ring-blue-500/30 scale-105 z-10 border-blue-500' : 'hover:border-blue-300'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Crown className="w-3 h-3" /> MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors">{pack.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900 transition-colors">
                      {pack.price === 0 ? 'Free' : `CHF ${price}`}
                    </span>
                    {pack.price > 0 && <span className="text-gray-500 font-medium transition-colors">/mo</span>}
                  </div>
                  {billingCycle === 'annual' && pack.price > 0 && (
                    <div className="text-xs text-green-600 font-bold mt-1 transition-colors">
                      Billed CHF {price * 12} yearly
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  {pack.features.map((feature, fidx) => (
                    <div 
                      key={fidx} 
                      className="flex items-start gap-3 text-sm text-gray-600 group transition-colors"
                      onMouseEnter={() => setHoveredFeature(feature)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <CheckCircle className={`w-5 h-5 shrink-0 ${isPopular ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'} transition-colors`} />
                      <span className="group-hover:text-gray-900 transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => pack.price === 0 ? window.location.href = '/auth/register' : handleCheckout(pack.id)}
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-lg ${
                    isPopular 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 hover:scale-[1.02]' 
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200 hover:border-blue-300 transition-colors'
                  }`}
                >
                  {pack.price === 0 ? 'Start Free' : 'Get Started'}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Feature Deep Dive Grid */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 transition-colors">Everything You Need to Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto transition-colors">We've built the most comprehensive immigration platform in Switzerland.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MessageSquare, title: 'AI Immigration Assistant', desc: '24/7 answers to your specific legal and procedural questions.', color: 'bg-purple-100 text-purple-600' },
              { icon: BookOpen, title: 'Interactive Modules', desc: 'Step-by-step guides that adapt to your nationality and goals.', color: 'bg-blue-100 text-blue-600' },
              { icon: LayoutDashboard, title: 'Application Dashboard', desc: 'Track documents, deadlines, and tasks in one secure place.', color: 'bg-emerald-100 text-emerald-600' },
              { icon: Users, title: 'Community Access', desc: 'Connect with others who are on the same journey as you.', color: 'bg-amber-100 text-amber-600' },
              { icon: FileText, title: 'Smart Templates', desc: 'CVs and motivation letters optimized for Swiss employers.', color: 'bg-rose-100 text-rose-600' },
              { icon: Shield, title: 'Expert Review', desc: 'Get your critical documents reviewed by professionals.', color: 'bg-indigo-100 text-indigo-600' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed transition-colors">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Style - Clean */}
        <div className="mt-32 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center transition-colors">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade at any time. Prorated refunds are applied automatically.' },
              { q: 'Is the Citizenship Pro pack a one-time fee?', a: 'Yes! Pay once and get lifetime access to all current and future citizenship resources.' },
              { q: 'Do you offer refunds?', a: 'We offer a 14-day money-back guarantee if you are not satisfied with our premium features.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <h4 className="font-bold text-gray-900 mb-2 text-lg transition-colors">{item.q}</h4>
                <p className="text-gray-600 transition-colors">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Strip */}
        <div className="mt-24 py-12 border-t border-gray-200">
          <p className="text-center text-gray-400 font-semibold uppercase tracking-widest text-sm mb-8">Trusted by professionals from</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:opacity-100 transition-opacity duration-500">
            {/* Placeholder Logos */}
            {['Google', 'Novartis', 'Roche', 'UBS', 'CERN'].map((logo) => (
              <span key={logo} className="text-2xl font-bold text-gray-800">{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
