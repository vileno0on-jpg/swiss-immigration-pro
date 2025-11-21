'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle, X, Send, Paperclip, FileText, XCircle, Minimize2, Maximize2, MoreVertical, FileQuestion, Lightbulb, Search, Briefcase } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { CONFIG } from '@/lib/config'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type UserPack = 'free' | 'immigration' | 'masterclass' | 'citizenship'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  file?: {
    name: string
    type: string
    size: number
  }
}

interface UploadedFile {
  file: File
  preview: string
}

interface SessionUserMetadata {
  pack?: UserPack
  dailyMessages?: number
  layer?: string
}

const DAILY_FREE_LIMIT = CONFIG.ai.freeDailyLimit

export default function FloatingChatWidget() {
  const { data: session } = useSession()

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [dailyMessages, setDailyMessages] = useState(0)
  const [userPack, setUserPack] = useState<UserPack>('free')
  const [mounted, setMounted] = useState(false)

  // Suggested queries based on user's layer or common questions
  const suggestedQueries = useMemo(() => [
    {
      icon: FileQuestion,
      text: "What are the requirements for Swiss work permits?",
      query: "What are the requirements for Swiss work permits?"
    },
    {
      icon: Briefcase,
      text: "How do I apply for a B permit in Switzerland?",
      query: "How do I apply for a B permit in Switzerland?"
    },
    {
      icon: Lightbulb,
      text: "What's the difference between L and B permits?",
      query: "What's the difference between L and B permits?"
    },
    {
      icon: Search,
      text: "How long does the Swiss immigration process take?",
      query: "How long does the Swiss immigration process take?"
    }
  ], [])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const sessionMetadata = useMemo(() => {
    if (!session?.user) return undefined
    return session.user as SessionUserMetadata
  }, [session])

  // Load anonymous user message count from localStorage
  useEffect(() => {
    if (session?.user) {
      if (sessionMetadata) {
        setUserPack(sessionMetadata.pack ?? 'free')
        setDailyMessages(sessionMetadata.dailyMessages ?? 0)
      }
    } else {
      setUserPack('free')
      const today = new Date().toDateString()
      const stored = localStorage.getItem('anonymousChatData')
      
      if (stored) {
        try {
          const data = JSON.parse(stored)
          if (data.date === today) {
            setDailyMessages(data.count || 0)
          } else {
            setDailyMessages(0)
            localStorage.setItem('anonymousChatData', JSON.stringify({ date: today, count: 0 }))
          }
        } catch {
          setDailyMessages(0)
        }
      } else {
        setDailyMessages(0)
        localStorage.setItem('anonymousChatData', JSON.stringify({ date: today, count: 0 }))
      }
    }
  }, [session, sessionMetadata])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Add/remove class to body to adjust main content when sidebar is open
  useEffect(() => {
    if (typeof document === 'undefined') return
    
    if (isOpen && !isMinimized) {
      const sidebarWidth = 400
      document.body.style.marginRight = `${sidebarWidth}px`
      document.body.style.transition = 'margin-right 0.3s ease-out'
    } else {
      document.body.style.marginRight = '0'
    }

    return () => {
      document.body.style.marginRight = '0'
    }
  }, [isOpen, isMinimized])

  useEffect(() => {
    if (!isOpen) return
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  useEffect(() => {
    return () => {
      if (uploadedFile?.preview) {
        URL.revokeObjectURL(uploadedFile.preview)
      }
    }
  }, [uploadedFile])

  const handleToggle = useCallback(() => {
    setIsOpen(prev => {
      if (!prev) {
        setIsMinimized(false) // Reset minimized when opening
      }
      return !prev
    })
  }, [])

  const handleMinimize = useCallback(() => {
    setIsMinimized(true)
  }, [])

  const handleMaximize = useCallback(() => {
    setIsMinimized(false)
  }, [])


  const canSendMessage = useMemo(() => {
    if (userPack !== 'free') return true
    return dailyMessages < DAILY_FREE_LIMIT
  }, [dailyMessages, userPack])

  const createMessageId = useCallback(() => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size must be less than 10MB')
      return
    }

    const preview = URL.createObjectURL(file)
    setUploadedFile({ file, preview })
    setErrorMessage(null)
  }, [])

  const removeFile = useCallback(() => {
    if (uploadedFile?.preview) {
      URL.revokeObjectURL(uploadedFile.preview)
    }
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [uploadedFile])

  const handleSend = async () => {
    if (!input.trim() && !uploadedFile) return
    if (!canSendMessage) return
    if (isLoading) return

    setIsLoading(true)
    setErrorMessage(null)

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      file: uploadedFile ? {
        name: uploadedFile.file.name,
        type: uploadedFile.file.type,
        size: uploadedFile.file.size,
      } : undefined,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    removeFile()

    try {
      const formData = new FormData()
      formData.append('message', userMessage.content)
      if (uploadedFile) {
        formData.append('file', uploadedFile.file)
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: createMessageId(),
        role: 'assistant',
        content: data.response || 'I could not generate a helpful response right now. Please try again.',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])

      if (userPack === 'free') {
        const newCount = dailyMessages + 1
        setDailyMessages(newCount)
        
        if (!session?.user) {
          const today = new Date().toDateString()
          localStorage.setItem('anonymousChatData', JSON.stringify({ date: today, count: newCount }))
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong while sending your message.'
      setErrorMessage(message)

      setMessages(prev => [...prev, {
        id: createMessageId(),
        role: 'assistant',
        content: 'I\'m sorry—I ran into an issue processing that request. Please try again in a moment.',
        timestamp: new Date(),
      }])
    } finally {
      setIsLoading(false)
      if (uploadedFile) {
        removeFile()
      }
    }
  }

  const remainingMessages = useMemo(() => {
    if (userPack !== 'free') return null
    return Math.max(0, DAILY_FREE_LIMIT - dailyMessages)
  }, [dailyMessages, userPack])

  // Don't render anything until mounted on client
  if (!mounted || typeof document === 'undefined') {
    return null
  }

  const chatWidgetContent = (
    <>
      {/* Chat Button - Always visible when closed */}
      {!isOpen && (
        <motion.button
          onClick={handleToggle}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            pointerEvents: 'auto',
          }}
          className="p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 flex items-center space-x-2 transition-all duration-200"
          title="Swiss Immigration Assistant"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle className="w-6 h-6" />
          <AnimatePresence>
            {remainingMessages !== null && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  remainingMessages > 0
                    ? 'bg-white text-blue-600'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {remainingMessages > 0 ? `${remainingMessages} free` : '0 free'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}

      {/* Sidebar Chat - ASUS Style - Pushes Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              height: isMinimized ? '60px' : '100vh',
            }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: 'fixed',
              top: '0',
              right: '0',
              zIndex: 1000,
              pointerEvents: 'auto',
              width: isMinimized ? '320px' : '400px',
              maxWidth: '100vw',
              boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
            }}
            className="bg-white border-l border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header - ASUS Style */}
            {!isMinimized ? (
              <>
                <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Swiss Immigration Assistant</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleMinimize}
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1.5 rounded transition-colors"
                      title="Minimize"
                    >
                      <Minimize2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleToggle}
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1.5 rounded transition-colors"
                      title="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Greeting Message */}
                {messages.length === 0 && (
                  <div className="p-4 bg-white border-b border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Hello! I'm the Swiss Immigration Assistant. Ask me for help navigating Swiss immigration processes, understanding permit requirements, and finding the information you need. How can I assist you today?
                    </p>
                  </div>
                )}

                {/* Suggested Queries - ASUS Style Cards */}
                {messages.length === 0 && (
                  <div className="p-4 bg-gray-50 border-b border-gray-200 space-y-2 max-h-96 overflow-y-auto">
                    {suggestedQueries.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={async () => {
                          setInput(suggestion.query)
                          // Wait a moment for state to update, then send
                          await new Promise(resolve => setTimeout(resolve, 50))
                          if (canSendMessage && !isLoading) {
                            // Create a synthetic event to trigger send
                            const userMessage: ChatMessage = {
                              id: createMessageId(),
                              role: 'user',
                              content: suggestion.query,
                              timestamp: new Date(),
                            }
                            setMessages(prev => [...prev, userMessage])
                            setInput('')
                            
                            // Send to API
                            setIsLoading(true)
                            setErrorMessage(null)
                            try {
                              const formData = new FormData()
                              formData.append('message', suggestion.query)
                              
                              const response = await fetch('/api/chat', {
                                method: 'POST',
                                body: formData,
                              })
                              
                              if (!response.ok) {
                                throw new Error('Failed to get response')
                              }
                              
                              const data = await response.json()
                              
                              const assistantMessage: ChatMessage = {
                                id: createMessageId(),
                                role: 'assistant',
                                content: data.response || 'I could not generate a helpful response right now. Please try again.',
                                timestamp: new Date(),
                              }
                              
                              setMessages(prev => [...prev, assistantMessage])
                              
                              if (userPack === 'free') {
                                const newCount = dailyMessages + 1
                                setDailyMessages(newCount)
                                
                                if (!session?.user) {
                                  const today = new Date().toDateString()
                                  localStorage.setItem('anonymousChatData', JSON.stringify({ date: today, count: newCount }))
                                }
                              }
                            } catch (error) {
                              const message = error instanceof Error ? error.message : 'Something went wrong while sending your message.'
                              setErrorMessage(message)
                              
                              setMessages(prev => [...prev, {
                                id: createMessageId(),
                                role: 'assistant',
                                content: 'I\'m sorry—I ran into an issue processing that request. Please try again in a moment.',
                                timestamp: new Date(),
                              }])
                            } finally {
                              setIsLoading(false)
                            }
                          }
                        }}
                        disabled={!canSendMessage || isLoading}
                        className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all flex items-start space-x-3 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <suggestion.icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 group-hover:text-blue-700" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">{suggestion.text}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Minimized Header
              <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200 cursor-pointer" onClick={handleMaximize}>
                <h2 className="text-sm font-semibold text-gray-900">Swiss Immigration Assistant</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMaximize()
                    }}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1.5 rounded transition-colors"
                    title="Restore"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggle()
                    }}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1.5 rounded transition-colors"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Messages Area - Only show when not minimized */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scroll-smooth" ref={messagesEndRef}>
                {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.file && (
                      <div className="mt-2 flex items-center space-x-2 text-xs opacity-75">
                        <FileText className="w-4 h-4" />
                        <span>{message.file.name}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 border border-gray-200 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Input Area - Only show when not minimized */}
            {!isMinimized && (
              <div className="p-4 bg-white border-t border-gray-200">
              {uploadedFile && (
                <div className="mb-2 flex items-center justify-between bg-blue-50 p-2 rounded border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">{uploadedFile.file.name}</span>
                    <span className="text-xs text-gray-500">
                      {(uploadedFile.file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <button
                    onClick={removeFile}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Upload file"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Message Swiss Immigration Assistant"
                  disabled={!canSendMessage || isLoading}
                  className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 disabled:opacity-50"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!canSendMessage || isLoading || (!input.trim() && !uploadedFile)}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg shadow-sm"
                  whileHover={{ scale: canSendMessage && !isLoading && (input.trim() || uploadedFile) ? 1.05 : 1 }}
                  whileTap={{ scale: canSendMessage && !isLoading && (input.trim() || uploadedFile) ? 0.95 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>

                {errorMessage && (
                  <p className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200 mt-2">{errorMessage}</p>
                )}

                {uploadedFile && (
                  <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded border border-blue-100 mt-2">
                    💡 Upload CVs, documents, or images for personalized feedback on Swiss immigration applications.
                  </p>
                )}

                {/* Free message counter */}
                {userPack === 'free' && remainingMessages !== null && remainingMessages > 0 && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    {remainingMessages} of {DAILY_FREE_LIMIT} free prompts remaining today
                    {!session?.user && (
                      <span className="block mt-1">
                        <Link href="/auth/register" className="text-blue-600 hover:underline">
                          Sign up for unlimited access
                        </Link>
                      </span>
                    )}
                  </p>
                )}
                {userPack === 'free' && remainingMessages === 0 && !session?.user && (
                  <p className="text-xs text-blue-600 text-center font-medium mt-2">
                    <Link href="/auth/register" className="hover:underline">
                      Sign up for unlimited access
                    </Link>
                  </p>
                )}
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )

  // Render directly to body using portal - completely outside page layout
  if (typeof document !== 'undefined') {
    // Ensure portal container exists and is outside normal flow
    let portalContainer = document.getElementById('swiss-chat-portal')
    if (!portalContainer) {
      portalContainer = document.createElement('div')
      portalContainer.id = 'swiss-chat-portal'
      portalContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 0; height: 0; z-index: 99999; pointer-events: none;'
      document.body.appendChild(portalContainer)
    }
    return createPortal(chatWidgetContent, portalContainer)
  }
  
  return null
}



