'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle, X, Send, Sparkles, Paperclip, FileText, XCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { CONFIG } from '@/lib/config'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { MessageContent } from './MessageContent'

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

// Typing animation component with professional, fluid typing effect
function TypingMessage({ content, isActive }: { content: string; isActive: boolean }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    if (!isActive || !content) {
      setDisplayedText(content || '')
      return
    }

    setDisplayedText('')
    let currentIndex = 0
    let timeoutId: NodeJS.Timeout | null = null
    
    // Professional typing speed - varies by character type for natural feel
    const getTypingSpeed = (char: string, index: number, prevChar?: string) => {
      // Spaces - slight pause for word boundaries
      if (char === ' ') return 40 + (Math.random() * 25) // 40-65ms
      
      // Sentence endings - longer pause for natural reading rhythm
      if (['.', '!', '?'].includes(char)) return 350 + (Math.random() * 150) // 350-500ms
      if ([':', ';'].includes(char)) return 250 + (Math.random() * 100) // 250-350ms
      
      // Commas - medium pause for natural flow
      if (char === ',') return 150 + (Math.random() * 80) // 150-230ms
      
      // Newlines - pause for paragraph breaks
      if (char === '\n') return 200 + (Math.random() * 80) // 200-280ms
      
      // Word boundaries - slight extra pause after longer words
      if (prevChar === ' ' && index > 5) {
        const wordLength = content.slice(Math.max(0, index - 10), index).split(' ').pop()?.length || 0
        if (wordLength > 6) {
          return 70 + (Math.random() * 30) // 70-100ms for longer words
        }
      }
      
      // Base speed - professional typing speed with natural variation
      const baseSpeed = 30 + (Math.random() * 25) // 30-55ms per character
      return baseSpeed
    }

    const typeNextChar = () => {
      if (currentIndex < content.length) {
        const char = content[currentIndex]
        const prevChar = currentIndex > 0 ? content[currentIndex - 1] : undefined
        setDisplayedText(content.slice(0, currentIndex + 1))
        currentIndex++
        
        const speed = getTypingSpeed(char, currentIndex, prevChar)
        timeoutId = setTimeout(typeNextChar, speed)
      }
    }

    // Start typing after a brief delay for smoother start
    const startTimer = setTimeout(typeNextChar, 150)

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
          className="inline-block w-0.5 h-4 bg-slate-700 ml-1.5 align-middle rounded-sm"
          animate={{ 
            opacity: [1, 1, 0, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 0.51, 1],
          }}
        />
      )}
    </span>
  )
}

