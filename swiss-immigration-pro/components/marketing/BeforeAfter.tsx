'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, XCircle, TrendingUp, Clock, DollarSign } from 'lucide-react'

interface ComparisonItem {
  category: string
  before: {
    label: string
    value: string
    icon: any
    color: string
  }
  after: {
    label: string
    value: string
    icon: any
    color: string
  }
}

const comparisons: ComparisonItem[] = [
  {
    category: 'Application Success Rate',
    before: {
      label: 'Without Guidance',
      value: '41%',
      icon: XCircle,
      color: 'red'
    },
    after: {
      label: 'With Swiss Immigration Pro',
      value: '96%',
      icon: CheckCircle,
      color: 'green'
    }
  },
  {
    category: 'Processing Time',
    before: {
      label: 'Industry Average',
      value: '12-16 weeks',
      icon: Clock,
      color: 'orange'
    },
    after: {
      label: 'Our Average',
      value: '6-8 weeks',
      icon: Clock,
      color: 'green'
    }
  },
  {
    category: 'Salary Negotiation',
    before: {
      label: 'Without Strategy',
      value: 'CHF 105k',
      icon: DollarSign,
      color: 'gray'
    },
    after: {
      label: 'With Negotiation Tools',
      value: 'CHF 130k+',
      icon: DollarSign,
      color: 'green'
    }
  },
  {
    category: 'Rejection Risk',
    before: {
      label: 'Going Solo',
      value: '59% rejection',
      icon: XCircle,
      color: 'red'
    },
    after: {
      label: 'With Our Platform',
      value: '4% rejection',
      icon: CheckCircle,
      color: 'green'
    }
  },
  {
    category: 'Time to Find Job',
    before: {
      label: 'Without CV Optimization',
      value: '6-12 months',
      icon: Clock,
      color: 'orange'
    },
    after: {
      label: 'With Our CV Templates',
      value: '2-4 months',
      icon: Clock,
      color: 'green'
    }
  },
  {
    category: 'Consultant Costs',
    before: {
      label: 'Traditional Consultant',
      value: 'CHF 3,000-5,000',
      icon: DollarSign,
      color: 'red'
    },
    after: {
      label: 'Our Platform',
      value: 'CHF 29-199/month',
      icon: DollarSign,
      color: 'green'
    }
  }
]

export default function BeforeAfter() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
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
          <div className="inline-flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              See The Difference
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Before vs After: The Transformation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. See the measurable impact our platform delivers.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {comparisons.map((comparison, idx) => (
            <motion.div
              key={comparison.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                {comparison.category}
              </h3>
              
              <div className="space-y-6">
                {/* Before */}
                <div className={`p-6 rounded-xl border-2 ${
                  comparison.before.color === 'red' ? 'bg-red-50 border-red-200' :
                  comparison.before.color === 'orange' ? 'bg-orange-50 border-orange-200' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg p-2 ${
                      comparison.before.color === 'red' ? 'bg-red-100 text-red-600' :
                      comparison.before.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <comparison.before.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-semibold ${
                      comparison.before.color === 'red' ? 'text-red-700' :
                      comparison.before.color === 'orange' ? 'text-orange-700' :
                      'text-gray-700'
                    }`}>
                      {comparison.before.label}
                    </span>
                  </div>
                  <div className={`text-4xl font-bold ${
                    comparison.before.color === 'red' ? 'text-red-600' :
                    comparison.before.color === 'orange' ? 'text-orange-600' :
                    'text-gray-600'
                  }`}>
                    {comparison.before.value}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>

                {/* After */}
                <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 p-2">
                      <comparison.after.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold text-green-700">
                      {comparison.after.label}
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-green-600">
                    {comparison.after.value}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Journey?</h3>
          <p className="text-xl mb-8 opacity-95">
            Join thousands who've already seen the difference. Start your transformation today.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
          >
            View Pricing Plans
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
