'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, DollarSign, Clock, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const valueProps = [
  {
    icon: DollarSign,
    title: 'Save CHF 25,000+ Annually',
    description: 'Our salary negotiation strategies help you earn significantly more',
    color: 'green'
  },
  {
    icon: Clock,
    title: 'Save 4-6 Months',
    description: 'Faster approval times mean you start your Swiss life sooner',
    color: 'blue'
  },
  {
    icon: Shield,
    title: '96% Success Rate',
    description: 'Industry-leading approval rate for qualified applicants',
    color: 'purple'
  },
  {
    icon: TrendingUp,
    title: '10-Year Roadmap',
    description: 'Clear path from permit to citizenship with our guidance',
    color: 'indigo'
  }
]

export default function ValueProposition() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Swiss Immigration Pro?
          </h2>
          <p className="text-xl opacity-95 max-w-2xl mx-auto">
            We don't just guide you through the process. We maximize your success and savings.
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {valueProps.map((prop, idx) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className={`w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4`}>
                <prop.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
              <p className="text-white/90 leading-relaxed">{prop.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Without Swiss Immigration Pro</h3>
              <ul className="space-y-3">
                {[
                  '41% rejection rate',
                  '12-16 weeks processing',
                  'CHF 3,000-5,000 consultant fees',
                  'Unclear path to citizenship',
                  'Generic advice, not personalized'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-400 mr-3">×</span>
                    <span className="opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">With Swiss Immigration Pro</h3>
              <ul className="space-y-3">
                {[
                  '96% success rate',
                  '6-8 weeks average processing',
                  'CHF 29-199/month, unlimited support',
                  'Clear 10-year citizenship roadmap',
                  'AI-powered personalized guidance'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl text-lg"
          >
            Start Your Journey Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <p className="mt-4 text-sm opacity-90">
            30-day money-back guarantee • Cancel anytime • No credit card required for trial
          </p>
        </motion.div>
      </div>
    </section>
  )
}