export default function ChatWidget() {
  const { data: session } = useSession()
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [dailyMessages, setDailyMessages] = useState(0)
  const [userPack, setUserPack] = useState<UserPack>('free')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const sessionMetadata = useMemo(() => {
    if (!session?.user) return undefined
    return session.user as SessionUserMetadata
  }, [session])

  // Load anonymous user message count from localStorage
  useEffect(() => {
    if (session?.user) {
      // Logged in user - use session data
      if (sessionMetadata) {
        setUserPack(sessionMetadata.pack ?? 'free')
        setDailyMessages(sessionMetadata.dailyMessages ?? 0)
      }
    } else {
      // Anonymous user - track in localStorage
      setUserPack('free')
      const today = new Date().toDateString()
      const stored = localStorage.getItem('anonymousChatData')
      
      if (stored) {
        try {
          const data = JSON.parse(stored)
          if (data.date === today) {
            setDailyMessages(data.count || 0)
          } else {
            // New day - reset
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

  const appendMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }, [])

  const resetFileSelection = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    if (uploadedFile?.preview) {
      URL.revokeObjectURL(uploadedFile.preview)
    }
    setUploadedFile(null)
    resetFileSelection()
  }, [resetFileSelection, uploadedFile])

  const handleFileSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) {
        handleRemoveFile()
        return
      }

      if (uploadedFile?.preview) {
        URL.revokeObjectURL(uploadedFile.preview)
      }

      const preview = URL.createObjectURL(file)
      setUploadedFile({ file, preview })
    },
    [handleRemoveFile, uploadedFile]
  )

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
    setErrorMessage(null)
  }, [])

  const canSendMessage = useMemo(() => {
    // Allow everyone (logged in or anonymous) to send messages
    if (userPack !== 'free') return true
    return dailyMessages < DAILY_FREE_LIMIT
  }, [dailyMessages, userPack])

  const createMessageId = useCallback(() => {
    try {
      return crypto.randomUUID()
    } catch {
      return `${Date.now()}-${Math.random().toString(16).slice(2)}`
    }
  }, [])

  const handleSend = useCallback(async () => {
    if (!canSendMessage) {
      if (!session?.user) {
        setErrorMessage(`You've used all ${DAILY_FREE_LIMIT} free prompts today. Sign up for unlimited access!`)
      } else {
        setErrorMessage('Upgrade your plan to continue chatting.')
      }
      return
    }

    const trimmedInput = input.trim()
    if (!trimmedInput && !uploadedFile) {
      return
    }

    const currentTimestamp = new Date()
    const outboundMessage: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content: trimmedInput || (uploadedFile ? 'Uploaded a document.' : ''),
      timestamp: currentTimestamp,
      file: uploadedFile
        ? {
            name: uploadedFile.file.name,
            type: uploadedFile.file.type,
            size: uploadedFile.file.size,
          }
        : undefined,
    }

    appendMessage(outboundMessage)
    setInput('')
    setErrorMessage(null)
    setIsLoading(true)

    // Get layer from localStorage for anonymous users, or from session for logged-in users
    let userLayer = sessionMetadata?.layer
    if (!userLayer && typeof window !== 'undefined') {
      const stored = localStorage.getItem('userLayer')
      if (stored) {
        try {
          userLayer = JSON.parse(stored)
        } catch {
          // Ignore parse errors
        }
      }
    }

    const payload = {
      message: trimmedInput || uploadedFile?.file.name || '',
      packId: userPack,
      layer: userLayer,
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        // Extract error message from API response
        const errorMessage = data?.error || data?.message || 'We could not reach the chat assistant. Please try again shortly.'
        throw new Error(errorMessage)
      }

      const assistantText = data.response?.trim()

      if (assistantText && assistantText.length > 0) {
        const messageId = createMessageId()
        appendMessage({
          id: messageId,
          role: 'assistant',
          content: assistantText,
          timestamp: new Date(),
        })
        setTypingMessageId(messageId)
      } else {
        throw new Error('Received empty response from the chat assistant.')
      }

      if (userPack === 'free') {
        const newCount = dailyMessages + 1
        setDailyMessages(newCount)
        
        // Update localStorage for anonymous users
        if (!session?.user) {
          const today = new Date().toDateString()
          localStorage.setItem('anonymousChatData', JSON.stringify({ date: today, count: newCount }))
        }
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Connection error. Please check your internet and try again.'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
      if (uploadedFile) {
        handleRemoveFile()
      }
    }
  }, [
    appendMessage,
    canSendMessage,
    createMessageId,
    handleRemoveFile,
    input,
    sessionMetadata?.layer,
    uploadedFile,
    userPack,
  ])

  const remainingMessages = useMemo(() => {
    if (userPack !== 'free') return null
    return Math.max(0, DAILY_FREE_LIMIT - dailyMessages)
  }, [dailyMessages, userPack])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const chatWidgetContent = (
    <>
      <motion.button
        onClick={handleToggle}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[99999] w-12 h-12 sm:w-14 sm:h-14 bg-slate-800 text-white rounded-full shadow-sm hover:shadow-md hover:bg-slate-700 flex items-center justify-center transition-all duration-200 pointer-events-auto touch-manipulation relative border border-slate-700/50"
        style={{
          transform: 'none',
        }}
        title="Swiss Immigration AI Assistant"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
        <AnimatePresence>
          {!isOpen && remainingMessages !== null && remainingMessages > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-blue-600 text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1 shadow-sm"
            >
              {remainingMessages}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ 
              position: 'fixed', 
              bottom: typeof window !== 'undefined' && window.innerWidth >= 640 ? '96px' : '80px',
              right: typeof window !== 'undefined' && window.innerWidth >= 640 ? '24px' : '16px', 
              zIndex: 9998,
              pointerEvents: 'auto'
            }}
            className="w-[calc(100vw-2rem)] sm:w-full sm:max-w-md h-[calc(100vh-6rem)] sm:h-[600px] bg-white rounded-xl shadow-2xl border border-slate-200/50 flex flex-col overflow-hidden"
          >
          <div className="flex justify-between items-center px-5 py-4 bg-slate-900 text-white rounded-t-xl border-b border-slate-800">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              <h2 className="text-base font-semibold tracking-tight">Swiss Immigration AI Assistant</h2>
              <AnimatePresence>
                {userPack === 'free' && remainingMessages !== null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-slate-400 mt-1"
                  >
                    {remainingMessages} of {DAILY_FREE_LIMIT} free prompts remaining
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.button
              onClick={handleToggle}
              className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              aria-label="Close chat"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </motion.button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 scroll-smooth">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8"
              >
                <motion.div
                  className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MessageCircle className="w-8 h-8 text-slate-700" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 tracking-tight">Swiss Immigration AI Assistant</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed max-w-sm mx-auto">
                  I'm here to help! I'm especially knowledgeable about Swiss immigration, but I can assist with other questions too.
                </p>
                {userPack === 'free' && remainingMessages !== null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs text-slate-700 font-medium"
                  >
                    {remainingMessages} of {DAILY_FREE_LIMIT} free prompts available today
                    {!session?.user && remainingMessages > 0 && (
                      <span className="block mt-1.5 text-slate-500 font-normal">
                        No account needed - ask your questions now!
                      </span>
                    )}
                  </motion.p>
                )}
              </motion.div>
            )}
            
            {messages.map((message, index) => {
              const isTyping = typingMessageId === message.id && message.role === 'assistant'
              
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  onAnimationComplete={() => {
                    if (isTyping) {
                      setTimeout(() => setTypingMessageId(null), 100)
                    }
                  }}
                >
                  <motion.div
                    className={`max-w-[80%] p-3.5 rounded-xl ${
                      message.role === 'user'
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    {message.role === 'assistant' && isTyping ? (
                      <TypingMessage content={message.content} isActive={true} />
                    ) : (
                      <MessageContent 
                        content={message.content} 
                        onSuggestionClick={async (suggestion) => {
                          setInput(suggestion)
                          await new Promise(resolve => setTimeout(resolve, 50))
                          if (canSendMessage && !isLoading) {
                            const userMessage: ChatMessage = {
                              id: createMessageId(),
                              role: 'user',
                              content: suggestion,
                              timestamp: new Date(),
                            }
                            appendMessage(userMessage)
                            setInput('')
                            setIsLoading(true)
                            
                            let userLayer = sessionMetadata?.layer
                            if (!userLayer && typeof window !== 'undefined') {
                              const stored = localStorage.getItem('userLayer')
                              if (stored) {
                                try {
                                  userLayer = JSON.parse(stored)
                                } catch {}
                              }
                            }
                            
                            try {
                              const response = await fetch('/api/chat', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  message: suggestion,
                                  packId: userPack,
                                  layer: userLayer,
                                }),
                              })
                              
                              if (!response.ok) throw new Error('Failed to get response')
                              
                              const data: { response?: string } = await response.json()
                              const assistantText = data.response?.trim()
                              
                              if (assistantText) {
                                const messageId = createMessageId()
                                appendMessage({
                                  id: messageId,
                                  role: 'assistant',
                                  content: assistantText,
                                  timestamp: new Date(),
                                })
                                setTypingMessageId(messageId)
                              }
                            } catch (error) {
                              appendMessage({
                                id: createMessageId(),
                                role: 'assistant',
                                content: `Sorry, an error occurred. Please try again.`,
                                timestamp: new Date(),
                              })
                            } finally {
                              setIsLoading(false)
                            }
                          }
                        }} 
                      />
                    )}
                    {message.file && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-200/50 text-xs text-slate-500 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="truncate">{message.file.name}</span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <motion.div
                  className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-2"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-4 h-4 animate-spin text-slate-600" strokeWidth={2} />
                  <span className="text-xs text-slate-500 font-medium">Thinking...</span>
                </motion.div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200/50 bg-white p-4 rounded-b-xl">
            {uploadedFile && (
              <div className="mb-3 p-3 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-200">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-slate-600 flex-shrink-0" strokeWidth={2} />
                  <span className="text-sm text-slate-900 truncate font-medium">
                    {uploadedFile.file.name}
                  </span>
                  <span className="text-xs text-slate-500 flex-shrink-0 font-medium">
                    {(uploadedFile.file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="ml-2 text-slate-500 hover:text-slate-700 flex-shrink-0 transition-colors p-1 rounded hover:bg-slate-100"
                  aria-label="Remove file"
                >
                  <XCircle className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            )}

            <div className="flex flex-col space-y-3">
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="chat-file-input"
                  disabled={!canSendMessage || isLoading}
                />
                <label
                  htmlFor="chat-file-input"
                  className={`flex items-center justify-center w-11 h-11 rounded-lg transition-all cursor-pointer ${
                    !canSendMessage || isLoading
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  aria-label="Attach file"
                >
                  <Paperclip className="w-5 h-5" strokeWidth={2} />
                </label>

                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder={
                    canSendMessage
                      ? uploadedFile
                        ? 'Add a message (optional)...'
                        : 'Ask about Swiss immigration, visas, or permits...'
                      : `You've used all ${DAILY_FREE_LIMIT} free prompts today. Sign up for unlimited access!`
                  }
                  disabled={!canSendMessage || isLoading}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm transition-all"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!canSendMessage || isLoading || (!input.trim() && !uploadedFile)}
                  className="w-11 h-11 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center"
                  whileHover={{ scale: canSendMessage && !isLoading && (input.trim() || uploadedFile) ? 1.05 : 1 }}
                  whileTap={{ scale: canSendMessage && !isLoading && (input.trim() || uploadedFile) ? 0.95 : 1 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" strokeWidth={2} />
                </motion.button>
              </div>

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-700 bg-red-50 p-3 rounded-lg border border-red-200 flex items-start gap-2"
                >
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {userPack === 'free' && remainingMessages !== null && remainingMessages > 0 && (
                <p className="text-xs text-slate-600 text-center font-medium">
                  {remainingMessages} of {DAILY_FREE_LIMIT} free prompts remaining today
                  {!session?.user && (
                    <span className="block mt-1.5">
                      <Link href="/auth/register" className="text-slate-900 hover:text-slate-700 underline underline-offset-2 font-semibold transition-colors">
                        Sign up for unlimited access
                      </Link>
                    </span>
                  )}
                </p>
              )}
              {userPack === 'free' && remainingMessages === 0 && !session?.user && (
                <p className="text-xs text-slate-600 text-center font-medium">
                  <Link href="/auth/register" className="text-slate-900 hover:text-slate-700 underline underline-offset-2 font-semibold transition-colors">
                    Sign up for unlimited access
                  </Link>
                </p>
              )}

              {uploadedFile && (
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                  <span className="font-semibold text-slate-700">Tip:</span> Upload CVs, documents, or images for personalized feedback on Swiss immigration applications.
                </p>
              )}
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  if (!mounted) {
    return null
  }

  // Ensure we're using the body element and create a dedicated container
  if (typeof document !== 'undefined') {
    let portalContainer = document.getElementById('chat-widget-portal')
    if (!portalContainer) {
      portalContainer = document.createElement('div')
      portalContainer.id = 'chat-widget-portal'
      portalContainer.setAttribute('data-chat-widget-portal', 'true')
      portalContainer.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 99999; pointer-events: auto; isolation: isolate;'
      document.body.appendChild(portalContainer)
    }
    return createPortal(chatWidgetContent, portalContainer)
  }
  
  return null
}

