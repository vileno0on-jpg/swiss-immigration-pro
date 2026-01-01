// Template Selector Component - Loads templates dynamically
'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import type { TemplateMetadata } from '@/types/resume'
import { Check } from 'lucide-react'

// Template metadata - In future, this will be loaded from database
const AVAILABLE_TEMPLATES: TemplateMetadata[] = [
  {
    id: 'swiss-classic',
    name: 'Swiss Classic',
    description: 'Conservative two-column layout with photo on top right',
    thumbnailUrl: '/templates/swiss-classic-thumb.png',
    componentKey: 'swiss-classic',
    category: 'classic',
  },
  {
    id: 'modern-zurich',
    name: 'Modern Zurich',
    description: 'Cleaner, header-focused layout with blue accent',
    thumbnailUrl: '/templates/modern-zurich-thumb.png',
    componentKey: 'modern-zurich',
    category: 'modern',
  },
]

export default function TemplateSelector() {
  const { currentTemplateId, setTemplate } = useResumeStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectTemplate = (templateId: string) => {
    setTemplate(templateId)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <span>Template: {AVAILABLE_TEMPLATES.find(t => t.id === currentTemplateId)?.name || 'Select'}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-20 p-4 min-w-[300px]">
            <h3 className="font-bold text-gray-900 mb-3">Select Template</h3>
            <div className="space-y-2">
              {AVAILABLE_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    currentTemplateId === template.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{template.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{template.description}</div>
                    </div>
                    {currentTemplateId === template.id && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Template component mapper
import SwissClassic from './templates/SwissClassic'
import ModernZurich from './templates/ModernZurich'

export function getTemplateComponent(componentKey: string) {
  switch (componentKey) {
    case 'swiss-classic':
      return SwissClassic
    case 'modern-zurich':
      return ModernZurich
    default:
      return SwissClassic
  }
}

