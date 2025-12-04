'use client'

import { Shield, Users, Award, Clock, Star, CheckCircle, ArrowRight, Zap, MapPin, Globe, TrendingUp, Sparkles, MessageCircle, Play, ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const fallbackStats = [
    { value: '18,500+', label: 'Successful Applications', subtext: 'Approved Swiss immigration cases' },
    { value: '96%', label: 'Success Rate', subtext: 'Industry-leading approval rate' },
    { value: '6-8 Weeks', label: 'Average Processing', subtext: 'From application to approval' },
    { value: '24/7', label: 'AI Support', subtext: 'Available around the clock' }
  ]

  const [stats, setStats] = useState(fallbackStats)
  const [isScrolled, setIsScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('/api/stats')
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          if (data?.length > 0) {
            setStats(data.map((stat: any) => ({
              value: stat.value, label: stat.label, subtext: stat.subtext || ''
            })))
          }
        })
        .catch(() => {})
    }
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Floating Trust Bar - Mobile Optimized */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-2.5 sm:py-3"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 sm:gap-8 text-xs sm:text-sm overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span className="font-semibold">96% Success</span>
            </div>
            <div className="hidden xs:flex items-center gap-1.5 whitespace-nowrap">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
              <span>18,500+ Users</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>Trusted Worldwide</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" />
              <span>6-8 Week Processing</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sticky Header - Glassmorphism */}
      <motion.header 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-100' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-white font-bold text-sm sm:text-base">🇨🇭</span>
                </div>
                <span className="hidden sm:block font-bold text-slate-900 text-lg">Swiss Immigration Pro</span>
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link 
                href="/auth/login" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-4 sm:px-6 py-2.5 rounded-full text-sm transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                <span className="hidden sm:inline">Get Started Free</span>
                <span className="sm:hidden">Start</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Immersive Mobile-First Design */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50" />
          <div className="absolute inset-0 bg-[url('/images/environment/swiss-landscape-river-stream-houses-breathtaking-rocks-alps-background-sunny-summer-day-39554165.webp')] bg-cover bg-center opacity-[0.08]" />
          {/* Animated Gradient Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-300/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/20 to-purple-300/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-4 py-2 mb-6 sm:mb-8 shadow-lg shadow-blue-500/10"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              #1 Swiss Immigration Platform
            </span>
          </motion.div>

          {/* Main Heading - Responsive Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-4 sm:mb-6 leading-[0.95] tracking-tight"
          >
            Your Swiss
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent animate-gradient">
              Dream Starts Here
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4"
          >
            AI-powered immigration guidance with a{' '}
            <span className="font-bold text-blue-600">96% success rate</span>.
            Join 18,500+ who made Switzerland home.
          </motion.p>

          {/* CTA Buttons - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (typeof window !== 'undefined' && window.openInitialQuiz) {
                  window.openInitialQuiz()
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 text-base sm:text-lg"
            >
              <Zap className="w-5 h-5" />
              Start Free Assessment
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-lg text-base sm:text-lg"
            >
              View Plans
            </Link>
          </motion.div>

          {/* Social Proof Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-slate-600 px-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white shadow-md ${
                    i <= 2 ? 'bg-gradient-to-br from-blue-400 to-indigo-500' : 'bg-gradient-to-br from-emerald-400 to-teal-500'
                  }`} />
                ))}
              </div>
              <span className="font-medium">18,500+ users</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1.5 font-medium">4.9/5 rating</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-slate-400"
            >
              <span className="text-xs font-medium">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section - Glassmorphism Cards */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-200 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 mb-0.5">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-slate-500">{stat.subtext}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways Section - Stunning Cards */}
      <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/environment/mountains-2982087_1280.jpg')] bg-cover bg-center opacity-[0.03]" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
              Your Pathway to
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Switzerland</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Personalized immigration solutions based on your nationality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Users,
                title: 'EU/EFTA Citizens',
                description: 'Leverage freedom of movement for simplified Swiss residency',
                benefits: ['No quota restrictions', '2-4 week processing', '5-year citizenship path'],
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'from-blue-50 to-cyan-50',
                link: '/eu',
                image: '/images/environment/image_1044945_20250813_ob_936fbe_adobestock-380240715-lac-leman.jpeg'
              },
              {
                icon: MapPin,
                title: 'US & Canadian',
                description: 'Specialized guidance for North American professionals',
                benefits: ['8,500 annual quota', '8-12 week processing', 'Expert document support'],
                color: 'from-rose-500 to-orange-500',
                bgColor: 'from-rose-50 to-orange-50',
                link: '/us',
                image: '/images/family/download (4).jpeg'
              },
              {
                icon: Globe,
                title: 'International',
                description: 'Comprehensive support for all nationalities',
                benefits: ['Quota optimization', 'Strategic planning', 'Full document support'],
                color: 'from-emerald-500 to-teal-500',
                bgColor: 'from-emerald-50 to-teal-50',
                link: '/other',
                image: '/images/environment/download (7).jpeg'
              }
            ].map((pathway, idx) => (
              <motion.div
                key={pathway.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <Link href={pathway.link} className="block group">
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img 
                        src={pathway.image} 
                        alt={pathway.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${pathway.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <pathway.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{pathway.title}</h3>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`p-6 sm:p-8 bg-gradient-to-br ${pathway.bgColor}`}>
                      <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">{pathway.description}</p>
                      <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                        {pathway.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br ${pathway.color} rounded-full text-white p-0.5`} />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={`inline-flex items-center gap-2 font-semibold bg-gradient-to-r ${pathway.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                        Explore Pathway
                        <ArrowRight className="w-4 h-4 text-current" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Modern Grid */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why 18,500+ Choose Us
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Proven results, expert guidance, cutting-edge AI
            </p>
          </motion.div>

          {/* Feature Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-12 sm:mb-16 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="/images/family/c41e6c67-7e1b-4bce-922b-1e21f696a6f2.png" 
              alt="Happy families in Switzerland" 
              className="w-full h-48 sm:h-64 md:h-80 object-cover"
            />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: TrendingUp, stat: '96%', title: 'Success Rate', desc: 'Industry-leading approval', color: 'from-blue-500 to-indigo-500' },
              { icon: Clock, stat: '2x', title: 'Faster Processing', desc: '6-8 weeks average', color: 'from-emerald-500 to-teal-500' },
              { icon: Zap, stat: '24/7', title: 'AI Support', desc: '30 free questions', color: 'from-amber-500 to-orange-500' },
              { icon: Award, stat: '100+', title: 'Expert Team', desc: 'Certified specialists', color: 'from-violet-500 to-purple-500' }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-1`}>
                  {feature.stat}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 mb-0.5">{feature.title}</div>
                <div className="text-xs sm:text-sm text-slate-500">{feature.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Immersive */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
        <div className="absolute inset-0 bg-[url('/images/environment/image_1044945_20250813_ob_936fbe_adobestock-380240715-lac-leman.jpeg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Trust Images Grid */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
              {[
                '/images/family/c41e6c67-7e1b-4bce-922b-1e21f696a6f2.png',
                '/images/family/download (4).jpeg',
                '/images/environment/mountains-2982087_1280.jpg',
                '/images/environment/download (7).jpeg'
              ].map((img, i) => (
                <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
              Ready to Start Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Swiss Journey?</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Join 18,500+ successful applicants. Free assessment, no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.openInitialQuiz) {
                    window.openInitialQuiz()
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-xl text-lg"
              >
                <Zap className="w-5 h-5" />
                Start Free Assessment
              </motion.button>
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all text-lg"
              >
                View Pricing
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-slate-400">
              ✓ No credit card required  ✓ Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 475px) {
          .xs\\:flex { display: flex; }
        }
      `}</style>
    </div>
  )
}
