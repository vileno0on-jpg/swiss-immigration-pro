'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, CheckCircle, Clock, Shield, FileText, 
  Award, Users, Briefcase, DollarSign,
  TrendingUp, BadgeCheck, ChevronRight, AlertTriangle,
  Target, BarChart3, Zap, MapPin, Building, TrendingDown, Star
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import LayerHeader from '@/components/layout/LayerHeader'

export default function USPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    saveLayerSelection('us')
  }, [])

  const saveLayerSelection = async (layer: string) => {
    try {
      await fetch('/api/user/save-layer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layer }),
      })
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedLayer', layer)
        localStorage.setItem('layerSelectedAt', new Date().toISOString())
        document.cookie = `selectedLayer=${layer}; path=/; max-age=31536000`
      }
    } catch (error) {
      console.error('Failed to save layer:', error)
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedLayer', layer)
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <LayerHeader
        layer="us"
        homeHref="/us"
        customBadge={{
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          text: '2025 Quota Alert: Apply Early',
          bgColor: 'bg-slate-900',
          textColor: 'text-white'
        }}
      />

      {/* Hero Section - Dark & Sleek */}
      <section className="relative overflow-hidden h-[85vh] flex items-center bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-us-switzerland.png"
            alt="US to Switzerland Professional Pathway"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium mb-6 border border-white/10 text-indigo-200">
                <Target className="w-3.5 h-3.5" />
                <span>Third-Country National Pathway</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                US Professionals:
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-blue-200">
                  Strategic Excellence
                </span>
              </h1>

              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl font-light">
                As a US citizen, you are a <strong className="text-white font-medium">highly valued professional</strong>. 
                Navigate the quota system with precision, secure your B-Permit, and elevate your career in Switzerland.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/us/visas" 
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-all hover:bg-indigo-500 shadow-lg shadow-indigo-500/25"
                >
                  Start Journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/us/requirements" 
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-medium px-8 py-3.5 rounded-lg transition-all border border-white/10"
                >
                  Check Requirements
                </Link>
              </div>

              <div className="flex gap-10 pt-8 border-t border-white/5">
                {[
                  { value: '92%', label: 'Success Rate' },
                  { value: 'CHF 80k+', label: 'Min Salary' },
                  { value: '8-12', label: 'Weeks Process' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Minimalist Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: 'Quota Based', label: '~4,500 Permits', icon: BarChart3, color: 'text-amber-400' },
                { value: 'High Salary', label: 'CHF 100k+ Avg', icon: DollarSign, color: 'text-emerald-400' },
                { value: '10 Years', label: 'Citizenship', icon: Award, color: 'text-indigo-400' },
                { value: 'English', label: 'Business Lang', icon: Users, color: 'text-blue-400' },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all"
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
                  <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quota Alert - Minimal */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-3 text-amber-900 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="font-medium">2025 Quota Update:</span>
            <span className="hidden sm:inline">Permits are allocated quarterly. Apply early for best chances.</span>
            <Link href="/us/process#quota-system" className="text-amber-700 font-bold hover:underline ml-2">
              View Availability →
            </Link>
          </div>
        </div>
      </div>

      {/* Challenges Section - Clean Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              The Professional Challenge
            </h2>
            <p className="text-slate-600 text-lg font-light">
              As a third-country national, the bar is higher. We help you clear it with ease.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-rose-500 pl-4">Key Requirements</h3>
              {[
                { title: 'Annual Quotas', desc: 'Strict limits on L & B permits annually.', icon: BarChart3 },
                { title: 'Labor Market Test', desc: 'Proof no EU/Swiss national could fill the role.', icon: Users },
                { title: 'Salary Threshold', desc: 'Minimum CHF 80,000+ for permit approval.', icon: DollarSign },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center text-rose-500 group-hover:bg-rose-100 transition-colors shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                Our Strategy
              </h3>
              <div className="space-y-4">
                {[
                  'Optimization of CV for "Specialized Skills"',
                  'Strategic timing with quota release dates',
                  'Salary negotiation benchmarking',
                  'Employer support for labor market justification'
                ].map((strategy, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="text-sm text-slate-700 font-medium">{strategy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story - Feature */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900/20 blur-3xl rounded-full transform translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-medium text-sm mb-4">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>Success Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                From Silicon Valley to <br />
                <span className="text-indigo-400">Crypto Valley, Zug</span>
              </h2>
              <blockquote className="text-xl text-slate-300 mb-8 leading-relaxed italic">
                "The quota system was daunting. Swiss Immigration Pro helped position my specialized tech skills perfectly. My B-permit was approved in 9 weeks."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-lg font-bold">S</div>
                <div>
                  <div className="font-bold">Sarah Chen</div>
                  <div className="text-xs text-indigo-300 uppercase tracking-wide">Senior Product Manager</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/images/success-us-professional.png"
                  alt="Success Story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline - Horizontal Scroll on Mobile */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Roadmap</h2>
            <p className="text-slate-600">Your step-by-step path to Switzerland</p>
          </div>

          <div className="relative">
             {/* Desktop Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-slate-200 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: '01', title: 'Job Offer', desc: 'Secure sponsorship', color: 'bg-slate-900' },
                { step: '02', title: 'Application', desc: 'Cantonal submission', color: 'bg-indigo-600' },
                { step: '03', title: 'Federal Review', desc: 'SEM approval', color: 'bg-indigo-600' },
                { step: '04', title: 'Visa Entry', desc: 'D-Visa & Arrival', color: 'bg-emerald-500' },
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className={`w-24 h-10 rounded-full ${item.color} text-white flex items-center justify-center font-bold text-sm shadow-md mb-6 mx-auto md:mx-0 z-10 relative ring-4 ring-slate-50`}>
                    {item.step}
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group-hover:shadow-md transition-shadow text-center md:text-left">
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Floating Card Style */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to make your move?</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Don't let bureaucracy stand in the way of your career. Use our tools to plan your application.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/us/tools" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition-colors">
                  Free Assessment
                </Link>
                <Link href="/us/pricing" className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
