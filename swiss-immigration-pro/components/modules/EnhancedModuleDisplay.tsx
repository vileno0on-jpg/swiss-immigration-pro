'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, FileText, Clock, ChevronDown, ChevronRight,
  ExternalLink, Info, Menu, X, ShieldCheck, Award, Link as LinkIcon,
  PanelLeftOpen, PanelLeftClose, Maximize2, Minimize2
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

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
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [focusMode, setFocusMode] = useState(false)

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

  const renderTocItem = (section: ModuleSection, level: number = 0) => {
    const isActive = activeSection === section.id
    const hasSubsections = section.subsections && section.subsections.length > 0
    const isExpanded = expandedTocSections.has(section.id) || isActive

    return (
      <div key={section.id} className="mb-1">
        <div 
          className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
            isActive 
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg border-l-4 border-blue-800' 
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-l-4 hover:border-blue-300 border-l-4 border-transparent'
          } ${level > 0 ? 'ml-3 text-sm' : 'text-sm'}`}
          onClick={() => scrollToSection(section.id)}
        >
          <span className={`truncate flex-1 leading-snug ${
            isActive ? 'text-white' : 'text-gray-700 group-hover:text-blue-700'
          }`}>{section.title}</span>
          {hasSubsections && (
            <button 
              onClick={(e) => toggleTocSection(section.id, e)}
              className={`p-1 rounded transition-colors flex-shrink-0 ml-2 ${
                isActive 
                  ? 'text-white/90 hover:bg-white/20 hover:text-white' 
                  : 'text-gray-400 group-hover:text-blue-600'
              }`}
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
        
        {hasSubsections && isExpanded && (
          <div className="mt-1 space-y-1 border-l-2 border-blue-300 ml-4 pl-2">
            {section.subsections!.map(sub => renderTocItem(sub, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const renderContentSection = (section: ModuleSection, level: number = 0) => {
    return (
      <section key={section.id} id={section.id} className="scroll-mt-28 mb-12 sm:mb-16">
        {/* Section Header */}
        <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-blue-200">
          <h3 className={`${
            level === 0 ? 'text-xl sm:text-2xl font-bold text-black' : 'text-lg sm:text-xl font-bold text-black'
          } flex items-center`}>
            {level === 0 && <span className="w-1.5 h-6 sm:h-8 bg-blue-600 rounded-full mr-3 sm:mr-4"></span>}
            {section.title}
          </h3>
        </div>

        {/* Section Content */}
        <div className="enhanced-module-content prose prose-lg max-w-none leading-relaxed prose-headings:text-black prose-p:text-black prose-strong:text-black prose-a:text-black prose-ul:text-black prose-ol:text-black prose-li:text-black" style={{ color: '#000000' }}>
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

        {/* Key Points Box */}
        {section.keyPoints && section.keyPoints.length > 0 && (
            <div className="mt-6 sm:mt-10 bg-blue-50 border-2 border-blue-600 rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-2.5 bg-blue-600 rounded-lg mr-3">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-blue-900">Key Takeaways</h4>
              </div>
              <ul className="space-y-2 sm:space-y-3">
                {section.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start text-blue-900">
                    <span className="mr-3 mt-2 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                    <span className="leading-relaxed text-xs sm:text-sm font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
        )}

        {/* Official Resources & Legal References */}
        {(section.legalReferences || section.officialLinks) && (
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {section.legalReferences && section.legalReferences.length > 0 && (
              <div className="bg-white border-2 border-blue-600 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <ShieldCheck className="w-4 h-4 text-blue-600 mr-2" />
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">Legal Basis</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.legalReferences.map((ref, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-900 font-mono border border-blue-600">
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {section.officialLinks && section.officialLinks.length > 0 && (
              <div className="bg-white border-2 border-blue-600 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <LinkIcon className="w-4 h-4 text-blue-600 mr-2" />
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">Official Sources</h4>
                </div>
                <div className="space-y-2">
                  {section.officialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-xs sm:text-sm text-blue-700 hover:text-blue-900 hover:underline group font-semibold"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-2 text-blue-600" />
                      <span>{link.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Subsections */}
        {section.subsections && section.subsections.length > 0 && (
            <div className="mt-6 sm:mt-10 pl-4 sm:pl-6 border-l-2 border-blue-600">
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
      {/* FIXED SIDEBAR - Like a Chatbot Widget - Hidden on mobile */}
      <div 
        className={`fixed left-0 top-0 h-screen z-50 transition-all duration-300 ease-in-out hidden lg:block ${
          sidebarOpen && !focusMode ? 'w-80' : 'w-0'
        }`}
      >
        {/* Sidebar Content */}
        <AnimatePresence>
          {sidebarOpen && !focusMode && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-80 h-full bg-white border-r border-gray-200 shadow-2xl flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex-shrink-0 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Table of Contents
                    </h3>
                    <p className="text-xs text-blue-200 mt-1">{module.sections.length} sections</p>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                    title="Close sidebar"
                  >
                    <PanelLeftClose className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sidebar Navigation - Scrollable */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {module.sections.map(section => renderTocItem(section))}
              </div>

              {/* Sidebar Footer */}
              <div className="flex-shrink-0 px-5 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  <span>{module.estimatedReadTime || 'Self-paced reading'}</span>
                </div>
                {module.lastUpdated && (
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <FileText className="w-3.5 h-3.5 mr-1.5" />
                    <span>Updated {module.lastUpdated}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle Button - Hide in focus mode */}
      {!focusMode && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`fixed z-50 top-1/2 -translate-y-1/2 transition-all duration-300 ${
            sidebarOpen ? 'left-80' : 'left-0'
          } bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-r-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700`}
          title={sidebarOpen ? "Close table of contents" : "Open table of contents"}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </button>
      )}

      {/* MAIN CONTENT - Pushes Right When Sidebar Open */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen && !focusMode ? 'lg:ml-80' : 'ml-0'
        }`}
      >
        {/* Header with Focus Mode Toggle */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-black truncate">{module.title}</h2>
              <span className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-200 flex-shrink-0">
                {module.sections.length} Sections
              </span>
            </div>
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors flex-shrink-0 ${
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

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 ${focusMode ? 'max-w-5xl' : ''}`}>
          {/* Module Header - Only show if not in focus mode */}
          {!focusMode && (
            <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6 sm:mb-10 p-4 sm:p-6 lg:p-8">
              <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white uppercase tracking-wide border-2 border-blue-700">
                      Official Guide
                    </span>
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-blue-700 text-white uppercase tracking-wide border-2 border-blue-800">
                      Verified 2025
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4 tracking-tight leading-tight">
                    {module.title}
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                    {module.description}
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="flex flex-row md:flex-col gap-3 sm:gap-4 md:items-end flex-shrink-0">
                  {module.estimatedReadTime && (
                    <div className="flex items-center text-xs sm:text-sm font-medium text-black bg-blue-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-blue-200">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-blue-600 flex-shrink-0" />
                      <span className="whitespace-nowrap">{module.estimatedReadTime}</span>
                    </div>
                  )}
                  <div className="flex items-center text-xs sm:text-sm font-medium text-black bg-blue-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-blue-200">
                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-blue-600 flex-shrink-0" />
                    <span className="whitespace-nowrap">{module.sections.length} Sections</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Sections */}
          {module.sections.map(section => renderContentSection(section))}
          
          {/* Module Completion */}
          <div className="mt-12 sm:mt-20 pt-6 sm:pt-10 border-t-2 border-blue-600 text-center">
            <div className="inline-flex items-center justify-center p-4 sm:p-5 bg-blue-600 rounded-full mb-4 sm:mb-5">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">Module Complete</h3>
            <p className="text-black text-base sm:text-lg">You've reviewed all the official guidelines in this section.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
