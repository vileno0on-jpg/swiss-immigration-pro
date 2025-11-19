'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, FileText, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { LAYER_CONTENT } from '@/lib/layerContent'
import type { LayerType } from '@/lib/layerLogic'

export default function VisasPage() {
  const params = useParams()
  const layerParam = params?.layer as string
  const layer = (['europeans', 'americans', 'others'].includes(layerParam) 
    ? layerParam 
    : 'others') as LayerType
  
  const content = LAYER_CONTENT[layer]
  const visas = content.visas.types.filter(v => v.applicable)

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/${layer}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {layer.charAt(0).toUpperCase() + layer.slice(1)} Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {content.visas.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            {content.visas.description}
          </p>
        </div>

        {/* Visa Types */}
        <div className="space-y-8">
          {visas.map((visa, idx) => (
            <motion.div
              key={idx}
              id={visa.name.toLowerCase().replace(/\s+/g, '-')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card p-8 border-l-4 border-blue-600"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {visa.name}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {visa.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{visa.timeline}</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Requirements
                </h3>
                <ul className="space-y-3">
                  {visa.requirements.map((req, ridx) => (
                    <li key={ridx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  💡 This permit is available for {layer} applicants
                </div>
                <Link
                  href={`/${layer}/process`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  View application process →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 card p-8 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help Choosing?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Not sure which permit is right for you? Check our requirements page for detailed guidance on each permit type.
          </p>
          <Link href={`/${layer}/requirements`} className="btn-primary inline-block">
            View Requirements
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

