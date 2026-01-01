'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, DollarSign, Clock, Shield, TrendingUp, Sparkles, Zap, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const valueProps = [
  {
    icon: DollarSign,
    title: 'Save CHF 25,000+ Annually',
    description: 'Our salary negotiation strategies help you earn significantly more',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50'
  },
  {
    icon: Clock,
    title: 'Save 4-6 Months',
    description: 'Faster approval times mean you start your Swiss life sooner',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50'
  },
  {
    icon: Shield,
    title: '87% Success Rate',
    description: 'Industry-leading approval rate for qualified applicants',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50'
  },
  {
    icon: TrendingUp,
    title: '10-Year Roadmap',
    description: 'Clear path from permit to citizenship with our guidance',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'from-indigo-50 to-blue-50'
  }
]

export default function ValueProposition() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/environment/image_1044945_20250813_ob_936fbe_adobestock-380240715-lac-leman.jpeg"
          alt="Lake Geneva Switzerland"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-purple-600/95 to-indigo-600/95" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-bold">Why Choose Us?</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
            We Make It Worth It
          </h2>
          <p className="text-2xl md:text-3xl opacity-95 max-w-3xl mx-auto font-medium">
            We don't just guide you through the process. We maximize your success and savings.
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {valueProps.map((prop, idx) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, type: 'spring' }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                rotateY: 5
              }}
              className="group relative"
            >
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/30 hover:border-white/50 transition-all shadow-2xl h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prop.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-transform`}>
                  <prop.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold mb-3">{prop.title}</h3>
                <p className="text-white/90 leading-relaxed text-base font-medium">{prop.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/30 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-red-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <X className="w-8 h-8 text-red-300" />
              </div>
              <h3 className="text-3xl font-extrabold mb-6 relative z-10">Without Us</h3>
              <ul className="space-y-4">
                {[
                  { text: '41% rejection rate', icon: X },
                  { text: '12-16 weeks waiting', icon: Clock },
                  { text: 'CHF 3,000-5,000 consultant fees', icon: DollarSign },
                  { text: 'Unclear citizenship path', icon: Shield },
                  { text: 'Generic, cookie-cutter advice', icon: Zap }
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <item.icon className="w-6 h-6 text-red-300 flex-shrink-0 mt-0.5" />
                    <span className="opacity-90 text-lg font-medium">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="text-3xl font-extrabold mb-6 relative z-10">With Us</h3>
              <ul className="space-y-4">
                {[
                  { text: '87% success rate', icon: TrendingUp },
                  { text: '6-8 weeks average', icon: Clock },
                  { text: 'CHF 29-199/month, unlimited support', icon: DollarSign },
                  { text: 'Clear 10-year roadmap', icon: Shield },
                  { text: 'AI-powered personalized guidance', icon: Zap }
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                    <span className="opacity-90 text-lg font-medium">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/pricing"
            className="group inline-flex items-center px-12 py-6 bg-white text-blue-600 font-extrabold text-xl rounded-2xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"
            />
            <Zap className="w-6 h-6 mr-3" />
            <span className="relative z-10">Let's Get Started</span>
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
          </Link>
          <p className="mt-6 text-lg opacity-90 flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Cancel anytime
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              No credit card for trial
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              100% risk-free
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
