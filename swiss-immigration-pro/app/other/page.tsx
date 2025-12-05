'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, CheckCircle, Clock, Shield, FileText, MapPin, 
  Award, Users, Briefcase, Home, Heart,
  Globe, TrendingUp, BadgeCheck, ChevronRight,
  GraduationCap, Languages, Scale, Landmark, BookOpen,
  Zap, Building, Target, BarChart3, Plane
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import LayerHeader from '@/components/layout/LayerHeader'

export default function OtherPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    saveLayerSelection('other')
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
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-purple-100 selection:text-purple-900">
      <LayerHeader
        layer="other"
        homeHref="/other"
        customBadge={{
          icon: <Globe className="w-3.5 h-3.5" />,
          text: 'Global Citizens Pathway',
          bgColor: 'bg-purple-600',
          textColor: 'text-white'
        }}
      />

      {/* Hero Section - Modern Gradient */}
      <section className="relative overflow-hidden h-[85vh] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-international.png"
            alt="Global Path to Switzerland"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-slate-900/90 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium mb-6 border border-white/10 text-purple-200">
                <Globe className="w-3.5 h-3.5" />
                <span>International Citizens</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                Your Global Path to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                  Switzerland
                </span>
              </h1>

              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl font-light">
                From Asia to the Americas, we help <strong className="text-white font-medium">highly qualified professionals</strong> navigate 
                the quota system. Your expertise knows no borders.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/other/visas" 
                  className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-all hover:bg-purple-500 shadow-lg shadow-purple-500/25"
                >
                  Explore Pathways
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/other/requirements" 
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-medium px-8 py-3.5 rounded-lg transition-all border border-white/10"
                >
                  Check Eligibility
                </Link>
              </div>

              <div className="flex gap-10 pt-8 border-t border-white/5">
                {[
                  { value: '190+', label: 'Countries' },
                  { value: '89%', label: 'Success Rate' },
                  { value: '12', label: 'Languages' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating Stats */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: 'Merit Based', label: 'Qualification System', icon: Scale, color: 'text-pink-400', bg: 'bg-pink-500/10' },
                { value: '8-12 Weeks', label: 'Processing Time', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { value: 'Global', label: 'Talent Pool', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { value: 'Diverse', label: 'Community', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-white/5 hover:bg-slate-800/80 transition-all"
                >
                  <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
              { number: '190+', label: 'Countries', icon: Globe },
              { number: '25%', label: 'Foreign Population', icon: Users },
              { number: '8,500', label: 'Annual Permits', icon: FileText },
              { number: '10 Yrs', label: 'To Citizenship', icon: Award },
            ].map((stat, idx) => (
              <div key={idx} className="text-center flex flex-col items-center justify-center">
                <stat.icon className="w-5 h-5 text-purple-600 mb-2 opacity-80" />
                <div className="text-2xl font-bold text-slate-900">{stat.number}</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pathways - Clean Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Choose Your Pathway
            </h2>
            <p className="text-slate-600 text-lg font-light">
              Your unique background determines your best route to Switzerland.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Briefcase,
                title: 'Employment',
                desc: 'Work permit via sponsorship.',
                color: 'bg-blue-50 text-blue-600'
              },
              {
                icon: GraduationCap,
                title: 'Education',
                desc: 'Study and post-grad work.',
                color: 'bg-purple-50 text-purple-600'
              },
              {
                icon: Heart,
                title: 'Family',
                desc: 'Reunification with residents.',
                color: 'bg-pink-50 text-pink-600'
              },
              {
                icon: Landmark,
                title: 'Investment',
                desc: 'Business & entrepreneurship.',
                color: 'bg-emerald-50 text-emerald-600'
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all border border-slate-100"
              >
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-6`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 mb-6">{item.desc}</p>
                <Link href="/other/visas" className="text-sm font-semibold text-slate-900 flex items-center gap-1 hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section - Feature */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
               <div className="absolute inset-0 bg-purple-600 rounded-3xl transform rotate-2 opacity-10"></div>
               <div className="relative rounded-3xl overflow-hidden shadow-xl">
                 <Image
                  src="/images/integration-language.png"
                  alt="Language Learning"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                 />
               </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Integration is Key
              </h2>
              <p className="text-lg text-slate-600 mb-8 font-light leading-relaxed">
                For third-country nationals, demonstrating commitment to Swiss society is crucial for long-term residency and citizenship.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Language', desc: 'B1 Oral / A2 Written proficiency required.', icon: Languages },
                  { title: 'Community', desc: 'Active participation in local life.', icon: Users },
                  { title: 'Economy', desc: 'Financial independence & tax compliance.', icon: Building },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-purple-600 shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - Vertical Modern */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Citizenship Timeline</h2>
            <p className="text-slate-600">The long-term journey to becoming Swiss</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              { year: 'Year 0', title: 'Arrival', desc: 'B Permit issued. Start integration.' },
              { year: 'Year 5', title: 'Review', desc: 'Language check. Permit renewal.' },
              { year: 'Year 10', title: 'Settlement', desc: 'C Permit eligibility (Permanent).' },
              { year: 'Year 12', title: 'Citizenship', desc: 'Naturalization application.' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 mb-8 last:mb-0 group">
                <div className="w-20 text-right pt-1">
                  <span className="font-bold text-purple-600 text-sm">{item.year}</span>
                </div>
                <div className="relative">
                  <div className="w-3 h-3 bg-purple-200 rounded-full mt-2 group-hover:bg-purple-600 transition-colors ring-4 ring-white"></div>
                  {idx !== 3 && <div className="absolute top-6 bottom-[-2rem] left-1.5 w-px bg-slate-200"></div>}
                </div>
                <div className="pb-8">
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to start?</h2>
          <div className="flex justify-center gap-4">
            <Link href="/other/tools" className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
              Free Assessment
            </Link>
            <Link href="/contact" className="text-slate-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
