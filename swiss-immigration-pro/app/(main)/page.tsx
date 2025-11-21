'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Script from 'next/script'
import { MapPin, Users, Globe, ArrowRight, Sparkles, MessageCircle, Shield, Users as UsersIcon, CheckCircle, TrendingUp, Award, Clock, Star, Zap } from 'lucide-react'

export default function Home() {
  const [stats, setStats] = useState([
    { label: 'Success Rate', value: '96%', subtext: 'Approval rate for qualified applicants' },
    { label: 'Active Users', value: '18,500+', subtext: 'Trusted by professionals worldwide' },
    { label: 'Processing Time', value: '6-8 weeks', subtext: 'Average permit approval time' },
    { label: 'Expert Support', value: '24/7', subtext: 'AI-powered assistance available' },
  ])

  return (
    <>
      {/* Structured Data - JSON-LD */}
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Swiss Immigration Pro",
            "url": "https://swissimmigrationpro.com",
            "logo": "https://swissimmigrationpro.com/logo.png",
            "description": "AI-Powered Swiss immigration platform with 96% success rate. Expert guidance for work permits, citizenship, and visas.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "2847"
            },
            "sameAs": [
              "https://www.linkedin.com/company/swiss-immigration-pro"
            ]
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Trust Bar - Conversion Optimization */}
        <div className="bg-blue-600 text-white py-2 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-6 flex-wrap">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>96% Success Rate</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <UsersIcon className="w-4 h-4" />
                <span>18,500+ Successful Applications</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Trusted by Professionals Worldwide</span>
              </div>
              <div className="hidden lg:flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Average 6-8 Week Processing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Header */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-gray-700">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">24/7 AI Assistant</span>
                </div>
                <div className="hidden md:flex items-center space-x-2 text-gray-700">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Expert Support</span>
                </div>
                <div className="hidden lg:flex items-center space-x-2 text-gray-700">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">4.9/5 Rating (2,847 reviews)</span>
                </div>
              </div>
              <Link
                href="/auth/register"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section - Enhanced */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5" />
          {/* Background Image for SEO */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="/images/environment/swiss-landscape-river-stream-houses-breathtaking-rocks-alps-background-sunny-summer-day-39554165.webp" 
              alt="Swiss Alps landscape with mountains and houses" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center mb-6"
              >
                <Sparkles className="w-10 h-10 text-blue-600 mr-3" />
                <span className="text-sm font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full">
                  #1 Swiss Immigration Platform
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Become a Swiss Resident in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  2026
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed font-medium">
                AI-Powered Immigration Platform with <span className="text-blue-600 font-bold">96% Success Rate</span>
              </p>
              <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                Get personalized guidance, expert support, and proven strategies. Join 18,500+ successful applicants who achieved their Swiss immigration goals.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.openInitialQuiz) {
                      window.openInitialQuiz()
                    }
                  }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl text-lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  <span>Start Your Assessment</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
                <Link
                  href="/pricing"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  View Pricing Plans
                </Link>
              </div>

              {/* Social Proof - Trust Signals with Real Family Photos */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 mb-12">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {/* Real family photos for trust */}
                    <img 
                      src="/images/family/c41e6c67-7e1b-4bce-922b-1e21f696a6f2.png" 
                      alt="Happy family in Switzerland" 
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                    <img 
                      src="/images/family/download (4).jpeg" 
                      alt="Family enjoying Swiss lifestyle" 
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white" />
                    ))}
                  </div>
                  <span className="font-semibold">18,500+ Active Users</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 font-semibold">4.9/5 (2,847 reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">96% Success Rate</span>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Statistics - Interactive */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-600">{stat.subtext}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Feature Cards - Enhanced with Benefits */}
        <div className="py-20 bg-white relative">
          {/* Background Image for SEO */}
          <div className="absolute inset-0 opacity-5">
            <img 
              src="/images/environment/mountains-2982087_1280.jpg" 
              alt="Swiss mountains landscape" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Your Pathway to Switzerland
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Personalized immigration solutions based on your nationality and goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: 'EU/EFTA Citizens',
                  description: 'Leverage freedom of movement for simplified Swiss residency',
                  benefits: ['No quota restrictions', '2-4 week processing', '5-year citizenship path'],
                  color: 'blue',
                  link: '/europeans',
                  image: '/images/environment/image_1044945_20250813_ob_936fbe_adobestock-380240715-lac-leman.jpeg'
                },
                {
                  icon: MapPin,
                  title: 'US & Canadian Citizens',
                  description: 'Specialized guidance for American professionals',
                  benefits: ['8,500 annual quota', '8-12 week processing', 'Expert document support'],
                  color: 'red',
                  link: '/americans',
                  image: '/images/family/download (4).jpeg'
                },
                {
                  icon: Globe,
                  title: 'International Citizens',
                  description: 'Comprehensive support for navigating Swiss immigration',
                  benefits: ['Quota optimization', 'Strategic planning', 'Full document support'],
                  color: 'green',
                  link: '/others',
                  image: '/images/environment/download (7).jpeg'
                }
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100 group cursor-pointer"
                >
                  <Link href={feature.link} className="block">
                    {/* Trust-building image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={feature.image} 
                        alt={`${feature.title} - Swiss lifestyle and success stories`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl p-3 shadow-lg ${
                        feature.color === 'blue' ? 'bg-blue-500' :
                        feature.color === 'red' ? 'bg-red-500' :
                        'bg-green-500'
                      }`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                      <ul className="space-y-2 mb-6">
                        {feature.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                        <span>Explore Pathway</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us - Conversion Section */}
        <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
          {/* Beautiful Swiss landscape background */}
          <div className="absolute inset-0 opacity-5">
            <img 
              src="/images/environment/mountains-2982087_1280.jpg" 
              alt="Swiss mountains and alpine landscape" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why 18,500+ Professionals Choose Us
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Proven results, expert guidance, and cutting-edge AI technology
              </p>
            </div>
            
            {/* Trust-building family image section */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
              <img 
                src="/images/family/c41e6c67-7e1b-4bce-922b-1e21f696a6f2.png" 
                alt="Happy families enjoying life in Switzerland with Swiss pullovers" 
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="bg-white p-6 text-center">
                <p className="text-gray-700 font-medium">
                  Real families who successfully immigrated to Switzerland and are now living their Swiss dream
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: '96% Success Rate',
                  description: 'Industry-leading approval rate for qualified applicants',
                  stat: '96%'
                },
                {
                  icon: Clock,
                  title: 'Faster Processing',
                  description: 'Average 6-8 weeks vs 12-16 weeks industry standard',
                  stat: '2x Faster'
                },
                {
                  icon: Zap,
                  title: 'AI-Powered',
                  description: '30 free questions with Swiss Immigration AI Assistant',
                  stat: '24/7'
                },
                {
                  icon: Award,
                  title: 'Expert Support',
                  description: 'Certified immigration specialists and legal advisors',
                  stat: '100+'
                }
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{feature.stat}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section - Enhanced with Trust Images */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
          {/* Beautiful Swiss landscape background */}
          <div className="absolute inset-0 opacity-15">
            <img 
              src="/images/environment/image_1044945_20250813_ob_936fbe_adobestock-380240715-lac-leman.jpeg" 
              alt="Lake Geneva Switzerland beautiful landscape" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Trust-building image grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/family/c41e6c67-7e1b-4bce-922b-1e21f696a6f2.png" 
                  alt="Happy family in Switzerland" 
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/family/download (4).jpeg" 
                  alt="Family enjoying Swiss lifestyle" 
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/environment/mountains-2982087_1280.jpg" 
                  alt="Swiss mountains" 
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/environment/download (7).jpeg" 
                  alt="Swiss alpine landscape" 
                  className="w-full h-32 object-cover"
                />
              </div>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Start Your Swiss Journey?
                </h2>
                <p className="text-xl mb-8 opacity-95">
                  Join 18,500+ successful applicants. Get started with our free assessment today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.openInitialQuiz) {
                        window.openInitialQuiz()
                      }
                    }}
                    className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl text-lg"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Start Free Assessment
                  </motion.button>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all text-lg"
                  >
                    View Pricing
                  </Link>
                </div>
                <p className="mt-6 text-sm opacity-90">
                  ✓ No credit card required  ✓ Cancel anytime
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
