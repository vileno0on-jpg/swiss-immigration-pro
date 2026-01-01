'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, FileText, Clock, ChevronDown, ChevronRight,
  ExternalLink, Info, Menu, X, ShieldCheck, Award, Link as LinkIcon,
  PanelLeftOpen, PanelLeftClose, Maximize2, Minimize2, Sparkles, GripVertical,
  Volume2, VolumeX, Play, Pause, Square
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import AITutorBot from './AITutorBot'

interface ModuleSection {
  id: string
  title: string
  content: string
  subsections?: ModuleSection[]
  legalReferences?: string[]
  officialLinks?: { title: string; url: string }[]
  keyPoints?: string[]
}

interface EnhancedModule {
  title: string
  description: string
  sections: ModuleSection[]
  estimatedReadTime?: string
  lastUpdated?: string
}

interface EnhancedModuleDisplayProps {
  module: EnhancedModule
}

export default function EnhancedModuleDisplay({ module }: EnhancedModuleDisplayProps) {
  // Validate module structure
  if (!module || !module.title || !module.sections || !Array.isArray(module.sections)) {
    console.error('Invalid module structure:', module)
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-900 mb-2">Module Error</h2>
            <p className="text-red-700">The module data is not properly formatted. Please check the module configuration.</p>
            <pre className="mt-4 text-xs bg-white p-4 rounded border border-red-200 overflow-auto">
              {JSON.stringify(module, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    )
  }

  const [activeSection, setActiveSection] = useState<string>(module.sections[0]?.id || '')
  const [expandedTocSections, setExpandedTocSections] = useState<Set<string>>(new Set([module.sections[0]?.id]))
  const [sidebarOpen, setSidebarOpen] = useState(true) // Always open on desktop by default
  const [focusMode, setFocusMode] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(256) // Default 256px (w-64)
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)
  const [isResizingSidebar, setIsResizingSidebar] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [isTTSOpen, setIsTTSOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [speechSynth, setSpeechSynth] = useState<SpeechSynthesis | null>(null)
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  // Intersection Observer to update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    module.sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
      
      section.subsections?.forEach(sub => {
         const subEl = document.getElementById(sub.id)
         if (subEl) observer.observe(subEl)
      })
    })

    return () => observer.disconnect()
  }, [module.sections])

  // Initialize TTS and load voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis
      setSpeechSynth(synth)

      const loadVoices = () => {
        const availableVoices = synth.getVoices()
        // Filter out Microsoft voices and only keep highly natural/human voices
        const naturalVoices = availableVoices.filter(v => {
          const name = v.name.toLowerCase()
          // Exclude Microsoft voices
          if (name.includes('microsoft') || name.includes('zira') || name.includes('mark')) {
            return false
          }
          // Only include highly natural voices
          return name.includes('neural') || 
                 name.includes('natural') || 
                 name.includes('premium') ||
                 name.includes('enhanced') ||
                 name.includes('google') ||
                 name.includes('amazon') ||
                 name.includes('polly') ||
                 name.includes('wavenet') ||
                 name.includes('studio')
        })
        
        // Sort voices: prioritize neural/natural/premium voices
        const sortedVoices = naturalVoices.sort((a, b) => {
          const aIsNatural = a.name.toLowerCase().includes('neural') || 
                            a.name.toLowerCase().includes('natural') || 
                            a.name.toLowerCase().includes('premium') ||
                            a.name.toLowerCase().includes('enhanced')
          const bIsNatural = b.name.toLowerCase().includes('neural') || 
                            b.name.toLowerCase().includes('natural') || 
                            b.name.toLowerCase().includes('premium') ||
                            b.name.toLowerCase().includes('enhanced')
          if (aIsNatural && !bIsNatural) return -1
          if (!aIsNatural && bIsNatural) return 1
          // Then prioritize English voices
          if (a.lang.startsWith('en') && !b.lang.startsWith('en')) return -1
          if (!a.lang.startsWith('en') && b.lang.startsWith('en')) return 1
          return a.name.localeCompare(b.name)
        })
        setVoices(sortedVoices)
        // Set default to the best natural voice (excluding Microsoft)
        const naturalVoice = sortedVoices.find(
          v => (v.name.toLowerCase().includes('neural') || 
               v.name.toLowerCase().includes('natural') || 
               v.name.toLowerCase().includes('premium') ||
               v.name.toLowerCase().includes('enhanced')) &&
               v.lang.startsWith('en')
        ) || sortedVoices.find(
          v => v.name.toLowerCase().includes('google') &&
               v.lang.startsWith('en')
        ) || sortedVoices.find(v => v.lang.startsWith('en')) || sortedVoices[0]
        if (naturalVoice) setSelectedVoice(naturalVoice)
      }

      loadVoices()
      synth.onvoiceschanged = loadVoices
    }
  }, [])

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().trim().length > 0) {
        setSelectedText(selection.toString().trim())
        setIsTTSOpen(true)
      }
    }

    document.addEventListener('mouseup', handleSelection)
    return () => document.removeEventListener('mouseup', handleSelection)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveSection(sectionId)
    }
  }

  const toggleTocSection = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newExpanded = new Set(expandedTocSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedTocSections(newExpanded)
  }

  // Check and constrain sidebar widths to prevent overlaying content
  useEffect(() => {
    const constrainSidebars = () => {
      const contentContainer = document.querySelector('.max-w-7xl')
      if (!contentContainer) return

      const containerRect = contentContainer.getBoundingClientRect()
      
      // Constrain sidebar width - ensure it doesn't touch content
      // Leave larger buffer (48px) to ensure sidebar never touches content
      const maxSidebarWidth = Math.max(200, containerRect.left - 48)
      if (sidebarOpen && sidebarWidth > maxSidebarWidth) {
        setSidebarWidth(maxSidebarWidth)
      }
      
    }

    // Check on mount and when sidebars open/change
    const timeoutId = setTimeout(constrainSidebars, 150)
    
    // Also check on window resize
    window.addEventListener('resize', constrainSidebars)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', constrainSidebars)
    }
  }, [sidebarOpen, sidebarWidth])

  // Resize handlers - sidebar shrinks if it would touch content
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingSidebar) {
        const newWidth = e.clientX
        // Find content container to calculate max width
        const contentContainer = document.querySelector('.max-w-7xl')
        let maxWidth = 350 // Default max - reduced to be safer
        if (contentContainer) {
          const containerRect = contentContainer.getBoundingClientRect()
          // Sidebar can extend up to where content padding starts
          // Leave 48px buffer to ensure it doesn't touch content
          maxWidth = Math.max(200, containerRect.left - 48)
        }
        const constrainedWidth = Math.min(Math.max(200, newWidth), maxWidth)
        setSidebarWidth(constrainedWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizingSidebar(false)
    }

    if (isResizingSidebar) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizingSidebar])

  // TTS Functions
  const speakText = (text: string) => {
    if (!speechSynth) return

    // Stop any current speech
    speechSynth.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => {
      setIsPlaying(false)
      setCurrentUtterance(null)
    }
    utterance.onerror = () => {
      setIsPlaying(false)
      setCurrentUtterance(null)
    }

    setCurrentUtterance(utterance)
    speechSynth.speak(utterance)
  }

  const stopSpeaking = () => {
    if (speechSynth) {
      speechSynth.cancel()
      setIsPlaying(false)
      setCurrentUtterance(null)
    }
  }

  const togglePlayPause = () => {
    if (!speechSynth) return
    
    if (isPlaying) {
      speechSynth.pause()
      setIsPlaying(false)
    } else if (speechSynth.paused) {
      speechSynth.resume()
      setIsPlaying(true)
    } else if (selectedText) {
      readSelectedText()
    } else {
      readCurrentChapter()
    }
  }

  const readCurrentChapter = () => {
    const currentSection = module.sections.find(s => s.id === activeSection)
    if (currentSection) {
      const textToRead = `${currentSection.title}. ${currentSection.content}`
      setSelectedText(textToRead)
      setIsTTSOpen(true)
      speakText(textToRead)
    }
  }

  const readSelectedText = () => {
    if (selectedText) {
      speakText(selectedText)
    }
  }

  const renderTocItem = (section: ModuleSection, level: number = 0) => {
    const isActive = activeSection === section.id
    const hasSubsections = section.subsections && section.subsections.length > 0
    const isExpanded = expandedTocSections.has(section.id) || isActive

    return (
      <div key={section.id} className="mb-0.5">
        <div 
          className={`group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-all duration-150 ${
            isActive 
              ? 'bg-blue-600 text-white font-medium' 
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
          } ${level > 0 ? 'ml-3 text-xs' : 'text-sm'}`}
          onClick={() => scrollToSection(section.id)}
        >
          <div className="flex items-center flex-1 min-w-0">
            {level === 0 && (
              <div className={`w-1 h-1 rounded-full mr-2 flex-shrink-0 ${
                isActive ? 'bg-white' : 'bg-blue-600'
              }`} />
            )}
            <span className={`truncate ${isActive ? 'text-white' : 'text-gray-700'}`}>
              {section.title}
            </span>
          </div>
          {hasSubsections && (
            <button 
              onClick={(e) => toggleTocSection(section.id, e)}
              className={`p-0.5 rounded transition-colors flex-shrink-0 ml-1.5 ${
                isActive 
                  ? 'text-white/90 hover:bg-white/20' 
                  : 'text-gray-400 group-hover:text-blue-600'
              }`}
            >
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
          )}
        </div>
        
        {hasSubsections && isExpanded && (
          <div className="mt-0.5 ml-3 pl-2 border-l border-gray-200 space-y-0.5">
            {section.subsections!.map(sub => renderTocItem(sub, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const renderContentSection = (section: ModuleSection, level: number = 0) => {
    return (
      <section key={section.id} id={section.id} className="scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28 mb-8 sm:mb-10 lg:mb-12 xl:mb-16">
        {/* Section Header - Mobile optimized */}
        <div className="mb-4 sm:mb-5 lg:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
          <div className="flex items-start sm:items-center justify-between gap-3">
            <h3 className={`flex-1 ${
              level === 0 ? 'text-xl sm:text-2xl lg:text-2xl font-bold' : 'text-lg sm:text-xl lg:text-xl font-semibold'
            } text-gray-900`}>
              {section.title}
            </h3>
            {level === 0 && (
              <button
                onClick={() => {
                  const textToRead = `${section.title}. ${section.content}`
                  setSelectedText(textToRead)
                  setIsTTSOpen(true)
                  speakText(textToRead)
                }}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0 touch-manipulation"
                title="Read this chapter"
              >
                <Volume2 className="w-4 h-4 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Section Content */}
        <div className="enhanced-module-content prose max-w-none text-gray-700">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({node, ...props}) => <h4 className="text-xl font-bold text-black mt-8 mb-4" {...props} />,
                h2: ({node, ...props}) => <h5 className="text-lg font-bold text-black mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h6 className="text-base font-bold text-black mt-5 mb-2" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-base font-bold text-black mt-4 mb-2" {...props} />,
                h5: ({node, ...props}) => <h5 className="text-sm font-bold text-black mt-3 mb-2" {...props} />,
                h6: ({node, ...props}) => <h6 className="text-sm font-bold text-black mt-3 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-5 text-black text-base leading-loose" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 space-y-2 mb-5 text-black" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 space-y-2 mb-5 text-black" {...props} />,
                li: ({node, ...props}) => <li className="pl-1 leading-relaxed text-black" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-blue-600 pl-4 sm:pl-5 py-3 my-4 sm:my-6 bg-blue-50 text-black rounded-r-lg" {...props} />
                ),
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-4 sm:my-6 border-2 border-blue-600 rounded-lg">
                    <table className="min-w-full divide-y divide-blue-200" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-gradient-to-r from-blue-600 to-blue-700" {...props} />,
                th: ({node, ...props}) => <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wide border-b-2 border-blue-800" style={{ color: '#ffffff', backgroundColor: 'transparent' }} {...props} />,
                td: ({node, ...props}) => <td className="px-3 sm:px-4 py-2 sm:py-3 text-black border-b border-blue-200" style={{ color: '#000000' }} {...props} />,
                a: ({node, ...props}) => (
                  <a className="text-blue-700 font-semibold underline hover:text-blue-900 hover:no-underline transition-all" target="_blank" rel="noopener noreferrer" {...props} />
                ),
                strong: ({node, ...props}) => <strong className="font-bold text-black" {...props} />
              }}
            >
              {section.content}
            </ReactMarkdown>
        </div>

        {/* Key Points */}
        {section.keyPoints && section.keyPoints.length > 0 && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Info className="w-4 h-4 text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Key Takeaways</h4>
              </div>
              <ul className="space-y-2">
                {section.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
        )}

        {/* Resources - Mobile optimized */}
        {(section.legalReferences || section.officialLinks) && (
          <div className="mt-4 sm:mt-5 lg:mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {section.legalReferences && section.legalReferences.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-center mb-2 sm:mb-3">
                  <ShieldCheck className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900">Legal Basis</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.legalReferences.map((ref, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded">
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {section.officialLinks && section.officialLinks.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-center mb-2 sm:mb-3">
                  <LinkIcon className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900">Official Sources</h4>
                </div>
                <div className="space-y-2">
                  {section.officialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-xs sm:text-sm text-blue-600 hover:underline touch-manipulation py-1"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span className="break-words">{link.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Subsections */}
        {section.subsections && section.subsections.length > 0 && (
            <div className="mt-6 pl-4 border-l border-gray-200">
              {section.subsections.map(subsection => renderContentSection(subsection, level + 1))}
            </div>
        )}
      </section>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .enhanced-module-content,
        .enhanced-module-content *:not([style*="color: white"]):not([style*="color:white"]):not([style*="background"]),
        .enhanced-module-content p,
        .enhanced-module-content h1,
        .enhanced-module-content h2,
        .enhanced-module-content h3,
        .enhanced-module-content h4,
        .enhanced-module-content h5,
        .enhanced-module-content h6,
        .enhanced-module-content li,
        .enhanced-module-content ul,
        .enhanced-module-content ol,
        .enhanced-module-content strong,
        .enhanced-module-content span:not([style*="color: white"]):not([style*="color:white"]),
        .enhanced-module-content div:not([style*="color: white"]):not([style*="color:white"]):not([style*="background"]),
        .enhanced-module-content table,
        .enhanced-module-content td,
        .enhanced-module-content th {
          color: #000000 !important;
        }
        
        /* Convert dark gray boxes to white and blue */
        .enhanced-module-content div[style*="background: #1f2937"],
        .enhanced-module-content div[style*="background:#1f2937"],
        .enhanced-module-content div[style*="background: rgb(31, 41, 55)"],
        .enhanced-module-content div[style*="background:rgb(31, 41, 55)"],
        .enhanced-module-content div[style*="background: #374151"],
        .enhanced-module-content div[style*="background:#374151"],
        .enhanced-module-content div[style*="background: rgb(55, 65, 81)"] {
          background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%) !important;
          border: 2px solid #3b82f6 !important;
          color: #000000 !important;
          border-radius: 0.5rem !important;
        }
        
        .enhanced-module-content div[style*="background: #1f2937"] div,
        .enhanced-module-content div[style*="background:#1f2937"] div,
        .enhanced-module-content div[style*="background: rgb(31, 41, 55)"] div,
        .enhanced-module-content div[style*="background:rgb(31, 41, 55)"] div,
        .enhanced-module-content div[style*="background: #374151"] div,
        .enhanced-module-content div[style*="background:#374151"] div {
          color: #000000 !important;
        }
        
        .enhanced-module-content div[style*="background: #1f2937"] div[style*="color: white"],
        .enhanced-module-content div[style*="background:#1f2937"] div[style*="color: white"],
        .enhanced-module-content div[style*="background: rgb(31, 41, 55)"] div[style*="color: white"],
        .enhanced-module-content div[style*="background: #374151"] div[style*="color: white"] {
          color: #1e40af !important;
          font-weight: 700 !important;
        }
        
        .enhanced-module-content div[style*="background: #1f2937"] div[style*="color: #e5e7eb"],
        .enhanced-module-content div[style*="background:#1f2937"] div[style*="color: #e5e7eb"],
        .enhanced-module-content div[style*="background: rgb(31, 41, 55)"] div[style*="color: #e5e7eb"],
        .enhanced-module-content div[style*="background: #374151"] div[style*="color: #e5e7eb"] {
          color: #1e3a8a !important;
        }
        
        .enhanced-module-content div[style*="background: #1f2937"] div[style*="color: #9ca3af"],
        .enhanced-module-content div[style*="background:#1f2937"] div[style*="color: #9ca3af"],
        .enhanced-module-content div[style*="background: rgb(31, 41, 55)"] div[style*="color: #9ca3af"],
        .enhanced-module-content div[style*="background: #374151"] div[style*="color: #9ca3af"] {
          color: #3b82f6 !important;
        }
        
        /* Make all borders blue */
        .enhanced-module-content div[style*="border"],
        .enhanced-module-content div[style*="border: 2px solid #1f2937"],
        .enhanced-module-content div[style*="border:2px solid #1f2937"],
        .enhanced-module-content div[style*="border: 1px solid"],
        .enhanced-module-content div[style*="border:1px solid"],
        .enhanced-module-content div[style*="border-left"],
        .enhanced-module-content div[style*="border-bottom"],
        .enhanced-module-content div[style*="border-top"],
        .enhanced-module-content div[style*="border-right"] {
          border-color: #3b82f6 !important;
        }
        
        /* Convert gray borders to blue */
        .enhanced-module-content div[style*="border: 2px solid #1f2937"],
        .enhanced-module-content div[style*="border:2px solid #1f2937"],
        .enhanced-module-content div[style*="border: 1px solid #e5e7eb"],
        .enhanced-module-content div[style*="border:1px solid #e5e7eb"],
        .enhanced-module-content div[style*="border-left: 4px solid #1f2937"],
        .enhanced-module-content div[style*="border-left:4px solid #1f2937"],
        .enhanced-module-content div[style*="border-left: 2px solid #1f2937"],
        .enhanced-module-content div[style*="border-left:2px solid #1f2937"] {
          border-color: #3b82f6 !important;
        }
        
        /* Convert gray backgrounds to white/blue */
        .enhanced-module-content div[style*="background: #f9fafb"],
        .enhanced-module-content div[style*="background:#f9fafb"],
        .enhanced-module-content div[style*="background: rgb(249, 250, 251)"],
        .enhanced-module-content div[style*="background: #f3f4f6"],
        .enhanced-module-content div[style*="background:#f3f4f6"] {
          background: #ffffff !important;
          border: 2px solid #3b82f6 !important;
          border-radius: 0.5rem !important;
        }
        
        /* Table styling - blue borders */
        .enhanced-module-content table {
          border: 2px solid #3b82f6 !important;
          border-radius: 0.5rem !important;
          overflow: hidden !important;
        }
        
        .enhanced-module-content thead,
        .enhanced-module-content thead tr,
        .enhanced-module-content thead tr[style*="background"],
        .enhanced-module-content tr[style*="background: #1f2937"],
        .enhanced-module-content tr[style*="background:#1f2937"],
        .enhanced-module-content tr[style*="background: rgb(31, 41, 55)"] {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
        }
        
        .enhanced-module-content thead th,
        .enhanced-module-content th[style*="background"],
        .enhanced-module-content th[style*="background: #1f2937"],
        .enhanced-module-content th[style*="background:#1f2937"],
        .enhanced-module-content th[style*="background: rgb(31, 41, 55)"],
        .enhanced-module-content tr[style*="background: #1f2937"] th,
        .enhanced-module-content tr[style*="background:#1f2937"] th {
          color: #ffffff !important;
          border-color: #1e40af !important;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
        }
        
        /* Ensure all table header text is white - including inline styles */
        .enhanced-module-content table thead tr th,
        .enhanced-module-content table thead th,
        .enhanced-module-content th,
        .enhanced-module-content th[style*="color"],
        .enhanced-module-content thead tr th[style*="color"],
        .enhanced-module-content thead th[style*="color: white"],
        .enhanced-module-content thead th[style*="color:white"],
        .enhanced-module-content tr[style*="background: #1f2937"] th,
        .enhanced-module-content tr[style*="background:#1f2937"] th {
          color: #ffffff !important;
        }
        
        /* Override any non-white colors in table headers */
        .enhanced-module-content thead th[style*="color: black"],
        .enhanced-module-content thead th[style*="color:black"],
        .enhanced-module-content thead th[style*="color: #000"],
        .enhanced-module-content thead th[style*="color:#000"],
        .enhanced-module-content thead th[style*="color: #000000"],
        .enhanced-module-content thead th[style*="color:#000000"] {
          color: #ffffff !important;
        }
        
        .enhanced-module-content tbody tr {
          border-bottom: 1px solid #bfdbfe !important;
        }
        
        .enhanced-module-content tbody tr:nth-child(even) {
          background: #eff6ff !important;
        }
        
        .enhanced-module-content td,
        .enhanced-module-content th {
          border-color: #bfdbfe !important;
        }
        
        /* Progress bars - blue */
        .enhanced-module-content div[style*="background: #1f2937"][style*="height"],
        .enhanced-module-content div[style*="background:#1f2937"][style*="height"],
        .enhanced-module-content div[style*="background: #374151"][style*="height"],
        .enhanced-module-content div[style*="background:#374151"][style*="height"],
        .enhanced-module-content div[style*="background: #4b5563"][style*="height"],
        .enhanced-module-content div[style*="background:#4b5563"][style*="height"],
        .enhanced-module-content div[style*="background: #6b7280"][style*="height"],
        .enhanced-module-content div[style*="background:#6b7280"][style*="height"],
        .enhanced-module-content div[style*="background: #9ca3af"][style*="height"],
        .enhanced-module-content div[style*="background:#9ca3af"][style*="height"] {
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%) !important;
        }
      `}} />
    <div className="relative min-h-screen" style={{ color: '#000000' }}>
      {/* FIXED SIDEBAR - Resizable - Hidden on mobile */}
      <div 
        className={`fixed left-0 top-0 h-screen z-50 transition-all duration-300 hidden lg:block ${
          sidebarOpen && !focusMode ? '' : 'w-0'
        }`}
        style={{ width: sidebarOpen && !focusMode ? `${sidebarWidth}px` : '0px' }}
      >
        <AnimatePresence>
          {sidebarOpen && !focusMode && (
            <motion.div
              initial={{ x: -sidebarWidth, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -sidebarWidth, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="h-full bg-white border-r border-gray-200 shadow-xl flex flex-col relative"
              style={{ width: `${sidebarWidth}px` }}
            >
              {/* Resize Handle */}
              <div
                onMouseDown={(e) => {
                  e.preventDefault()
                  setIsResizingSidebar(true)
                }}
                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-300 transition-colors z-10"
              />
              
              {/* Sidebar Header */}
              <div className="flex-shrink-0 px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-600 rounded-lg mr-2">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Contents
                    </h3>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-500 hover:text-gray-700"
                    title="Close sidebar"
                  >
                    <PanelLeftClose className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 ml-12">{module.sections.length} sections</p>
              </div>

              {/* Sidebar Navigation - Scrollable */}
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
                {module.sections.map(section => renderTocItem(section))}
              </div>

              {/* Sidebar Footer */}
              <div className="flex-shrink-0 px-5 py-3 border-t border-gray-200 bg-gray-50">
                {module.estimatedReadTime && (
                  <div className="flex items-center text-xs text-gray-600 mb-1">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                    <span>{module.estimatedReadTime}</span>
                  </div>
                )}
                {module.lastUpdated && (
                  <div className="flex items-center text-xs text-gray-500">
                    <FileText className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                    <span>Updated {module.lastUpdated}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle Button - Hide in focus mode, only on desktop */}
      {!focusMode && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed z-50 top-1/2 -translate-y-1/2 transition-all duration-300 bg-blue-600 text-white p-2.5 rounded-r-lg hover:bg-blue-700 shadow-md hidden lg:flex items-center justify-center"
          style={{ left: sidebarOpen ? `${sidebarWidth}px` : '0px' }}
          title={sidebarOpen ? "Close table of contents" : "Open table of contents"}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeftOpen className="w-4 h-4" />
          )}
        </button>
      )}

      {/* Mobile Sidebar Toggle Button */}
      {!focusMode && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed z-50 top-20 left-4 lg:hidden bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          title="Table of contents"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && !focusMode && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {sidebarOpen && !focusMode && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="fixed left-0 top-0 h-screen w-80 max-w-[85vw] bg-white border-r border-gray-200 shadow-2xl z-50 lg:hidden flex flex-col"
        >
          {/* Mobile Sidebar Header */}
          <div className="flex-shrink-0 px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="p-2 bg-blue-600 rounded-lg mr-2">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Contents
                </h3>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded transition-colors text-gray-500 hover:text-gray-700"
                title="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 ml-12">{module.sections.length} sections</p>
          </div>

          {/* Mobile Sidebar Navigation - Scrollable */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
            {module.sections.map(section => renderTocItem(section))}
          </div>

          {/* Mobile Sidebar Footer */}
          <div className="flex-shrink-0 px-4 py-3 border-t border-gray-200 bg-gray-50">
            {module.estimatedReadTime && (
              <div className="flex items-center text-xs text-gray-600 mb-1">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                <span>{module.estimatedReadTime}</span>
              </div>
            )}
            {module.lastUpdated && (
              <div className="flex items-center text-xs text-gray-500">
                <FileText className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                <span>Updated {module.lastUpdated}</span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Floating AI Assistant - Desktop: Button only, Mobile: Floating widget */}
      {/* Desktop: Show button to open */}
      {!aiAssistantOpen && (
        <motion.button
          onClick={() => setAiAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-[9998] p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl flex items-center space-x-3 transition-all duration-300 hover:scale-110 group hidden lg:flex"
          title="Open Learning Assistant"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <span className="font-semibold">AI Tutor</span>
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}

      {/* Desktop: Show widget when open */}
      {aiAssistantOpen && (
        <div className="fixed bottom-6 right-6 z-[9998] w-full max-w-md h-[600px] hidden lg:block">
          <AITutorBot
            moduleTitle={module.title}
            moduleDescription={module.description}
            currentSection={activeSection ? module.sections.find(s => s.id === activeSection)?.title || '' : ''}
            currentSectionContent={activeSection ? module.sections.find(s => s.id === activeSection)?.content || '' : ''}
            moduleId={module.title}
            isEmbedded={false}
            onClose={() => setAiAssistantOpen(false)}
          />
        </div>
      )}

      {/* MAIN CONTENT - Sidebars overlay white space, content container pushed with margin */}
      <div 
        className="transition-all duration-300"
      >
        {/* Header with Focus Mode Toggle - Mobile optimized */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div 
            className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 lg:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 lg:gap-4"
          >
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-1 min-w-0">
              <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-black truncate pr-2">{module.title}</h2>
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-200 flex-shrink-0">
                {module.sections.length}
              </span>
            </div>
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg transition-colors flex-shrink-0 touch-manipulation ${
                focusMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={focusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
            >
              {focusMode ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Exit Focus</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Focus Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div 
          className={`max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 lg:py-6 xl:py-8 ${focusMode ? 'max-w-5xl' : ''}`}
        >
          {/* Module Header - Mobile optimized */}
          {!focusMode && (
            <div className="bg-white rounded-lg border border-gray-200 mb-4 sm:mb-6 lg:mb-8 p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                  Official Guide
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold bg-blue-700 text-white">
                  Verified 2025
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                {module.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                {module.description}
              </p>
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {module.estimatedReadTime && (
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-blue-600 flex-shrink-0" />
                    <span>{module.estimatedReadTime}</span>
                  </div>
                )}
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-blue-600 flex-shrink-0" />
                  <span>{module.sections.length} Sections</span>
                </div>
              </div>
            </div>
          )}

          {/* Content Sections */}
          {module.sections.map(section => renderContentSection(section))}
          
          {/* Module Completion */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-full mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Module Complete</h3>
            <p className="text-gray-700">You've reviewed all the official guidelines in this section.</p>
          </div>
        </div>
      </div>

      {/* TTS Floating Button - Mobile optimized */}
      <button
        onClick={() => {
          if (selectedText) {
            setIsTTSOpen(true)
          } else {
            readCurrentChapter()
          }
        }}
        className="fixed bottom-20 right-4 lg:bottom-6 lg:right-20 z-[9997] bg-blue-600 text-white p-3 lg:p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
        style={{ 
          right: typeof window !== 'undefined' && window.innerWidth >= 1024 
            ? (aiAssistantOpen ? '400px' : '80px') 
            : '16px',
          bottom: typeof window !== 'undefined' && window.innerWidth >= 1024 
            ? '24px' 
            : '80px'
        }}
        title="Text to Speech - Read selected text or current chapter"
      >
        <Volume2 className="w-5 h-5 lg:w-5" />
      </button>

      {/* TTS Control Panel - Mobile optimized */}
      {isTTSOpen && (
        <div 
          className="fixed bottom-32 lg:bottom-24 z-[9996] bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-[calc(100vw-2rem)] max-w-sm lg:w-80 lg:max-w-[calc(100vw-3rem)]"
          style={{ 
            right: typeof window !== 'undefined' && window.innerWidth >= 1024 
              ? (aiAssistantOpen ? '400px' : '24px') 
              : '16px'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center">
              <Volume2 className="w-4 h-4 mr-2 text-blue-600" />
              Text to Speech
            </h4>
            <button
              onClick={() => {
                setIsTTSOpen(false)
                stopSpeaking()
              }}
              className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Voice Selection */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Voice
            </label>
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const voice = voices.find(v => v.name === e.target.value)
                if (voice) setSelectedVoice(voice)
              }}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {voices.length === 0 ? (
                <option>Loading voices...</option>
              ) : (
                voices
                  .filter(v => {
                    const name = v.name.toLowerCase()
                    // Exclude Microsoft voices
                    if (name.includes('microsoft') || name.includes('zira') || name.includes('mark')) {
                      return false
                    }
                    return v.lang.startsWith('en') || v.lang.startsWith('de') || v.lang.startsWith('fr') || v.lang.startsWith('it')
                  })
                  .map((voice) => {
                    const isNatural = voice.name.toLowerCase().includes('neural') || 
                                     voice.name.toLowerCase().includes('natural') || 
                                     voice.name.toLowerCase().includes('premium') ||
                                     voice.name.toLowerCase().includes('enhanced')
                    return (
                      <option key={voice.name} value={voice.name}>
                        {isNatural ? '⭐ ' : ''}
                        {voice.name} ({voice.lang})
                      </option>
                    )
                  })
              )}
            </select>
          </div>

          {/* Selected Text Preview */}
          {selectedText && (
            <div className="mb-3 p-2 bg-gray-50 rounded text-xs text-gray-600 max-h-20 overflow-y-auto">
              {selectedText.substring(0, 100)}{selectedText.length > 100 ? '...' : ''}
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlayPause}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Play</span>
                </>
              )}
            </button>
            <button
              onClick={stopSpeaking}
              disabled={!isPlaying && speechSynth?.speaking !== true}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              title="Stop"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <button
              onClick={readCurrentChapter}
              className="w-full px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-left"
            >
              📖 Read Current Chapter
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
