'use client'

import { motion } from 'framer-motion'
import { FileText, Download, CheckCircle2, Star, ArrowRight, Briefcase, GraduationCap, Award } from 'lucide-react'
import Link from 'next/link'
import MainHeader from '@/components/layout/MainHeader'

const templates = [
  {
    id: 1,
    name: 'Swiss Professional',
    category: 'General',
    description: 'Clean, ATS-optimized format perfect for most industries. Includes professional photo section.',
    features: ['ATS-friendly', 'Photo section', '2-page format', 'Multi-language'],
    popular: true,
    downloads: 1250,
    rating: 4.9
  },
  {
    id: 2,
    name: 'Tech & IT Specialist',
    category: 'Technology',
    description: 'Designed for software engineers, developers, and IT professionals. Highlights technical skills prominently.',
    features: ['Skills-first layout', 'Project showcase', 'GitHub integration', 'Certifications'],
    popular: true,
    downloads: 890,
    rating: 4.8
  },
  {
    id: 3,
    name: 'Finance & Banking',
    category: 'Finance',
    description: 'Professional format for finance, banking, and consulting roles. Emphasizes achievements and metrics.',
    features: ['Achievement-focused', 'Quantified results', 'Executive style', 'Swiss banking standards'],
    popular: false,
    downloads: 450,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Healthcare Professional',
    category: 'Healthcare',
    description: 'Specialized format for doctors, nurses, and healthcare workers. Includes licensing and certifications.',
    features: ['License section', 'Clinical experience', 'Continuing education', 'Multi-language'],
    popular: false,
    downloads: 320,
    rating: 4.6
  },
  {
    id: 5,
    name: 'Academic & Research',
    category: 'Education',
    description: 'Perfect for researchers, professors, and academic positions. Highlights publications and research.',
    features: ['Publications section', 'Research focus', 'Academic achievements', 'Conference presentations'],
    popular: false,
    downloads: 280,
    rating: 4.8
  },
  {
    id: 6,
    name: 'Creative & Design',
    category: 'Creative',
    description: 'Modern, visually appealing format for designers, marketers, and creative professionals.',
    features: ['Portfolio links', 'Visual elements', 'Creative layout', 'Project gallery'],
    popular: false,
    downloads: 210,
    rating: 4.5
  }
]

const categories = ['All', 'General', 'Technology', 'Finance', 'Healthcare', 'Education', 'Creative']

export default function CvTemplatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-6 shadow-lg"
          >
            <FileText className="w-10 h-10 text-blue-600" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Swiss CV Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Professionally designed CV templates that meet Swiss employer standards. ATS-optimized, multi-language ready, and tailored for success.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>ATS-Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Swiss Standards</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Multi-Language</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Editable Formats</span>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                🎉 CV Templates Coming Soon!
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                We're currently preparing a comprehensive collection of professionally designed CV templates that meet Swiss employer standards. 
                Subscribe to our newsletter to be notified as soon as they're available.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-all whitespace-nowrap"
            >
              <span>Get Notified</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Template Preview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                        {template.popular && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{template.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-gray-900">{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {template.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {template.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {template.downloads.toLocaleString()} downloads
                    </span>
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Our CV Templates?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Briefcase,
                title: 'Swiss Standards',
                description: 'Designed specifically for Swiss employers and ATS systems'
              },
              {
                icon: GraduationCap,
                title: 'Multi-Language',
                description: 'Templates available in German, French, Italian, and English'
              },
              {
                icon: Award,
                title: 'ATS-Optimized',
                description: 'Pass applicant tracking systems with proper formatting'
              },
              {
                icon: Download,
                title: 'Easy to Edit',
                description: 'Download in Word, PDF, or Google Docs formats'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Land Your Dream Job in Switzerland?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Get notified when our professional CV templates are available, plus receive exclusive tips for Swiss job applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 font-semibold px-8 py-4 rounded-lg transition-all"
            >
              <span>Get Notified</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 font-semibold px-8 py-4 rounded-lg transition-all border-2 border-white/20"
            >
              <span>View Pricing</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
