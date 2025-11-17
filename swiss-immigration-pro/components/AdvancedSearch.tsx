'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, FileText, Calculator, Users, MapPin, Sparkles, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  category: 'page' | 'tool' | 'guide' | 'resource'
  icon: any
  keywords: string[]
}

const SEARCH_INDEX: SearchResult[] = [
  // Pages
  { id: '1', title: 'Home', description: 'Swiss Immigration Success Platform', url: '/', category: 'page', icon: Sparkles, keywords: ['home', 'main', 'start', 'overview'] },
  { id: '2', title: 'Visas & Permits', description: 'L, B, G permits and requirements', url: '/visas', category: 'page', icon: FileText, keywords: ['visa', 'permit', 'l permit', 'b permit', 'g permit', 'work permit'] },
  { id: '3', title: 'Employment', description: 'Swiss job market and work guides', url: '/employment', category: 'page', icon: Users, keywords: ['employment', 'job', 'work', 'salary', 'cv', 'resume'] },
  { id: '4', title: 'Citizenship', description: 'Path to Swiss citizenship', url: '/citizenship', category: 'page', icon: TrendingUp, keywords: ['citizenship', 'naturalization', 'passport', '10 years', 'swiss citizen'] },
  { id: '5', title: 'US Citizens Guide', description: 'Complete guide for Americans', url: '/us-citizens', category: 'page', icon: MapPin, keywords: ['usa', 'america', 'us citizens', 'americans', 'chf 3450', 'health insurance'] },
  { id: '6', title: 'Canton Information', description: 'Compare Swiss cantons', url: '/cantons', category: 'page', icon: MapPin, keywords: ['canton', 'zurich', 'geneva', 'basel', 'bern', 'zug', 'vaud'] },
  { id: '7', title: 'Pricing Plans', description: 'Choose your path to success', url: '/pricing', category: 'page', icon: TrendingUp, keywords: ['pricing', 'plans', 'subscription', 'cost', 'price', 'payment'] },
  { id: '8', title: 'Dashboard', description: 'Your personal immigration hub', url: '/dashboard', category: 'page', icon: Users, keywords: ['dashboard', 'profile', 'progress', 'account', 'my content'] },
  { id: '9', title: 'FAQ', description: 'Frequently asked questions', url: '/faq', category: 'page', icon: FileText, keywords: ['faq', 'questions', 'help', 'support', 'answers'] },
  
  // Tools
  { id: '10', title: 'Cost Calculator', description: 'Calculate living costs by canton', url: '/tools#cost', category: 'tool', icon: Calculator, keywords: ['calculator', 'cost', 'living', 'salary', 'expenses', 'budget'] },
  { id: '11', title: 'Timeline Planner', description: 'Estimate your immigration timeline', url: '/tools#timeline', category: 'tool', icon: Calculator, keywords: ['timeline', 'planner', 'schedule', 'duration', 'how long', 'time'] },
  { id: '12', title: 'Canton Comparison', description: 'Compare cantons side-by-side', url: '/tools#canton', category: 'tool', icon: Calculator, keywords: ['compare', 'comparison', 'canton', 'which canton', 'best canton'] },
  { id: '13', title: 'Permit Calculator', description: 'Check your permit eligibility', url: '/tools/permit-calculator', category: 'tool', icon: Calculator, keywords: ['calculator', 'eligibility', 'qualify', 'eligible', 'assessment', 'check'] },
  
  // Guides
  { id: '14', title: 'L Permit Guide', description: 'Short-term residence permit', url: '/visas#l-permit', category: 'guide', icon: FileText, keywords: ['l permit', 'short term', '1 year', 'temporary'] },
  { id: '15', title: 'B Permit Guide', description: 'Long-term residence permit', url: '/visas#b-permit', category: 'guide', icon: FileText, keywords: ['b permit', 'long term', '5 years', 'residence'] },
  { id: '16', title: 'G Permit Guide', description: 'Cross-border commuter permit', url: '/visas#g-permit', category: 'guide', icon: FileText, keywords: ['g permit', 'cross border', 'commuter', 'frontier'] },
  { id: '17', title: 'Ordinary Naturalization', description: '10-year path to citizenship', url: '/citizenship#ordinary', category: 'guide', icon: FileText, keywords: ['naturalization', '10 years', 'ordinary', 'citizenship path'] },
  { id: '18', title: 'Simplified Naturalization', description: 'Marriage-based citizenship', url: '/citizenship#simplified', category: 'guide', icon: FileText, keywords: ['simplified', 'marriage', 'spouse', '5 years', 'swiss spouse'] },
  { id: '19', title: 'Third Generation', description: 'Accelerated citizenship for Swiss-born', url: '/citizenship#third-gen', category: 'guide', icon: FileText, keywords: ['third generation', 'born in switzerland', 'accelerated'] },
  { id: '20', title: 'Health Insurance', description: 'Mandatory Swiss health insurance', url: '/us-citizens#health', category: 'guide', icon: FileText, keywords: ['health insurance', 'mandatory', '3 months', 'krankenkasse'] },
  
  // Resources
  { id: '21', title: 'CV Templates', description: '20+ Swiss-style CV templates', url: '/resources#cv', category: 'resource', icon: FileText, keywords: ['cv', 'resume', 'template', 'lebenslauf', 'curriculum vitae'] },
  { id: '22', title: 'Resources Library', description: 'Guides, PDFs, and checklists', url: '/resources', category: 'resource', icon: FileText, keywords: ['resources', 'library', 'pdf', 'download', 'checklist'] },
  { id: '23', title: 'AI Chatbot', description: 'Get instant answers to your questions', url: '/#chat', category: 'tool', icon: Sparkles, keywords: ['chatbot', 'ai', 'assistant', 'help', 'questions', 'chat'] },
]

