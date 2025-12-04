'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, FileText, Clock, ChevronDown, ChevronRight,
  ExternalLink, Info, Menu, X, ShieldCheck, Award, Link as LinkIcon,
  PanelLeftOpen, PanelLeftClose
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
  const [activeSection, setActiveSection] = useState<string>(module.sections[0]?.id || '')
  const [expandedTocSections, setExpandedTocSections] = useState<Set<string>>(new Set([module.sections[0]?.id]))
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
              ? 'bg-blue-600 text-white font-medium shadow-md' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          } ${level > 0 ? 'ml-3 text-sm' : 'text-sm'}`}
          onClick={() => scrollToSection(section.id)}
        >
          <span className="truncate flex-1 leading-snug">{section.title}</span>
          {hasSubsections && (
            <button 
              onClick={(e) => toggleTocSection(section.id, e)}
              className={`p-1 rounded hover:bg-white/20 transition-colors flex-shrink-0 ml-2 ${
                isActive ? 'text-white/80 hover:text-white' : 'text-gray-400'
              }`}
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
        
        {hasSubsections && isExpanded && (
          <div className="mt-1 space-y-1 border-l-2 border-gray-200 ml-4 pl-2">
            {section.subsections!.map(sub => renderTocItem(sub, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const renderContentSection = (section: ModuleSection, level: number = 0) => {
    return (
      <section key={section.id} id={section.id} className="scroll-mt-28 mb-16">
        {/* Section Header */}
        <div className="mb-6 pb-4 border-b border-gray-300">
          <h3 className={`${
            level === 0 ? 'text-2xl font-bold text-black' : 'text-xl font-bold text-black'
          } flex items-center`}>
            {level === 0 && <span className="w-1.5 h-8 bg-black rounded-full mr-4"></span>}
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
                  <blockquote className="border-l-4 border-black pl-5 py-3 my-6 bg-gray-50 text-black rounded-r-lg" {...props} />
                ),
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-6 border border-gray-900 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-900" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-gray-100" {...props} />,
                th: ({node, ...props}) => <th className="px-4 py-3 text-left text-sm font-bold text-black uppercase tracking-wide border-b-2 border-black" {...props} />,
                td: ({node, ...props}) => <td className="px-4 py-3 text-black border-b border-gray-300" style={{ color: '#000000' }} {...props} />,
                a: ({node, ...props}) => (
                  <a className="text-black font-semibold underline hover:no-underline transition-all" target="_blank" rel="noopener noreferrer" {...props} />
                ),
                strong: ({node, ...props}) => <strong className="font-bold text-black" {...props} />
              }}
            >
              {section.content}
            </ReactMarkdown>
        </div>

        {/* Key Points Box */}
        {section.keyPoints && section.keyPoints.length > 0 && (
            <div className="mt-10 bg-gray-50 border-2 border-black rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2.5 bg-black rounded-lg mr-3">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-base font-bold text-black">Key Takeaways</h4>
              </div>
              <ul className="space-y-3">
                {section.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start text-black">
                    <span className="mr-3 mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                    <span className="leading-relaxed text-sm font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
        )}

        {/* Official Resources & Legal References */}
        {(section.legalReferences || section.officialLinks) && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.legalReferences && section.legalReferences.length > 0 && (
              <div className="bg-white border-2 border-black rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <ShieldCheck className="w-4 h-4 text-black mr-2" />
                  <h4 className="text-xs font-bold text-black uppercase tracking-wider">Legal Basis</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.legalReferences.map((ref, idx) => (
                    <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-black font-mono border border-black">
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {section.officialLinks && section.officialLinks.length > 0 && (
              <div className="bg-white border-2 border-black rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <LinkIcon className="w-4 h-4 text-black mr-2" />
                  <h4 className="text-xs font-bold text-black uppercase tracking-wider">Official Sources</h4>
                </div>
                <div className="space-y-2">
                  {section.officialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-black hover:underline group font-semibold"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-2 text-black" />
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
            <div className="mt-10 pl-6 border-l-2 border-black">
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
      `}} />
    <div className="relative min-h-screen" style={{ color: '#000000' }}>
      {/* FIXED SIDEBAR - Like a Chatbot Widget */}
      <div 
        className={`fixed left-0 top-0 h-screen z-50 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-80' : 'w-0'
        }`}
      >
        {/* Sidebar Content */}
        <AnimatePresence>
          {sidebarOpen && (
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

      {/* Toggle Button - Always Visible */}
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

      {/* MAIN CONTENT - Pushes Right When Sidebar Open */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'ml-80' : 'ml-0'
        }`}
      >
        <div className="max-w-5xl mx-auto px-8 py-8">
          {/* Module Header */}
          <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10 p-8">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-black text-white uppercase tracking-wide border-2 border-black">
                    Official Guide
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-900 text-white uppercase tracking-wide border-2 border-black">
                    Verified 2025
                  </span>
                </div>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight leading-tight">
              {module.title}
            </h1>
            <p className="text-lg text-black leading-relaxed">
              {module.description}
            </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-row md:flex-col gap-4 md:items-end flex-shrink-0">
                {module.estimatedReadTime && (
                  <div className="flex items-center text-sm font-medium text-black bg-gray-50 px-3 py-2 rounded-lg border border-black">
                    <Clock className="w-4 h-4 mr-2 text-black" />
                    {module.estimatedReadTime}
                  </div>
                )}
                <div className="flex items-center text-sm font-medium text-black bg-gray-50 px-3 py-2 rounded-lg border border-black">
                  <BookOpen className="w-4 h-4 mr-2 text-black" />
                  {module.sections.length} Sections
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          {module.sections.map(section => renderContentSection(section))}
          
          {/* Module Completion */}
          <div className="mt-20 pt-10 border-t-2 border-black text-center">
            <div className="inline-flex items-center justify-center p-5 bg-black rounded-full mb-5">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-3">Module Complete</h3>
            <p className="text-black text-lg">You've reviewed all the official guidelines in this section.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
