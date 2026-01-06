'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Scale, 
  FileText, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  TrendingUp,
  Menu,
  Briefcase,
  Mail,
  FileCheck,
  Sparkles,
  Plus,
  Award,
  Search,
  Filter,
  Clock,
  Star,
  Archive,
  Settings,
  HelpCircle,
  BookOpen,
  X,
  ChevronRight,
  Folder,
  Download,
  Trash2,
  Edit,
  Upload,
  LogOut
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Types
interface Consultation {
  id: string
  title: string
  date: Date
  summary: string
}

interface Document {
  id: string
  name: string
  type: 'CV' | 'Letter' | 'Application'
  createdAt: Date
  content?: string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  legalBasis?: string[]
  probability?: number
  nextSteps?: string[]
}

export default function SwissVirtualLawyer() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSidebarTab, setActiveSidebarTab] = useState<'consultations' | 'documents' | 'resources'>('consultations')
  const [searchQuery, setSearchQuery] = useState('')
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome. I\'m your AI legal assistant specializing in Swiss immigration and residency law. I can help you understand complex legal frameworks, review documents, draft legal correspondence, and provide strategic guidance on your immigration journey. How can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Based on Swiss Federal Law and the Foreign Nationals and Integration Act (FNIA), EU/EFTA nationals holding a residence permit have specific rights and obligations regarding employment. After the initial 12-month period, permit holders generally have the right to change employers, subject to notification requirements. The employer must notify the cantonal migration authority within 14 days of employment commencement.',
        timestamp: new Date(),
        legalBasis: [
          'Art. 25 FNIA - Free Movement of Persons',
          'Art. 21 FNIA - Employment Rights and Obligations',
          'Swiss-EU Bilateral Agreement on Free Movement of Persons',
          'Art. 24 FNIA - Notification Requirements'
        ],
        probability: 95,
        nextSteps: [
          'Verify your employer has submitted the required notification to cantonal authorities',
          'Maintain comprehensive records of all employment-related documentation',
          'Consult with your cantonal migration office if any discrepancies arise',
          'Review your current permit status and expiration date'
        ]
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    // Process each file
    for (const file of Array.from(files)) {
      // Determine file type based on name or extension
      const fileName = file.name.toLowerCase()
      let docType: 'CV' | 'Letter' | 'Application' = 'Letter'
      
      if (fileName.includes('cv') || fileName.includes('resume')) {
        docType = 'CV'
      } else if (fileName.includes('application') || fileName.includes('form')) {
        docType = 'Application'
      }

      // Create document entry
      const newDoc: Document = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: docType,
        createdAt: new Date(),
      }

      // Read file content if it's a text file
      if (file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          newDoc.content = event.target?.result as string
        }
        reader.readAsText(file)
      }

      setDocuments(prev => [newDoc, ...prev])
    }

    setUploading(false)
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDeleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId))
  }

  const handleDownloadDocument = (doc: Document) => {
    if (doc.content) {
      const blob = new Blob([doc.content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = doc.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <HelpCircle className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900">Swiss Legal Assistant</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">Expert Legal Guidance</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer"
            title="Exit Virtual Lawyer"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Exit</span>
          </motion.button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Enhanced & Collapsible */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="bg-white border-r border-gray-200 flex flex-col overflow-hidden"
            >
              {/* Sidebar Header */}
              <div className="p-3 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Workspace</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                    title="Collapse sidebar"
                  >
                    <X className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
                
                {/* New Consultation Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Consultation</span>
                </motion.button>

                {/* Search Bar */}
                <div className="mt-2 relative">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-8 pr-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Sidebar Tabs */}
              <div className="flex border-b border-gray-200 bg-gray-50">
                <button
                  onClick={() => setActiveSidebarTab('consultations')}
                  className={`flex-1 px-2 py-2 text-xs font-medium transition-colors relative cursor-pointer ${
                    activeSidebarTab === 'consultations'
                      ? 'text-blue-600 bg-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <FileText className="w-3 h-3" />
                    <span className="hidden sm:inline">Consultations</span>
                  </div>
                  {activeSidebarTab === 'consultations' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveSidebarTab('documents')}
                  className={`flex-1 px-2 py-2 text-xs font-medium transition-colors relative cursor-pointer ${
                    activeSidebarTab === 'documents'
                      ? 'text-blue-600 bg-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <Folder className="w-3 h-3" />
                    <span className="hidden sm:inline">Documents</span>
                  </div>
                  {activeSidebarTab === 'documents' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveSidebarTab('resources')}
                  className={`flex-1 px-2 py-2 text-xs font-medium transition-colors relative cursor-pointer ${
                    activeSidebarTab === 'resources'
                      ? 'text-blue-600 bg-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span className="hidden sm:inline">Resources</span>
                  </div>
                  {activeSidebarTab === 'resources' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {activeSidebarTab === 'consultations' && (
                  <div className="p-2.5 space-y-2">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-1.5 mb-2">
                      <div className="bg-blue-50 rounded p-2 border border-blue-100">
                        <div className="flex items-center gap-1 mb-0.5">
                          <FileText className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-blue-900">Active</span>
                        </div>
                        <p className="text-sm font-bold text-blue-900">{consultations.length}</p>
                      </div>
                      <div className="bg-green-50 rounded p-2 border border-green-100">
                        <div className="flex items-center gap-1 mb-0.5">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span className="text-xs font-medium text-green-900">Done</span>
                        </div>
                        <p className="text-sm font-bold text-green-900">0</p>
                      </div>
                    </div>

                    {/* Consultations List */}
                    <div className="space-y-1.5">
                      {consultations
                        .filter(consultation => 
                          searchQuery === '' || 
                          consultation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          consultation.summary.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((consultation) => (
                        <motion.button
                          key={consultation.id}
                          whileHover={{ x: 2 }}
                          className="w-full text-left p-2 bg-white border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50/50 transition-all group cursor-pointer"
                        >
                          <h4 className="text-xs font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors mb-0.5">
                            {consultation.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{consultation.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {consultations.length === 0 && (
                      <div className="text-center py-6">
                        <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">No consultations yet</p>
                      </div>
                    )}
                  </div>
                )}

                {activeSidebarTab === 'documents' && (
                  <div className="p-2.5 space-y-2">
                    {/* Upload Button */}
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Upload className="w-3.5 h-3.5" />
                            </motion.div>
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Document</span>
                          </>
                        )}
                      </motion.button>
                      <p className="text-xs text-gray-500 mt-1.5 text-center">PDF, DOC, TXT, Images</p>
                    </div>

                    {/* Documents List */}
                    <div className="space-y-1.5">
                      {documents.map((doc) => {
                        const Icon = doc.type === 'CV' ? Briefcase : doc.type === 'Letter' ? Mail : FileCheck
                        const typeColors = {
                          'CV': 'bg-purple-100 text-purple-600',
                          'Letter': 'bg-blue-100 text-blue-600',
                          'Application': 'bg-green-100 text-green-600'
                        }
                        return (
                          <motion.div
                            key={doc.id}
                            whileHover={{ x: 2 }}
                            className="group p-2 bg-white border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-7 h-7 rounded ${typeColors[doc.type] || 'bg-gray-100 text-gray-600'} flex items-center justify-center shrink-0`}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                  {doc.name}
                                </h4>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-xs text-gray-500">{doc.type}</span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">{doc.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                {doc.content && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDownloadDocument(doc)
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer" 
                                    title="Download"
                                  >
                                    <Download className="w-3 h-3 text-gray-600" />
                                  </button>
                                )}
                                <button 
                                  onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteDocument(doc.id)
                                }}
                                  className="p-1 hover:bg-red-50 rounded transition-colors cursor-pointer" 
                                  title="Delete"
                                >
                                  <Trash2 className="w-3 h-3 text-gray-600 hover:text-red-600" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Empty State */}
                    {documents.length === 0 && (
                      <div className="text-center py-6">
                        <Folder className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 mb-1">No documents yet</p>
                        <p className="text-xs text-gray-400">Upload files to review</p>
                      </div>
                    )}
                  </div>
                )}

                {activeSidebarTab === 'resources' && (
                  <div className="p-2.5 space-y-1.5">
                    <motion.button
                      whileHover={{ x: 2 }}
                      className="w-full text-left p-2 bg-white border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50/50 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center shrink-0">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            Legal Framework
                          </h4>
                        </div>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ x: 2 }}
                      className="w-full text-left p-2 bg-white border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50/50 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center shrink-0">
                          <FileCheck className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            Templates
                          </h4>
                        </div>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ x: 2 }}
                      className="w-full text-left p-2 bg-white border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50/50 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center shrink-0">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            FAQ & Help
                          </h4>
                        </div>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </div>
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Sidebar Footer */}
              <div className="p-2 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-blue-600 shrink-0" />
                  <p className="text-xs font-medium text-gray-700">Certified Legal AI</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white min-w-0">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
              {messages.map((message, index) => (
                <AnimatePresence key={message.id}>
                  {message.role === 'user' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[85%] bg-gray-900 text-white rounded-2xl rounded-tr-md px-4 py-3">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4"
                    >
                      <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm flex items-center justify-center ring-2 ring-blue-100">
                        <HelpCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>

                        {/* Legal Basis */}
                        {message.legalBasis && message.legalBasis.length > 0 && (
                          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center gap-2 mb-3">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <span className="text-xs font-semibold text-gray-900">Legal Basis</span>
                            </div>
                            <ul className="space-y-2">
                              {message.legalBasis.map((basis, idx) => (
                                <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                                  <span className="text-blue-600 mt-0.5">•</span>
                                  <span>{basis}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Probability & Next Steps */}
                        {(message.probability !== undefined || message.nextSteps) && (
                          <div className="grid grid-cols-1 gap-3">
                            {message.probability !== undefined && (
                              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs font-semibold text-gray-900">Success Probability</span>
                                  </div>
                                  <span className="text-sm font-bold text-blue-600">{message.probability}%</span>
                                </div>
                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${message.probability}%` }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"
                                  />
                                </div>
                              </div>
                            )}

                            {message.nextSteps && message.nextSteps.length > 0 && (
                              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                                <div className="flex items-center gap-2 mb-3">
                                  <CheckCircle2 className="w-4 h-4 text-green-700" />
                                  <span className="text-xs font-semibold text-green-900">Next Steps</span>
                                </div>
                                <ul className="space-y-2">
                                  {message.nextSteps.map((step, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-green-900">
                                      <input
                                        type="checkbox"
                                        className="mt-0.5 w-4 h-4 text-green-600 rounded border-green-300 focus:ring-green-500"
                                      />
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm flex items-center justify-center ring-2 ring-blue-100">
                    <HelpCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex gap-1.5 pt-2">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative bg-gray-50 rounded-2xl border border-gray-300 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about Swiss immigration law, legal documentation, residency requirements, or any legal matter..."
                  rows={1}
                  className="w-full px-4 py-3 pr-12 bg-transparent border-0 focus:outline-none resize-none text-sm text-gray-900 placeholder:text-gray-500 max-h-32 overflow-y-auto"
                  style={{ minHeight: '52px' }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 bottom-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2 px-1 text-center">
                This AI legal assistant provides informational guidance only. For binding legal advice, consult with a licensed attorney.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