export default function AdvancedSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut: Ctrl/Cmd + K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Search logic
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const searchTerm = query.toLowerCase()
    const filtered = SEARCH_INDEX.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.keywords.some((keyword) => keyword.includes(searchTerm))
      )
    })

    setResults(filtered.slice(0, 8)) // Show max 8 results
    setSelectedIndex(0)
  }, [query])

  // Handle navigation with arrow keys
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        window.location.href = results[selectedIndex].url
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex])

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'page': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
      case 'tool': return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
      case 'guide': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      case 'resource': return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
    }
  }

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => {
          setIsOpen(true)
          setTimeout(() => inputRef.current?.focus(), 100)
        }}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">Search...</span>
        <kbd className="hidden sm:inline px-2 py-0.5 text-xs bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Search Box */}
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center border-b border-gray-200 dark:border-gray-700 p-4">
                  <Search className="w-6 h-6 text-gray-400 mr-3" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search visas, tools, guides, resources..."
                    className="flex-1 bg-transparent outline-none text-lg text-gray-900 dark:text-white placeholder-gray-400"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                  <kbd className="ml-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
                    ESC
                  </kbd>
                </div>

                {/* Search Results */}
                <div className="max-h-96 overflow-y-auto">
                  {results.length === 0 && query.length >= 2 && (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>No results found for "{query}"</p>
                      <p className="text-sm mt-2">Try searching for visas, tools, or guides</p>
                    </div>
                  )}

                  {results.length === 0 && query.length < 2 && (
                    <div className="p-8">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-4">
                        Popular Searches
                      </h3>
                      <div className="space-y-2">
                        {['B Permit', 'Cost Calculator', 'Citizenship', 'US Citizens', 'CV Templates', 'Zurich'].map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            <Search className="w-4 h-4 inline-block mr-2 text-gray-400" />
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.map((result, index) => {
                    const Icon = result.icon
                    return (
                      <Link
                        key={result.id}
                        href={result.url}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-start p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
                          index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg ${getCategoryColor(result.category)} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {result.title}
                            </h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(result.category)}`}>
                              {result.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {result.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                {/* Footer */}
                {results.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-750 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border">↑↓</kbd>
                        <span className="ml-2">Navigate</span>
                      </span>
                      <span className="flex items-center">
                        <kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border">↵</kbd>
                        <span className="ml-2">Open</span>
                      </span>
                    </div>
                    <span>{results.length} results</span>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

