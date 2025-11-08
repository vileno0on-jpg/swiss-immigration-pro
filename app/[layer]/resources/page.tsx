'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import { LAYER_CONTENT } from '@/lib/layerContent'
import type { LayerType } from '@/lib/layerLogic'

export default function ResourcesPage() {
  const params = useParams()
  const layerParam = params?.layer as string
  const layer = (['europeans', 'americans', 'others'].includes(layerParam) 
    ? layerParam 
    : 'others') as LayerType
  
  const content = LAYER_CONTENT[layer]

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href={`/${layer}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {layer.charAt(0).toUpperCase() + layer.slice(1)} Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {content.resources.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            {content.resources.description}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.resources.posts.map((post, idx) => (
            <motion.article
              key={idx}
              id={post.title.toLowerCase().replace(/\s+/g, '-')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  {post.category}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {post.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
                  Read more →
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="card p-6 bg-blue-50 dark:bg-blue-900">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Official Resources
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <a href="https://www.sem.admin.ch/sem/en/home.html" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  State Secretariat for Migration (SEM) - Official Source
                </a>
              </li>
              <li>
                <a href="https://www.fedlex.admin.ch/en/cc/142/142_20_142_201" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Foreign Nationals Act (AuG, SR 142.20) on Fedlex
                </a>
              </li>
              <li>
                <a href="https://www.ch.ch" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  CH.ch - Official Portal
                </a>
              </li>
              <li>
                <a href="https://www.fedlex.admin.ch" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Fedlex - Federal Law Database
                </a>
              </li>
              <li>
                <a href="https://www.swisslex.ch" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Swisslex - Legal Database
                </a>
              </li>
            </ul>
          </div>

          <div className="card p-6 bg-green-50 dark:bg-green-900">
            <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Get Professional Help
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Consider consulting with a certified Swiss immigration lawyer for personalized advice.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-900 dark:text-yellow-100 mb-4">
            ⚠️ <strong>Disclaimer:</strong> General information only (updated Nov 2025). Not legal advice. 
            Consult with a certified Swiss immigration lawyer for your specific case. 
            Laws and regulations may change. Verify all information with official sources.
          </p>
          <p className="text-sm text-yellow-900 dark:text-yellow-100">
            <strong>Official Sources:</strong> This information is based on the Foreign Nationals Act (AuG, SR 142.20), 
            the Foreign Nationals and Integration Ordinance (VZAE, SR 142.201), the Agreement on the Free Movement of Persons (FMPA), 
            and the Citizenship Act (StAG, SR 141.0). Always verify current regulations at <a href="https://www.fedlex.admin.ch" target="_blank" rel="noopener noreferrer" className="underline">Fedlex.admin.ch</a> and 
            <a href="https://www.sem.admin.ch" target="_blank" rel="noopener noreferrer" className="underline"> SEM.admin.ch</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

