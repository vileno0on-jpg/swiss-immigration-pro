'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Send, Paperclip, FileText, XCircle, Minimize2, Maximize2, FileQuestion, Lightbulb, Search, Briefcase, Sparkles } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { CONFIG } from '@/lib/config'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { MessageContent } from './MessageContent'
import { ChatbotIcon } from '@/components/icons/ChatbotIcon'

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

// Typing animation component with slower, more fluid typing
function TypingMessage({ content, isActive }: { content: string; isActive: boolean }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    if (!isActive || !content) {
      setDisplayedText(content || '')
      return
    }

    setDisplayedText('')
    let currentIndex = 0
    
    // Fluid, slow typing speed - varies by character type for natural feel
    const getTypingSpeed = (char: string, index: number, prevChar?: string) => {
      // Spaces - slight pause for word boundaries
      if (char === ' ') return 50 + (Math.random() * 30) // 50-80ms
      
      // Punctuation - longer, more dramatic pause for natural reading rhythm
      if (['.', '!', '?'].includes(char)) return 400 + (Math.random() * 200) // 400-600ms
      if ([':', ';'].includes(char)) return 300 + (Math.random() * 150) // 300-450ms
      
      // Commas - medium pause for natural flow
      if (char === ',') return 200 + (Math.random() * 100) // 200-300ms
      
      // Newlines - pause for paragraph breaks
      if (char === '\n') return 250 + (Math.random() * 100) // 250-350ms
      
      // Word boundaries - slight extra pause after longer words
      if (prevChar === ' ' && index > 5) {
        const wordLength = content.slice(Math.max(0, index - 10), index).split(' ').pop()?.length || 0
        if (wordLength > 6) {
          return 80 + (Math.random() * 40) // 80-120ms for longer words
        }
      }
      
      // Base speed - slower and more varied for fluid, natural typing
      const baseSpeed = 50 + (Math.random() * 40) // 50-90ms per character
      return baseSpeed
    }

    const typeNextChar = () => {
      if (currentIndex < content.length) {
        const char = content[currentIndex]
        const prevChar = currentIndex > 0 ? content[currentIndex - 1] : undefined
        setDisplayedText(content.slice(0, currentIndex + 1))
        currentIndex++
        
        const speed = getTypingSpeed(char, currentIndex, prevChar)
        setTimeout(typeNextChar, speed)
      }
    }

    // Start typing after a brief delay for smoother start
    const startTimer = setTimeout(typeNextChar, 200)

    return () => {
      clearTimeout(startTimer)
    }
  }, [content, isActive])

  return (
    <>
      {displayedText}
      {isActive && displayedText.length < content.length && (
        <span className="inline-block w-2 h-4 bg-blue-600 ml-1 animate-pulse" />
      )}
    </>
  )
}

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
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null)

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
    // Ensure we're in browser environment before setting mounted
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      setMounted(true)
    }
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
    const dailyFreeLimit = CONFIG.ai.freeDailyLimit
    return dailyMessages < dailyFreeLimit
  }, [dailyMessages, userPack, session])

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

    // Capture file before removing it
    const fileToUpload = uploadedFile

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      file: fileToUpload ? {
        name: fileToUpload.file.name,
        type: fileToUpload.file.type,
        size: fileToUpload.file.size,
      } : undefined,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    removeFile()

    try {
      const formData = new FormData()
      formData.append('message', userMessage.content)
      formData.append('packId', userPack)
      // Get layer from localStorage if available
      if (typeof window !== 'undefined') {
        const layer = localStorage.getItem('userLayer')
        if (layer) {
          formData.append('layer', layer)
        }
      }
      if (fileToUpload) {
        formData.append('file', fileToUpload.file)
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
        content: data.response || '',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
      setTypingMessageId(assistantMessage.id)

      if (userPack === 'free') {
        const newCount = dailyMessages + 1
        setDailyMessages(newCount)
        
        if (!session?.user) {
          const today = new Date().toDateString()
          localStorage.setItem('anonymousChatData', JSON.stringify({ date: today, count: newCount }))
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Connection error. Please check your internet and try again.'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
      // File was already removed earlier, no need to remove again
    }
  }

  const remainingMessages = useMemo(() => {
    if (userPack !== 'free') return null
    const dailyFreeLimit = CONFIG.ai.freeDailyLimit
    return Math.max(0, dailyFreeLimit - dailyMessages)
  }, [dailyMessages, userPack])

  // Don't render anything until mounted on client
  if (!mounted) {
    return null
  }

  // Ensure we're in browser environment before rendering
  if (typeof document === 'undefined') {
    return null
  }

  const chatWidgetContent = (
    <>
      {/* Chat Button - "Have a question?" version - Always visible when closed */}
      {!isOpen && (
        <motion.div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            pointerEvents: 'auto',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={handleToggle}
            className="relative flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-blue-800 group"
            title="Chat with our AI assistant"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-semibold tracking-wide">Chatbot</span>
            
            {remainingMessages !== null && remainingMessages > 0 && (
              <div className="flex items-center justify-center min-w-[20px] h-[20px] bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold rounded-full px-1.5 border border-white/30">
                {remainingMessages}
              </div>
            )}
          </motion.button>
        </motion.div>
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
              top: isMinimized ? 'auto' : '0',
              bottom: isMinimized ? '24px' : '0',
              right: isMinimized ? '24px' : '0',
              zIndex: 1000,
              pointerEvents: 'auto',
              width: isMinimized ? '320px' : '400px',
              maxWidth: '100vw',
              boxShadow: isMinimized 
                ? '0 10px 40px rgba(0, 0, 0, 0.2)' 
                : '-4px 0 24px rgba(0, 0, 0, 0.15)',
            }}
            className={`bg-white border-l border-gray-200 flex flex-col overflow-hidden ${
              isMinimized ? 'rounded-2xl' : 'rounded-l-3xl'
            }`}
          >
            {/* Header - ASUS Style - Enhanced with animations */}
            {!isMinimized ? (
              <>
                <div className="flex justify-between items-center p-5 bg-white border-b border-slate-100 rounded-tl-3xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 relative">
                      <ChatbotIcon className="w-5 h-5 text-blue-600" size={20} />
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                        Swiss Assistant
                        <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-[10px] text-blue-600 font-bold tracking-wider">AI</span>
                      </h2>
                      <p className="text-[11px] text-slate-500 font-medium">Online & Ready to help</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <motion.button
                      onClick={handleMinimize}
                      className="text-slate-400 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-xl transition-colors"
                      title="Minimize"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Minimize2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={handleToggle}
                      className="text-slate-400 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-xl transition-colors"
                      title="Close"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Greeting Message */}
                {messages.length === 0 && (
                  <div className="p-6 bg-white">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">How can I help you?</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      Ask me anything about Swiss work permits, residency, or citizenship. I'm trained on official Swiss immigration data.
                    </p>
                  </div>
                )}

                {/* Suggested Queries - Professional Cards */}
                {messages.length === 0 && (
                  <div className="p-6 pt-0 space-y-2.5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Suggested Topics</p>
                    {suggestedQueries.map((suggestion, idx) => (
                      <motion.button
                        key={idx}
                        onClick={async () => {
                          setInput(suggestion.query)
                          await new Promise(resolve => setTimeout(resolve, 50))
                          if (canSendMessage && !isLoading) {
                            const userMessage: ChatMessage = {
                              id: createMessageId(),
                              role: 'user',
                              content: suggestion.query,
                              timestamp: new Date(),
                            }
                            setMessages(prev => [...prev, userMessage])
                            setInput('')
                            setIsLoading(true)
                            setErrorMessage(null)
                            try {
                              const formData = new FormData()
                              formData.append('message', suggestion.query)
                              formData.append('packId', userPack)
                              if (typeof window !== 'undefined') {
                                const layer = localStorage.getItem('userLayer')
                                if (layer) {
                                  formData.append('layer', layer)
                                }
                              }
                              const response = await fetch('/api/chat', {
                                method: 'POST',
                                body: formData,
                              })
                              if (!response.ok) throw new Error('Failed to get response')
                              const data = await response.json()
                              const assistantMessage: ChatMessage = {
                                id: createMessageId(),
                                role: 'assistant',
                                content: data.response || '',
                                timestamp: new Date(),
                              }
                              setMessages(prev => [...prev, assistantMessage])
                              setTypingMessageId(assistantMessage.id)
                              if (userPack === 'free') {
                                const newCount = dailyMessages + 1
                                setDailyMessages(newCount)
                                if (!session?.user) {
                                  const today = new Date().toDateString()
                                  localStorage.setItem('anonymousChatData', JSON.stringify({ date: today, count: newCount }))
                                }
                              }
                            } catch (error) {
                              const message = error instanceof Error ? error.message : 'Connection error.'
                              setErrorMessage(message)
                            } finally {
                              setIsLoading(false)
                            }
                          }
                        }}
                        disabled={!canSendMessage || isLoading}
                        className="w-full text-left p-3.5 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-slate-50/50 transition-all flex items-center space-x-3 group disabled:opacity-50 relative overflow-hidden"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                          <suggestion.icon className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors flex-1">{suggestion.text}</span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Minimized Header - Enhanced with animations
              <motion.div 
                className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 cursor-pointer"
                onClick={handleMaximize}
                whileHover={{ backgroundColor: "rgba(239, 246, 255, 1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ChatbotIcon className="w-5 h-5 text-blue-600" size={20} />
                  </motion.div>
                  <h2 className="text-sm font-semibold text-gray-900">Swiss Immigration Assistant</h2>
                  <motion.span
                    className="text-xs text-blue-500 font-medium"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    AI
                  </motion.span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMaximize()
                    }}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1.5 rounded transition-colors"
                    title="Restore"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggle()
                    }}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1.5 rounded transition-colors"
                    title="Close"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Messages Area - Only show when not minimized */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scroll-smooth" ref={messagesEndRef}>
                {messages.map((message) => {
                const isTyping = typingMessageId === message.id && message.role === 'assistant'
                
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    onAnimationComplete={() => {
                      if (isTyping) {
                        // Clear typing state after animation completes
                        setTimeout(() => setTypingMessageId(null), 100)
                      }
                    }}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-slate-900 text-white rounded-br-none shadow-sm'
                          : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap font-normal">
                        {message.role === 'assistant' && isTyping ? (
                          <TypingMessage content={message.content} isActive={true} />
                        ) : (
                          <MessageContent content={message.content} onSuggestionClick={async (suggestion) => {
                            setInput(suggestion)
                            // Wait a moment for state to update, then send
                            await new Promise(resolve => setTimeout(resolve, 50))
                            if (canSendMessage && !isLoading) {
                              const userMessage: ChatMessage = {
                                id: createMessageId(),
                                role: 'user',
                                content: suggestion,
                                timestamp: new Date(),
                              }
                              setMessages(prev => [...prev, userMessage])
                              setInput('')
                              
                              setIsLoading(true)
                              setErrorMessage(null)
                              
                              try {
                                const formData = new FormData()
                                formData.append('message', suggestion)
                                formData.append('packId', userPack)
                                if (typeof window !== 'undefined') {
                                  const layer = localStorage.getItem('userLayer')
                                  if (layer) {
                                    formData.append('layer', layer)
                                  }
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
                                  content: data.response || '',
                                  timestamp: new Date(),
                                }
                                
                                setMessages(prev => [...prev, assistantMessage])
                                setTypingMessageId(assistantMessage.id)
                              } catch (error: any) {
                                console.error('Chat error:', error)
                                const errorMessage: ChatMessage = {
                                  id: createMessageId(),
                                  role: 'assistant',
                                  content: `Sorry, an error occurred: ${error?.message || 'Unknown error'}. Please try again.`,
                                  timestamp: new Date(),
                                }
                                setMessages(prev => [...prev, errorMessage])
                              } finally {
                                setIsLoading(false)
                              }
                            }
                          }} />
                        )}
                      </div>
                      {message.file && (
                        <div className="mt-2 flex items-center space-x-2 text-xs opacity-75">
                          <FileText className="w-4 h-4" />
                          <span>{message.file.name}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}

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

            {/* Input Area - Modern & Professional */}
            {!isMinimized && (
              <div className="p-4 bg-white border-t border-slate-100">
                {uploadedFile && (
                  <div className="mb-3 flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">{uploadedFile.file.name}</span>
                        <span className="text-[10px] text-slate-400">{(uploadedFile.file.size / 1024).toFixed(1)} KB</span>
                      </div>
                    </div>
                    <button onClick={removeFile} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
                    aria-label="Upload file"
                  >
                    <Paperclip className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  <div className="flex-1 relative">
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
                      placeholder="Ask a question..."
                      disabled={!canSendMessage || isLoading}
                      className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:bg-white focus:border-slate-200 text-sm text-slate-900 placeholder-slate-400 disabled:opacity-50 transition-all"
                    />
                    <motion.button
                      onClick={handleSend}
                      disabled={!canSendMessage || isLoading || (!input.trim() && !uploadedFile)}
                      className="absolute right-1.5 top-1.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 text-white p-2 rounded-xl shadow-sm transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="w-4 h-4" strokeWidth={2} />
                    </motion.button>
                  </div>
                </div>

                {errorMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 bg-red-50 text-[11px] text-red-600 border border-red-100 rounded-xl flex items-center gap-2"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    {errorMessage}
                  </motion.div>
                )}

                {/* Footer Credits/Limits */}
                <div className="mt-4 flex flex-col items-center">
                  {userPack === 'free' && remainingMessages !== null && (
                    <p className="text-[10px] text-slate-400 font-medium">
                      {remainingMessages > 0 
                        ? `${remainingMessages} messages remaining today`
                        : "Daily limit reached"}
                      {!session?.user && (
                        <Link href="/auth/register" className="ml-1 text-slate-900 hover:underline font-bold">
                          Sign up for more
                        </Link>
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )

  // Render directly to body using portal - completely outside page layout
  // Ensure document and body are available before creating portal
  if (typeof document === 'undefined' || !document.body) {
    return null
  }

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
