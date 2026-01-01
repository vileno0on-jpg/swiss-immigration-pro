'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useCVCanvasStore } from '@/store/cvCanvasStore'
import { FileText, Type, Shapes, Upload, Plus, Image as ImageIcon, Sparkles, Loader2, Tag, Wand2 } from 'lucide-react'
import { IText, Rect, Circle, Triangle, Image as FabricImage, Polygon, Path } from 'fabric'
import { getTemplateJSON } from '@/lib/cv/templates'
import AssetPanel from './AssetPanel'
import ResizablePanel from './ResizablePanel'
import EnhancedTemplateSelector from './EnhancedTemplateSelector'

interface CVTemplate {
  id: string
  name: string
  category: string
  description: string | null
  template_data: any
  is_active: boolean
  created_at: string
}

// Typing animation component for template descriptions
function TypingDescription({ content, isActive }: { content: string; isActive: boolean }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    if (!isActive || !content) {
      setDisplayedText(content || '')
      return
    }

    setDisplayedText('')
    let currentIndex = 0
    let timeoutId: NodeJS.Timeout | null = null
    
    const getTypingSpeed = (char: string) => {
      if (char === ' ') return 30 + (Math.random() * 20)
      if (['.', '!', '?'].includes(char)) return 250 + (Math.random() * 100)
      if (char === ',') return 100 + (Math.random() * 50)
      return 20 + (Math.random() * 20)
    }

    const typeNextChar = () => {
      if (currentIndex < content.length) {
        const char = content[currentIndex]
        setDisplayedText(content.slice(0, currentIndex + 1))
        currentIndex++
        
        const speed = getTypingSpeed(char)
        timeoutId = setTimeout(typeNextChar, speed)
      }
    }

    const startTimer = setTimeout(typeNextChar, 100)

    return () => {
      clearTimeout(startTimer)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [content, isActive])

  const isTyping = isActive && displayedText.length < content.length

  return (
    <span className="inline-block">
      {displayedText}
      {isTyping && (
        <motion.span 
          className="inline-block w-0.5 h-3 bg-blue-500 ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </span>
  )
}

export default function Sidebar() {
  const { activeTab, setActiveTab, canvas, loadTemplate } = useCVCanvasStore()
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [templates, setTemplates] = useState<CVTemplate[]>([])
  const [loadingTemplates, setLoadingTemplates] = useState(true)
  const [templatesError, setTemplatesError] = useState<string | null>(null)
  const [aiDescriptions, setAiDescriptions] = useState<Record<string, string>>({})
  const [loadingDescriptions, setLoadingDescriptions] = useState<Record<string, boolean>>({})
  const [typingActive, setTypingActive] = useState<Record<string, boolean>>({})

  // Generate AI description for a template
  const generateAIDescription = useCallback(async (template: CVTemplate) => {
    const cacheKey = template.id
    
    // Set loading state
    setLoadingDescriptions(prev => {
      if (prev[cacheKey]) return prev // Already loading
      return { ...prev, [cacheKey]: true }
    })

    try {
      const prompt = `Generate a brief, professional description (max 80 characters) for a CV template named "${template.name}" in the "${template.category}" category. Make it concise, highlighting what makes this template suitable for its category. Only return the description text, nothing else.`
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          packId: 'free',
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const description = data.response?.trim() || template.description || 'Professional CV template'
        // Limit to 80 characters
        const shortDescription = description.length > 80 
          ? description.substring(0, 77) + '...' 
          : description
        
        setAiDescriptions(prev => ({ ...prev, [cacheKey]: shortDescription }))
        setTypingActive(prev => ({ ...prev, [cacheKey]: true }))
        
        // Stop typing animation after content is displayed
        setTimeout(() => {
          setTypingActive(prev => ({ ...prev, [cacheKey]: false }))
        }, 3000)
      }
    } catch (error) {
      console.error('Error generating AI description:', error)
      // Fallback to existing description
      if (template.description) {
        setAiDescriptions(prev => ({ ...prev, [cacheKey]: template.description! }))
      }
    } finally {
      setLoadingDescriptions(prev => {
        const updated = { ...prev }
        delete updated[cacheKey]
        return updated
      })
    }
  }, [])

  // Fetch templates from API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoadingTemplates(true)
        setTemplatesError(null)
        const response = await fetch('/api/cv/templates')
        if (response.ok) {
          const data = await response.json()
          const fetchedTemplates = data.templates || []
          setTemplates(fetchedTemplates)
          
          // Generate AI descriptions for templates without descriptions
          fetchedTemplates.forEach((template: CVTemplate, index: number) => {
            if (!template.description) {
              // Delay to avoid overwhelming the API
              setTimeout(() => generateAIDescription(template), index * 500 + Math.random() * 500)
            } else {
              // Use existing description
              setAiDescriptions(prev => ({ ...prev, [template.id]: template.description! }))
            }
          })
        } else {
          setTemplatesError('Failed to load templates')
        }
      } catch (error) {
        console.error('Error fetching templates:', error)
        setTemplatesError('Failed to load templates')
      } finally {
        setLoadingTemplates(false)
      }
    }

    fetchTemplates()
  }, [])

  const handleLoadTemplate = (templateData: any) => {
    // If templateData is a string (from old system), use it directly
    // Otherwise, it's from the database, so stringify it
    const templateJson = typeof templateData === 'string' 
      ? templateData 
      : JSON.stringify(templateData)
    loadTemplate(templateJson)
  }

  // Group templates by category
  const templatesByCategory = templates.reduce((acc, template) => {
    const category = template.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(template)
    return acc
  }, {} as Record<string, CVTemplate[]>)

  // Helper to get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Tech & IT': 'from-blue-500 to-blue-600',
      'Finance': 'from-emerald-500 to-emerald-600',
      'Healthcare': 'from-red-500 to-red-600',
      'Engineering': 'from-orange-500 to-orange-600',
      'Consulting': 'from-purple-500 to-purple-600',
      'Legal': 'from-indigo-500 to-indigo-600',
      'Marketing': 'from-pink-500 to-pink-600',
      'Other': 'from-gray-500 to-gray-600',
    }
    return colors[category] || colors['Other']
  }

  const addTextToCanvas = () => {
    if (!canvas) return

    const text = new IText('Click to edit', {
      left: 100,
      top: 100,
      fontSize: 16,
      fontFamily: 'Arial',
      fill: '#000000',
    })

    canvas.add(text)
    canvas.setActiveObject(text)
    canvas.renderAll()
  }

  const addShapeToCanvas = (shapeType: 'rect' | 'circle' | 'triangle' | 'star' | 'arrow' | 'hexagon' | 'diamond' | 'heart') => {
    if (!canvas) return

    let shape: Rect | Circle | Triangle | Polygon | Path

    switch (shapeType) {
      case 'rect':
        shape = new Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#0056B3',
        })
        break
      case 'circle':
        shape = new Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: '#0056B3',
        })
        break
      case 'triangle':
        shape = new Triangle({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#0056B3',
        })
        break
      case 'star':
        // 5-pointed star
        const starPoints = []
        const outerRadius = 50
        const innerRadius = 25
        for (let i = 0; i < 10; i++) {
          const angle = (i * Math.PI) / 5
          const radius = i % 2 === 0 ? outerRadius : innerRadius
          starPoints.push({
            x: 100 + radius * Math.cos(angle - Math.PI / 2),
            y: 100 + radius * Math.sin(angle - Math.PI / 2),
          })
        }
        shape = new Polygon(starPoints, {
          left: 100,
          top: 100,
          fill: '#0056B3',
        })
        break
      case 'arrow':
        // Right-pointing arrow
        shape = new Path('M 0 0 L 60 30 L 0 60 L 15 30 Z', {
          left: 100,
          top: 100,
          fill: '#0056B3',
        })
        break
      case 'hexagon':
        // Regular hexagon
        const hexPoints = []
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          hexPoints.push({
            x: 100 + 50 * Math.cos(angle),
            y: 100 + 50 * Math.sin(angle),
          })
        }
        shape = new Polygon(hexPoints, {
          left: 100,
          top: 100,
          fill: '#0056B3',
        })
        break
      case 'diamond':
        // Diamond shape
        shape = new Polygon([
          { x: 100, y: 50 },
          { x: 150, y: 100 },
          { x: 100, y: 150 },
          { x: 50, y: 100 },
        ], {
          left: 100,
          top: 100,
          fill: '#0056B3',
        })
        break
      case 'heart':
        // Heart shape using path (simplified)
        shape = new Path('M 50,30 C 50,20 40,15 30,20 C 20,15 10,20 10,30 C 10,40 20,50 30,60 L 50,80 L 70,60 C 80,50 90,40 90,30 C 90,20 80,15 70,20 C 60,15 50,20 50,30 Z', {
          left: 100,
          top: 100,
          fill: '#0056B3',
        })
        break
    }

    canvas.add(shape)
    canvas.setActiveObject(shape)
    canvas.renderAll()
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !e.target.files?.[0]) return

    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const fabricImage = new FabricImage(img, {
          scaleX: 200 / img.width,
          scaleY: 200 / img.height,
          left: 100,
          top: 100,
        })
        canvas.add(fabricImage)
        canvas.setActiveObject(fabricImage)
        canvas.renderAll()
      }
      img.src = event.target?.result as string
    }

    reader.readAsDataURL(file)
  }

  const tabs = [
    { id: 'templates' as const, label: 'Templates', icon: FileText },
    { id: 'text' as const, label: 'Text', icon: Type },
    { id: 'shapes' as const, label: 'Shapes', icon: Shapes },
    { id: 'photos' as const, label: 'Photos', icon: ImageIcon },
    { id: 'uploads' as const, label: 'Uploads', icon: Upload },
  ]

  return (
    <ResizablePanel
      position="left"
      defaultWidth={320}
      minWidth={200}
      maxWidth={600}
    >
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="flex border-b border-gray-200/60 bg-gradient-to-r from-gray-50/80 to-white flex-shrink-0 shadow-sm">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3.5 text-sm font-semibold transition-all duration-200 relative ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div className="flex flex-col items-center space-y-1 relative z-10">
                <tab.icon className={`w-5 h-5 transition-all ${activeTab === tab.id ? 'scale-110' : ''}`} />
                <span>{tab.label}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={activeTab === 'photos' ? 'flex-1 overflow-hidden' : 'flex-1 overflow-y-auto p-4'}>
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">CV Templates</h3>
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-xs font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Browse All</span>
              </button>
            </div>

            {loadingTemplates ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
                <p className="text-sm text-gray-600">Loading templates...</p>
              </div>
            ) : templatesError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-sm text-red-700">{templatesError}</p>
                <p className="text-xs text-red-600 mt-2">Using fallback templates</p>
              </div>
            ) : templates.length === 0 ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-900 font-medium">No templates available</p>
                <p className="text-xs text-blue-700 mt-1">Templates will appear here once added to the database</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
                  <div key={category} className="space-y-3">
                    {/* Category Header */}
                    <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                      <div className={`w-4 h-4 rounded bg-gradient-to-r ${getCategoryColor(category)} flex items-center justify-center`}>
                        <Tag className="w-2.5 h-2.5 text-white" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        {category}
                      </h4>
                      <span className="text-xs text-gray-500">({categoryTemplates.length})</span>
                    </div>

                    {/* Templates in Category */}
                    <div className="space-y-2.5">
                      {categoryTemplates.map((template) => {
                        const description = aiDescriptions[template.id] || template.description
                        const isLoadingDesc = loadingDescriptions[template.id]
                        const isTyping = typingActive[template.id]
                        
                        return (
                          <motion.button
                            key={template.id}
                            whileHover={{ scale: 1.01, y: -1 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleLoadTemplate(template.template_data)}
                            className="w-full p-3.5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-white transition-all duration-200 text-left shadow-sm hover:shadow-md group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-12 h-16 bg-gradient-to-br ${getCategoryColor(category)} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow relative`}>
                                <FileText className="w-6 h-6 text-white" />
                                {isLoadingDesc && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Loader2 className="w-2.5 h-2.5 text-white animate-spin" />
                                  </div>
                                )}
                                {!isLoadingDesc && !description && (
                                  <div 
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      generateAIDescription(template)
                                    }}
                                    title="Generate AI description"
                                  >
                                    <Wand2 className="w-2.5 h-2.5 text-white" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-semibold text-gray-900 text-sm truncate">
                                    {template.name}
                                  </h4>
                                  {description && !template.description && (
                                    <Sparkles className="w-3 h-3 text-purple-500 flex-shrink-0" title="AI-enhanced description" />
                                  )}
                                </div>
                                <div className="text-xs text-gray-600 mt-0.5 line-clamp-2 min-h-[2.5rem]">
                                  {isLoadingDesc ? (
                                    <div className="flex items-center space-x-2">
                                      <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                                      <span className="text-gray-500">Generating description...</span>
                                    </div>
                                  ) : description ? (
                                    <TypingDescription content={description} isActive={isTyping} />
                                  ) : (
                                    <p className="text-gray-500 italic">Professional template</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Fallback to old templates if database is empty */}
            {!loadingTemplates && templates.length === 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-4 text-center">Default Templates</p>
                <div className="space-y-2.5">
                  {['professional', 'minimal', 'contemporary', 'executive', 'tech', 'creative'].map((templateName) => (
                    <motion.button
                      key={templateName}
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleLoadTemplate(getTemplateJSON(templateName))}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-200 text-left shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm capitalize">
                            {templateName}
                          </h4>
                          <p className="text-xs text-gray-600 mt-0.5">Default template</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'text' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 mb-5">Add Text</h3>
            <button
              onClick={addTextToCanvas}
              className="w-full p-5 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all flex items-center justify-center space-x-2.5 shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Add Text Box</span>
            </button>
            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-600">Click to add editable text to your CV</p>
            </div>
          </div>
        )}

        {activeTab === 'shapes' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 mb-5">Add Shapes</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => addShapeToCanvas('rect')}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all flex flex-col items-center space-y-2 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-sm"></div>
                <span className="text-xs font-semibold text-gray-700">Rectangle</span>
              </button>
              <button
                onClick={() => addShapeToCanvas('circle')}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all flex flex-col items-center space-y-2 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-sm"></div>
                <span className="text-xs font-semibold text-gray-700">Circle</span>
              </button>
              <button
                onClick={() => addShapeToCanvas('triangle')}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all flex flex-col items-center space-y-2 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                <span className="text-xs font-semibold text-gray-700">Triangle</span>
              </button>
              <button
                onClick={() => addShapeToCanvas('star')}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all flex flex-col items-center space-y-2 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                <span className="text-xs font-semibold text-gray-700">Star</span>
              </button>
              <button
                onClick={() => addShapeToCanvas('arrow')}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all flex flex-col items-center space-y-2 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700" style={{ clipPath: 'polygon(0% 0%, 70% 50%, 0% 100%, 25% 50%)' }}></div>
                <span className="text-xs font-semibold text-gray-700">Arrow</span>
              </button>
              <button
                onClick={() => addShapeToCanvas('hexagon')}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all flex flex-col items-center space-y-2 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                <span className="text-xs font-semibold text-gray-700">Hexagon</span>
              </button>
              <button
                onClick={() => addShapeToCanvas('diamond')}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all flex flex-col items-center space-y-2 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                <span className="text-xs font-semibold text-gray-700">Diamond</span>
              </button>
              <button
                onClick={() => addShapeToCanvas('heart')}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all flex flex-col items-center space-y-2 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700" style={{ clipPath: 'path("M 12 21.35 l -1.45 -1.32 C 5.4 15.36 2 12.28 2 8.5 C 2 5.42 4.42 3 7.5 3 c 1.74 0 3.41 0.81 4.5 2.09 C 13.09 3.81 14.76 3 16.5 3 C 19.58 3 22 5.42 22 8.5 c 0 3.78 -3.4 6.86 -8.55 11.54 L 12 21.35 z")', transform: 'scale(0.5)' }}></div>
                <span className="text-xs font-semibold text-gray-700">Heart</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <AssetPanel />
        )}

        {activeTab === 'uploads' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 mb-5">Upload Images</h3>
            <label className="block w-full p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all cursor-pointer shadow-sm hover:shadow-md">
              <div className="flex flex-col items-center space-y-2.5">
                <Upload className="w-8 h-8 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Click to Upload</span>
                <span className="text-xs text-gray-500">PNG, JPG up to 10MB</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
        </div>
      </div>

      {/* Enhanced Template Selector Modal */}
      <EnhancedTemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
      />
    </ResizablePanel>
  )
}

