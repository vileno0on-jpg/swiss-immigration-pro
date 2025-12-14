'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Users, Clock, CheckCircle, Star, TrendingUp, Lock } from 'lucide-react'

const indicators = [
  {
    icon: Shield,
    stat: '96%',
    label: 'Success Rate',
    subtext: 'Industry-leading approval rate',
    color: 'blue'
  },
  {
    icon: Users,
    stat: '18,500+',
    label: 'Successful Applications',
    subtext: 'Real people, real results',
    color: 'green'
  },
  {
    icon: Award,
    stat: '4.9/5',
    label: 'Average Rating',
    subtext: 'From 2,847 verified reviews',
    color: 'yellow'
  },
  {
    icon: Clock,
    stat: '6-8 Weeks',
    label: 'Average Processing',
    subtext: 'Faster than industry standard',
    color: 'purple'
  },
  {
    icon: TrendingUp,
    stat: 'CHF 25k+',
    label: 'Average Salary Increase',
    subtext: 'Through negotiation strategies',
    color: 'indigo'
  },
  {
    icon: Lock,
    stat: '100%',
    label: 'Secure & Confidential',
    subtext: 'GDPR compliant, encrypted',
    color: 'red'
  }
]

const guarantees = [
  {
    title: '30-Day Money-Back Guarantee',
    description: 'Not satisfied? Get a full refund within 30 days, no questions asked.',
    icon: CheckCircle
  },
  {
    title: 'Expert-Backed Content',
    description: 'All content verified by certified Swiss immigration specialists.',
    icon: Award
  },
  {
    title: '24/7 AI Support',
    description: 'Get instant answers to your questions, anytime, anywhere.',
    icon: Star
  },
  {
    title: 'Regular Updates',
    description: 'Content updated monthly to reflect latest regulations and quotas.',
    icon: TrendingUp
  }
]

export default function TrustIndicators() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Numbers don't lie. See why we're the #1 Swiss immigration platform.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {indicators.map((indicator, idx) => (
            <motion.div
              key={indicator.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
            >
              <div className={`w-12 h-12 rounded-xl p-3 mb-4 mx-auto ${
                indicator.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                indicator.color === 'green' ? 'bg-green-100 text-green-600' :
                indicator.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                indicator.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                indicator.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                'bg-red-100 text-red-600'
              }`}>
                <indicator.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{indicator.stat}</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">{indicator.label}</div>
              <div className="text-xs text-gray-500">{indicator.subtext}</div>
            </motion.div>
          ))}
        </div>

        {/* Guarantees Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Guarantees
            </h3>
            <p className="text-lg text-gray-600">
              Your success is our commitment. Here's what we promise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, idx) => (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 p-3 mb-4">
                  <guarantee.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{guarantee.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{guarantee.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Money-Back Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg">
              <Shield className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="font-bold text-lg">30-Day Money-Back Guarantee</div>
                <div className="text-sm opacity-90">Try risk-free. 100% satisfaction or full refund.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
