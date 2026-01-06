'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  ArrowRight, CheckCircle, Clock, Shield, 
  Users, Briefcase, Globe,
  TrendingUp, Zap, Target, Star,
  MapPin, Building, Rocket, Quote, Award, Heart
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import MainHeader from '@/components/layout/MainHeader'

export default function Home() {
  const [stats, setStats] = useState([
    { value: '18,500+', label: 'Successful Applications' },
    { value: '96%', label: 'Success Rate' },
    { value: '6-8 Weeks', label: 'Average Processing' },
    { value: '24/7', label: 'AI Support' }
  ])
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      fetch('/api/stats')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && Array.isArray(data) && data.length > 0) {
            setStats(data.map((stat: any) => ({
              value: stat.value,
              label: stat.label,
            })))
          }
        })
        .catch(() => {})
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <MainHeader />

      {/* Enhanced Hero Section - Modern Design */}
      <motion.section 
        className="relative overflow-hidden min-h-screen h-screen flex items-center"
        suppressHydrationWarning
      >
        <div className="absolute inset-0 z-0">
          {/* Background Image with Modern Treatment */}
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image
              src="/images/environment/image_1044945_20250813_ob_936fbe_adobestock-380240715-lac-leman.jpeg"
              alt="Swiss Alps landscape - Your path to Switzerland"
              fill
              className="object-cover"
              priority
              quality={95}
              sizes="100vw"
            />
            {/* Subtle image overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
          
          {/* Modern Multi-Layer Gradient Overlay - Creates Depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/85 to-indigo-900/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          
          {/* Animated Color Accent Overlay */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.25) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.25) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Modern Mesh Gradient Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent" />
          
          {/* Subtle Vignette Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.3)_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full" suppressHydrationWarning>
          <div className="grid lg:grid-cols-2 gap-12 items-center" suppressHydrationWarning>
            <motion.div
              initial={false}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white"
            >
              <motion.div 
                initial={false}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium mb-6 border border-white/10 text-blue-100"
              >
                <Shield className="w-3.5 h-3.5 text-white" />
                <span>#1 Swiss Immigration Platform</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                Your Path to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
                  Swiss Residency
                </span>
              </h1>

              <p className="text-lg text-slate-200 mb-8 leading-relaxed max-w-xl font-light">
                AI-powered guidance, expert support, and proven strategies. Join{' '}
                <strong className="text-white font-semibold">18,500+ successful applicants</strong> who 
                achieved their Swiss immigration goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).openInitialQuiz) {
                      (window as any).openInitialQuiz()
                    }
                  }}
                  className="group inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold px-8 py-3.5 rounded-lg transition-all hover:bg-blue-50 shadow-lg hover:shadow-xl"
                >
                  <Rocket className="w-4 h-4 text-blue-600" />
                  Start Free Assessment
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-blue-600" />
                </motion.button>
                <Link 
                  href="/pricing" 
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium px-8 py-3.5 rounded-lg transition-all border border-white/20"
                >
                  View Pricing
                </Link>
              </div>
            </motion.div>

            {/* Hero Floating Cards - Glassmorphism */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: '96%', label: 'Success Rate', icon: TrendingUp },
                { value: '24/7', label: 'AI Support', icon: Zap },
                { value: '18.5K+', label: 'Applications', icon: Users },
                { value: '6-8 Weeks', label: 'Processing', icon: Clock },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 0.4 + idx * 0.1, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl font-bold text-white mb-0.5">{stat.value}</div>
                  <div className="text-slate-300 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-white border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center divide-x divide-slate-100">
            {[
              { number: '18,500+', label: 'Successful Applications', icon: Users },
              { number: '96%', label: 'Success Rate', icon: TrendingUp },
              { number: '190+', label: 'Countries Served', icon: Globe },
              { number: '24/7', label: 'AI Support', icon: Zap },
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="text-center px-4 first:pl-0 last:pr-0 border-none md:border-solid cursor-default"
              >
                <div className="flex items-center justify-center gap-2 mb-1 text-slate-900 font-bold text-2xl">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                  {stat.number}
                </div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Advantages Section - Modern Cards */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Swiss Immigration Pro
            </h2>
            <p className="text-slate-600 text-lg font-light">
              Proven results, expert guidance, and cutting-edge technology to simplify your journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: '96% Success Rate',
                description: 'Industry-leading approval rate with comprehensive guidance and expert support throughout the process.',
                tag: 'Guaranteed'
              },
              {
                icon: Clock,
                title: '2x Faster Processing',
                description: 'Average 6-8 weeks vs 12-16 weeks standard. Optimized workflows and expert document preparation.',
                tag: 'Fast Track'
              },
              {
                icon: Zap,
                title: 'AI-Powered Platform',
                description: '24/7 Swiss Immigration AI Assistant providing instant answers and personalized guidance anytime.',
                tag: 'Innovative'
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 border border-slate-100"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Feature Section - Split Layout */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"
              >
                <Image
                  src="/images/family/c41e6c67-7e1b-4bce-922b-1e21f696a6f2.png"
                  alt="Success Story - Swiss Immigration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
                    <span className="text-sm font-medium">Success Story</span>
                  </div>
                  <p className="font-bold text-lg">Join 18,500+ Successful Applicants</p>
                  <p className="text-sm text-white/80">Your pathway to Switzerland starts here</p>
                </div>
              </motion.div>
              
              {/* Floating Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Expert Support</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Certified immigration specialists guide you through every step.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mb-4">
                <span className="w-8 h-[2px] bg-blue-600"></span>
                Your Journey Starts Here
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Experience Excellence <br />
                <span className="text-slate-400">Every Single Day</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed font-light">
                Join thousands who have successfully made Switzerland their home. 
                Benefit from world-class infrastructure, safety, and high salaries.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  { title: 'AI-Powered Guidance', desc: '24/7 access to expert immigration knowledge.' },
                  { title: 'Document Support', desc: 'Professional templates and review services.' },
                  { title: 'Timeline Planning', desc: 'Strategic roadmap tailored to your situation.' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link 
                href="/pricing"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
              >
                Explore Our Plans
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Pathway Types - Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Choose Your Pathway</h2>
              <p className="text-slate-600">Personalized solutions tailored to your background</p>
            </div>
            <Link href="/pricing" className="hidden md:flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              View All Options <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                type: 'EU/EFTA',
                name: 'Freedom of Movement',
                duration: 'No Quotas',
                desc: 'Simplified residency through bilateral agreements.',
                icon: Users,
                link: '/eu'
              },
              {
                type: 'US & Canada',
                name: 'North American',
                duration: '8,500 Quota',
                desc: 'Specialized guidance for American professionals.',
                icon: MapPin,
                link: '/us'
              },
              {
                type: 'International',
                name: 'Global Citizens',
                duration: 'Strategic',
                desc: 'Comprehensive support for all nationalities.',
                icon: Globe,
                link: '/other'
              }
            ].map((pathway, idx) => (
              <Link
                key={idx}
                href={pathway.link}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <pathway.icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wider">{pathway.type}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{pathway.name}</h3>
                  <div className="text-xs text-slate-400 mb-3 font-medium">{pathway.duration}</div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {pathway.desc}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Success Stories with Photos */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-gradient-to-br from-blue-50 via-white to-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
              <Heart className="w-3.5 h-3.5" />
              <span>Real Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Join 18,500+ Successful Applicants
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Real people who made Switzerland their home. See how our platform transformed their immigration journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Software Engineer from Singapore',
                location: 'Zurich, Switzerland',
                image: '/images/family/c41e6c67-7e1b-4bce-922b-1e21f696a6f2.png',
                quote: 'I was rejected twice before finding Swiss Immigration Pro. Their AI assistant helped me identify critical document issues. Approved in 8 weeks!',
                result: 'L Permit • CHF 120k Salary',
                rating: 5
              },
              {
                name: 'Michael Rodriguez',
                role: 'Pharma Researcher from USA',
                location: 'Basel, Switzerland',
                image: '/images/family/download (4).jpeg',
                quote: 'The cantonal strategy module was a game-changer. Switched from Zurich to Basel and got approved in 6 weeks when colleagues waited 16+ weeks.',
                result: 'B Permit • 6 Weeks Processing',
                rating: 5
              },
              {
                name: 'Priya Patel',
                role: 'Finance Professional from India',
                location: 'Geneva, Switzerland',
                image: '/images/americans/success-us-professional.png',
                quote: 'The salary negotiation scripts saved me CHF 25,000 annually. The CV optimization got me 3 interviews in 2 weeks. Worth every franc.',
                result: 'CHF 145k Salary • B Permit',
                rating: 5
              },
              {
                name: 'Marie Dubois',
                role: 'Banking Executive from France',
                location: 'Geneva, Switzerland',
                image: '/images/europeans/success-eu-family.jpeg',
                quote: 'The CV templates are incredible. Applied the banking sector template and got 4 interviews. The embassy process guide eliminated all stress.',
                result: 'B Permit • 4 Interviews',
                rating: 5
              },
              {
                name: 'Ahmed Hassan',
                role: 'Tech Professional from Jordan',
                location: 'Zurich, Switzerland',
                image: '/images/americans/lifestyle-us-family.png',
                quote: 'Brought my family to Switzerland using the family reunification guide. The checklist covered everything. Immigration office had no questions.',
                result: 'Family Reunified • Zurich',
                rating: 5
              },
              {
                name: 'Sofia Martinez',
                role: 'Marketing Director from Spain',
                location: 'Lausanne, Switzerland',
                image: '/images/others/lifestyle-integration.png',
                quote: 'The integration guide helped my family adapt quickly. Language resources and cultural insights made the transition smooth and enjoyable.',
                result: 'C Permit • Full Integration',
                rating: 5
              }
            ].map((story, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-100 overflow-hidden"
              >
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="text-white font-bold text-sm">{story.name}</h4>
                    <p className="text-white/80 text-xs">{story.role}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Quote className="w-6 h-6 text-blue-600 opacity-30 mb-2" />
                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    "{story.quote}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Result</div>
                    <div className="text-sm font-semibold text-blue-600">{story.result}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Location</div>
                    <div className="text-sm font-medium text-slate-700">{story.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Additional Information Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Comprehensive resources, expert guidance, and proven strategies for your Swiss immigration journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Document Templates',
                desc: 'Professional CV templates, cover letters, and application forms tailored for Swiss employers and authorities.',
                color: 'bg-blue-50 text-blue-600'
              },
              {
                icon: Target,
                title: 'Canton Selection',
                desc: 'Strategic guidance on choosing the right canton based on your profession, industry, and personal preferences.',
                color: 'bg-blue-50 text-blue-600'
              },
              {
                icon: Briefcase,
                title: 'Job Market Insights',
                desc: 'Real-time information on job opportunities, salary ranges, and industry trends across Swiss cantons.',
                color: 'bg-blue-50 text-blue-600'
              },
              {
                icon: Clock,
                title: 'Timeline Planning',
                desc: 'Personalized roadmap with deadlines, milestones, and action items to keep your application on track.',
                color: 'bg-blue-50 text-blue-600'
              },
              {
                icon: Zap,
                title: 'AI Assistant',
                desc: '24/7 access to our Swiss Immigration AI for instant answers to your questions and personalized guidance.',
                color: 'bg-blue-50 text-blue-600'
              },
              {
                icon: Users,
                title: 'Community Support',
                desc: 'Connect with other applicants, share experiences, and get advice from those who successfully immigrated.',
                color: 'bg-blue-50 text-blue-600'
              },
              {
                icon: Award,
                title: 'Expert Reviews',
                desc: 'Get your documents reviewed by certified immigration specialists before submission.',
                color: 'bg-blue-50 text-blue-600'
              },
              {
                icon: Globe,
                title: 'Multi-Language',
                desc: 'Resources available in English, French, German, and Italian to support your journey.',
                color: 'bg-blue-50 text-blue-600'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-blue-200 transition-all"
              >
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process Timeline - Clean Vertical */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-slate-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600">Simple steps to your Swiss residency</p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 -translate-x-1/2 hidden md:block"
            />

            {[
              { step: 1, title: 'Free Assessment', desc: 'Complete our quick quiz to get personalized guidance', icon: Target },
              { step: 2, title: 'Choose Your Plan', desc: 'Select the plan that best fits your needs', icon: Briefcase },
              { step: 3, title: 'Get Expert Support', desc: 'Access tools, documents, and AI assistance', icon: Shield },
              { step: 4, title: 'Submit & Succeed', desc: 'Submit your application with confidence', icon: CheckCircle },
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className={`relative flex items-center gap-8 mb-12 last:mb-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 md:text-right">
                  <div className={`hidden md:block ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 w-12 h-12 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center shadow-sm shrink-0 group hover:border-blue-300 transition-colors"
                >
                  <span className="text-blue-600 font-bold text-sm">{item.step}</span>
                </motion.div>

                <div className="flex-1">
                  <div className={`md:hidden`}>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                  <div className={`hidden md:block ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    {/* Spacer for alignment */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modern CTA */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.01 }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-2xl border border-slate-700/50"
        >
          {/* Animated Background Effects */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
          >
             <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
             <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-300 rounded-full blur-2xl opacity-50"></div>
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium mb-6 border border-blue-400/30 text-blue-200"
            >
              <Star className="w-3.5 h-3.5 text-white fill-white" />
              <span>Join 18,500+ Successful Applicants</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Start Your Journey Today
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-slate-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Use our free assessment to check your eligibility or get personalized guidance for a smooth transition.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 mb-10 text-white/80 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Free Assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>96% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>24/7 AI Support</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).openInitialQuiz) {
                    (window as any).openInitialQuiz()
                  }
                }}
                className="group bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Rocket className="w-5 h-5 text-white relative z-10 group-hover:translate-y-[-2px] transition-transform" />
                <span className="relative z-10">Start Free Assessment</span>
                <ArrowRight className="w-4 h-4 text-white relative z-10 transition-transform group-hover:translate-x-1" />
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link 
                  href="/pricing" 
                  className="group bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-4 rounded-xl font-semibold transition-all border border-white/20 hover:border-white/30 inline-flex items-center justify-center gap-2"
                >
                  View Pricing Plans
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}