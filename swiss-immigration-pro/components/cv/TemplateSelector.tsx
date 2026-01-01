'use client'

import { useState } from 'react'
import { Check, Star, Sparkles } from 'lucide-react'
import { CVTemplate } from '@/types/cv'
import { CV_TEMPLATES, getAllCategories } from '@/lib/cv/templates'

interface TemplateSelectorProps {
  selectedTemplateId: string
  onSelectTemplate: (templateId: string) => void
}

export default function TemplateSelector({ selectedTemplateId, onSelectTemplate }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const categories = ['All', ...getAllCategories()]

  const filteredTemplates = selectedCategory === 'All'
    ? CV_TEMPLATES
    : CV_TEMPLATES.filter(t => t.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-blue-500 rounded-full mr-3"></div>
          Choose Your Template
        </h2>
        <p className="text-sm text-gray-600 font-medium ml-4">
          {CV_TEMPLATES.length} professional templates • All ATS-optimized
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b-2 border-blue-100">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200'
                : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto">
        {filteredTemplates.map(template => {
          const isSelected = selectedTemplateId === template.id
          return (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`relative group rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                isSelected
                  ? 'border-blue-600 ring-4 ring-blue-200 shadow-2xl scale-105'
                  : 'border-blue-200 hover:border-blue-400 hover:shadow-xl'
              }`}
            >
              {/* Template Preview */}
              <div
                className="h-48 bg-gradient-to-br p-4 flex flex-col justify-between"
                style={{
                  background: `linear-gradient(135deg, ${template.config.colorScheme.primary} 0%, ${template.config.colorScheme.secondary} 100%)`
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="text-white">
                    <div className="text-lg font-bold mb-1" style={{ fontFamily: template.config.typography.headingFont }}>
                      John Doe
                    </div>
                    <div className="text-xs opacity-90">Software Engineer</div>
                  </div>
                  {template.isPremium && (
                    <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 h-2 bg-white/30 rounded"></div>
                  <div className="flex-1 h-2 bg-white/30 rounded"></div>
                  <div className="flex-1 h-2 bg-white/30 rounded"></div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-5 bg-white">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-left">
                      {template.name}
                    </h3>
                    <p className="text-xs text-gray-600 text-left mt-1 font-medium">
                      {template.category}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full p-1.5 shadow-md">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 text-left line-clamp-2 font-medium">
                  {template.description}
                </p>
              </div>

              {/* Hover Overlay */}
              {!isSelected && (
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-2xl">
                  <div className="bg-white rounded-xl px-5 py-2.5 shadow-xl border-2 border-blue-200">
                    <span className="text-sm font-bold text-gray-900">Select Template</span>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Template Count */}
      <div className="mt-6 pt-6 border-t-2 border-blue-100 text-center">
        <p className="text-sm text-gray-600 font-medium">
          Showing {filteredTemplates.length} of {CV_TEMPLATES.length} templates
        </p>
      </div>
    </div>
  )
}

