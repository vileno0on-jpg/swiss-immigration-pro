// Template Selector Component - Loads templates dynamically with modern UI
'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import type { TemplateMetadata } from '@/types/resume'
import { Check, Layout, ChevronDown, Sparkles, Image as ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SwissClassic from './templates/SwissClassic'
import ModernZurich from './templates/ModernZurich'

// Template metadata
const AVAILABLE_TEMPLATES: TemplateMetadata[] = [
  {
    id: 'swiss-classic',
    name: 'Swiss Classic',
    description: 'Conservative two-column layout with photo on top right. Standard for corporate roles.',
    thumbnailUrl: '/templates/swiss-classic-thumb.png',
    componentKey: 'swiss-classic',
    category: 'classic',
  },
  {
    id: 'modern-zurich',
    name: 'Modern Zurich',
    description: 'Cleaner, header-focused layout with blue accent. Best for tech and creative roles.',
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

  const currentTemplate = AVAILABLE_TEMPLATES.find(t => t.id === currentTemplateId)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:border-slate-300 transition-all group"
      >
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/10">
          <Layout className="w-4 h-4" />
        </div>
        <div className="text-left hidden md:block">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Design Template</div>
          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {currentTemplate?.name || 'Select Template'}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10 bg-slate-900/10 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 mt-4 bg-white rounded-[32px] shadow-2xl border border-slate-100 z-20 p-8 min-w-[400px] overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5">
                <Layout className="w-32 h-32" />
              </div>

              <div className="relative">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Select Design
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {AVAILABLE_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleSelectTemplate(template.id)}
                      className={`group relative w-full text-left p-6 rounded-3xl border-2 transition-all overflow-hidden ${
                        currentTemplateId === template.id
                          ? 'border-blue-600 bg-blue-50/50 shadow-xl shadow-blue-500/5'
                          : 'border-slate-50 bg-white hover:border-blue-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-5">
                        <div className={`w-16 h-20 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden ${currentTemplateId === template.id ? 'ring-2 ring-blue-500/20' : ''}`}>
                          <div className="flex flex-col gap-1 w-full px-2">
                            <div className="h-1 bg-slate-300 rounded-full w-3/4" />
                            <div className="h-1 bg-slate-300 rounded-full w-full" />
                            <div className="h-1 bg-slate-300 rounded-full w-1/2" />
                            <div className="h-8 bg-slate-200 rounded-md w-full mt-1" />
                            <div className="h-1 bg-slate-300 rounded-full w-3/4 mt-1" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-black text-slate-900 text-lg">{template.name}</div>
                            {currentTemplateId === template.id && (
                              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                                <Check className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                            {template.description}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-white border border-slate-100 rounded-full text-slate-400">
                              {template.category}
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-white border border-slate-100 rounded-full text-slate-400">
                              A4 Ready
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-[0.2em]">
                    Premium designs included in your plan
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Template component mapper
export function getTemplateComponent(componentKey: string) {
  switch (componentKey) {
    case 'swiss-classic':
      return SwissClassic
    case 'modern-zurich':
      return ModernZurich
    default:
      // Always return SwissClassic as fallback
      return SwissClassic
  }
}
