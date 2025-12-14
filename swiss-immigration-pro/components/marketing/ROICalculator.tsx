'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Calculator, Sparkles } from 'lucide-react'

export default function ROICalculator() {
  const [salary, setSalary] = useState(100000)
  const [currentSavings, setCurrentSavings] = useState(50000)

  // Calculate ROI
  const consultantCost = 4000 // Traditional consultant
  const platformCost = 69 // Advanced Pack
  const salaryIncrease = Math.round(salary * 0.15) // 15% average increase
  const timeSaved = 4 // Months saved
  const monthlySavings = Math.round((salaryIncrease / 12) * 0.3) // Conservative 30% savings rate
  const totalSavingsFirstYear = salaryIncrease + (monthlySavings * 12)

  const platformROI = ((totalSavingsFirstYear - platformCost) / platformCost) * 100
  const consultantROI = ((totalSavingsFirstYear - consultantCost) / consultantCost) * 100

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <Calculator className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Calculate Your ROI
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See Your Potential Return on Investment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform pays for itself through better salary negotiations and faster approval times.
          </p>
        </motion.div>

        {/* Calculator */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8">
            {/* Input Controls */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Annual Salary (CHF)
                </label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg font-semibold"
                  min="50000"
                  max="300000"
                  step="5000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Savings Rate (%)
                </label>
                <input
                  type="number"
                  value={Math.round((currentSavings / salary) * 100)}
                  onChange={(e) => setCurrentSavings(Math.round((Number(e.target.value) / 100) * salary))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg font-semibold"
                  min="0"
                  max="50"
                  step="5"
                />
              </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Platform ROI */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-green-700">Our Platform</span>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {Math.round(platformROI)}%
                </div>
                <div className="text-sm text-green-700 mb-4">ROI First Year</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-semibold">CHF {platformCost}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary Increase:</span>
                    <span className="font-semibold text-green-600">+CHF {salaryIncrease.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Benefit:</span>
                    <span className="font-semibold text-green-600">CHF {(totalSavingsFirstYear - (platformCost * 12)).toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>

              {/* Consultant ROI */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 text-gray-600 flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Traditional Consultant</span>
                </div>
                <div className="text-4xl font-bold text-gray-600 mb-2">
                  {Math.round(consultantROI)}%
                </div>
                <div className="text-sm text-gray-700 mb-4">ROI First Year</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-semibold">CHF {consultantCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary Increase:</span>
                    <span className="font-semibold text-gray-600">+CHF {salaryIncrease.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Benefit:</span>
                    <span className="font-semibold text-gray-600">CHF {(totalSavingsFirstYear - consultantCost).toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>

              {/* Time Saved */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-blue-700">Time Savings</span>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {timeSaved}
                </div>
                <div className="text-sm text-blue-700 mb-4">Months Saved</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry Average:</span>
                    <span className="font-semibold">12-16 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">With Our Platform:</span>
                    <span className="font-semibold text-blue-600">6-8 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Value of Time:</span>
                    <span className="font-semibold text-blue-600">Priceless</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Summary */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  Save CHF {(totalSavingsFirstYear - (platformCost * 12)).toLocaleString()} in Your First Year
                </div>
                <div className="text-blue-100">
                  Plus {timeSaved} months faster approval and lifetime access to all resources
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <a
              href="/pricing"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl transition-all shadow-lg"
            >
              Start Your ROI Journey Today
              <TrendingUp className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
