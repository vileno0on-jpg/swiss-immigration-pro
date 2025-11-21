'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Clock, Tag, ArrowRight, FileText, Scale, Users, TrendingUp, Briefcase, DollarSign, MapPin, Route, Globe } from 'lucide-react'
import Link from 'next/link'
import { LAYER_CONTENT } from '@/lib/layerContent'
import type { LayerType } from '@/lib/layerLogic'

// Icon mapping for resource categories
const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase()
  if (categoryLower.includes('permit')) return FileText
  if (categoryLower.includes('comparison')) return Scale
  if (categoryLower.includes('citizenship')) return Users
  if (categoryLower.includes('family')) return Users
  if (categoryLower.includes('legal')) return Scale
  if (categoryLower.includes('strategy')) return TrendingUp
  if (categoryLower.includes('career')) return Briefcase
  if (categoryLower.includes('finance')) return DollarSign
  if (categoryLower.includes('embassy')) return MapPin
  if (categoryLower.includes('country')) return Globe
  if (categoryLower.includes('pathway')) return Route
  return BookOpen // Default icon
}

export default function ResourcesPage() {
  const params = useParams()
  const layerParam = params?.layer as string
  const layer = (['europeans', 'americans', 'others'].includes(layerParam)
    ? layerParam
    : 'others') as LayerType

  const content = LAYER_CONTENT[layer]

  // Generate slug from title
  const getResourceSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  }

  return (
    <div className="bg-white min-h-screen">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href={`/${layer}`} className="inline-flex items-center text-blue-600 hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
          {/* Resources Header Image */}
          <div className="relative mb-6 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden">
            <img 
              src={`/images/${layer}/lifestyle-${layer === 'europeans' ? 'city' : layer === 'americans' ? 'us-family' : 'integration'}.png`}
              alt={`Swiss Immigration Resources for ${layer === 'europeans' ? 'EU/EFTA Citizens' : layer === 'americans' ? 'US Citizens' : 'International Citizens'} - Guides and Information`}
              title={`Swiss Immigration Resources - ${layer === 'europeans' ? 'EU/EFTA' : layer === 'americans' ? 'US' : 'International'} Immigration Guides`}
              className="w-full h-full object-cover"
              loading="eager"
              width={1200}
              height={500}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {content.resources.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {content.resources.description}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.resources.posts.map((post, idx) => {
            const resourceSlug = getResourceSlug(post.title)
            return (
              <motion.article
                key={idx}
                id={post.title.toLowerCase().replace(/\s+/g, '-')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
                
                {/* Resource Image or Icon */}
                <div className="relative mb-4 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden">
                  {(() => {
                    const categoryLower = post.category.toLowerCase()
                    if (categoryLower.includes('permit') || categoryLower.includes('visa')) {
                      return (
                        <img 
                          src={`/images/${layer}/permits-${layer === 'europeans' ? 'eu-types' : layer === 'americans' ? 'quota-system' : 'international'}.${layer === 'europeans' ? 'png' : layer === 'americans' ? 'jpeg' : 'jpeg'}`}
                          alt={`${post.title} - ${layer === 'europeans' ? 'EU/EFTA' : layer === 'americans' ? 'US' : 'International'} Permits`}
                          className="w-full h-full object-cover opacity-60"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      )
                    }
                    if (categoryLower.includes('document') || categoryLower.includes('requirement')) {
                      return (
                        <img 
                          src={`/images/${layer}/${layer === 'europeans' ? 'process-registration' : 'documents-apostille'}.png`}
                          alt={`${post.title} - Documents`}
                          className="w-full h-full object-cover opacity-60"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      )
                    }
                    const IconComponent = getCategoryIcon(post.category)
                    return (
                      <div className="flex items-center justify-center h-full">
                        <IconComponent className="w-12 h-12 text-blue-600" />
                      </div>
                    )
                  })()}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="pt-4 border-t border-gray-200 mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>5 min read</span>
                    </div>
                    <Link
                      href={`/${layer}/resources/${resourceSlug}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Official Resources
            </h3>
            <ul className="space-y-2 text-gray-700">
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

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Get Professional Help
            </h3>
            <p className="text-gray-700 mb-4">
              Consider consulting with a certified Swiss immigration lawyer for personalized advice.
            </p>
            <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors inline-block">
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-800 mb-4">
            <strong>Disclaimer:</strong> General information only (updated Nov 2025). Not legal advice. 
            Consult with a certified Swiss immigration lawyer for your specific case. 
            Laws and regulations may change. Verify all information with official sources.
          </p>
          <p className="text-sm text-gray-800">
            <strong>Official Sources:</strong> This information is based on the Foreign Nationals Act (AuG, SR 142.20), 
            the Foreign Nationals and Integration Ordinance (VZAE, SR 142.201), the Agreement on the Free Movement of Persons (FMPA), 
            and the Citizenship Act (StAG, SR 141.0). Always verify current regulations at <a href="https://www.fedlex.admin.ch" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Fedlex.admin.ch</a> and 
            <a href="https://www.sem.admin.ch" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> SEM.admin.ch</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

