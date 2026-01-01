'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Star, Zap, Check, FileText } from 'lucide-react'
import { getTemplateJSON } from '@/lib/cv/templates'
import { useCVCanvasStore } from '@/store/cvCanvasStore'

const TEMPLATES = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Sidebar layout • Clean & modern',
    gradient: 'from-gray-800 to-gray-900',
    icon: '📄',
    accent: 'gray',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Header layout • Bold & colorful',
    gradient: 'from-blue-600 via-green-600 to-green-700',
    icon: '🎨',
    accent: 'green',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Two-column • Traditional',
    gradient: 'from-amber-700 via-amber-800 to-amber-900',
    icon: '📜',
    accent: 'amber',
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Code-style • Developer',
    gradient: 'from-blue-500 via-blue-600 to-blue-700',
    icon: '💻',
    accent: 'blue',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Elegant • Leadership',
    gradient: 'from-slate-700 via-slate-800 to-slate-900',
    icon: '👔',
    accent: 'slate',
  },
  {
    id: 'colorful',
    name: 'Colorful',
    description: 'Vibrant • Creative',
    gradient: 'from-green-500 via-green-600 to-green-700',
    icon: '🌈',
    accent: 'green',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean • Blue accent',
    gradient: 'from-blue-500 via-blue-600 to-blue-700',
    icon: '✨',
    accent: 'blue',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated • Refined',
    gradient: 'from-blue-600 via-blue-700 to-blue-800',
    icon: '💎',
    accent: 'blue',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Black & gold • High impact',
    gradient: 'from-black via-gray-900 to-yellow-600',
    icon: '⚡',
    accent: 'yellow',
  },
]

interface EnhancedTemplateSelectorProps {
  isOpen: boolean
  onClose: () => void
}

export default function EnhancedTemplateSelector({ isOpen, onClose }: EnhancedTemplateSelectorProps) {
  const { loadTemplate } = useCVCanvasStore()
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

  const handleSelectTemplate = (templateId: string) => {
    const templateJson = getTemplateJSON(templateId)
    loadTemplate(templateJson)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur and glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 z-[10000] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Animated background particles */}
          <div className="fixed inset-0 z-[10001] pointer-events-none overflow-hidden">
            {typeof window !== 'undefined' && [...Array(20)].map((_, i) => {
              const randomX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)
              const randomY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  initial={{
                    x: randomX,
                    y: randomY,
                    opacity: 0.3,
                  }}
                  animate={{
                    y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
                    x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )
            })}
          </div>

          {/* Main Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed inset-0 z-[10002] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden pointer-events-auto relative"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.1)',
              }}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 opacity-20">
                <div className="w-full h-full bg-white rounded-3xl" />
              </div>

              {/* Header */}
              <div className="relative p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 via-blue-100 to-green-50">
                <div className="flex items-center justify-between">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center space-x-3 mb-2"
                    >
                      <div className="p-3 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl shadow-lg">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 bg-clip-text text-transparent">
                          Choose Your CV Template
                        </h2>
                        <p className="text-sm text-gray-600 mt-1 font-medium">
                          {TEMPLATES.length} professional templates • All ATS-optimized
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </motion.button>
                </div>
              </div>

              {/* Template Grid */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {TEMPLATES.map((template, index) => (
                    <motion.button
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setHoveredTemplate(template.id)}
                      onHoverEnd={() => setHoveredTemplate(null)}
                      onClick={() => handleSelectTemplate(template.id)}
                      className="relative group"
                    >
                      {/* Card */}
                      <div
                        className={`relative h-64 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                          hoveredTemplate === template.id
                            ? 'border-blue-500 shadow-2xl shadow-blue-500/50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {/* Animated gradient background */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${template.gradient}`}
                          animate={
                            hoveredTemplate === template.id
                              ? {
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 2, -2, 0],
                                }
                              : {}
                          }
                          transition={{ duration: 0.5 }}
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                              ease: 'easeInOut',
                            }}
                          />
                        </motion.div>

                        {/* Content */}
                        <div className="relative h-full p-6 flex flex-col justify-between text-white">
                          {/* Icon and Badge */}
                          <div className="flex items-start justify-between">
                            <motion.div
                              animate={
                                hoveredTemplate === template.id
                                  ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                                  : {}
                              }
                              transition={{ duration: 0.5 }}
                              className="text-5xl"
                            >
                              {template.icon}
                            </motion.div>
                            {index < 3 && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                className="bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg"
                              >
                                <Star className="w-3 h-3 fill-current" />
                                <span>Popular</span>
                              </motion.div>
                            )}
                          </div>

                          {/* Template Info */}
                          <div>
                            <h3 className="text-xl font-bold mb-1">{template.name}</h3>
                            <p className="text-sm opacity-90">{template.description}</p>
                          </div>

                          {/* Hover indicator */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                              opacity: hoveredTemplate === template.id ? 1 : 0,
                              y: hoveredTemplate === template.id ? 0 : 10,
                            }}
                            className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
                          >
                            <Zap className="w-5 h-5" />
                          </motion.div>
                        </div>

                        {/* Glow effect on hover */}
                        {hoveredTemplate === template.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`absolute -inset-1 bg-gradient-to-r ${template.gradient} rounded-2xl blur-xl opacity-50`}
                          />
                        )}
                      </div>

                      {/* Selection indicator */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                          scale: hoveredTemplate === template.id ? 1 : 0,
                        }}
                        className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-600 to-green-600 rounded-full p-2 shadow-lg z-10"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="relative p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">
                    All templates are professionally designed and ATS-optimized
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

