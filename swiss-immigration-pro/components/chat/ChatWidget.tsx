'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle, X, Send, Sparkles, Paperclip, FileText, XCircle } from 'lucide-react'
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

export default function ChatWidget() {
  const { data: session } = useSession()

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

      if (!response.ok) {
        throw new Error('We could not reach the chat assistant. Please try again shortly.')
      }

      const data: { response?: string } = await response.json()
      const assistantText = data.response?.trim()

      appendMessage({
        id: createMessageId(),
        role: 'assistant',
        content:
          assistantText && assistantText.length > 0
            ? assistantText
            : 'I could not generate a helpful response right now. Please try again.',
        timestamp: new Date(),
      })

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
          : 'Something went wrong while sending your message.'
      setErrorMessage(message)

      appendMessage({
        id: createMessageId(),
        role: 'assistant',
        content:
          'I’m sorry—I ran into an issue processing that request. Please try again in a moment.',
        timestamp: new Date(),
      })
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
        className="fixed bottom-6 right-6 sm:bottom-6 sm:right-6 z-[99999] p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 flex items-center space-x-2 transition-all duration-200 pointer-events-auto"
        style={{
          transform: 'none',
        }}
        title="Swiss Immigration AI Assistant"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MessageCircle className="w-6 h-6" />
        <AnimatePresence>
          {!isOpen && remainingMessages !== null && (
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ 
              position: 'fixed', 
              bottom: '96px', 
              right: '24px', 
              zIndex: 9998,
              pointerEvents: 'auto'
            }}
            className="w-full max-w-md h-[600px] bg-white rounded-lg shadow-2xl border border-blue-100 flex flex-col overflow-hidden md:max-w-md sm:max-w-sm sm:right-4 sm:bottom-20"
          >
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              <h2 className="text-lg font-semibold">Swiss Immigration AI Assistant</h2>
              <AnimatePresence>
                {userPack === 'free' && remainingMessages !== null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-blue-100 mt-1"
                  >
                    {remainingMessages} of {DAILY_FREE_LIMIT} free prompts remaining
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.button
              onClick={handleToggle}
              className="text-white hover:bg-white/20 p-1 rounded"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8"
              >
                <motion.div
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Swiss Immigration AI Assistant</h3>
                <p className="text-sm text-gray-600 mb-4">
                  I'm here to help! I'm especially knowledgeable about Swiss immigration, but I can assist with other questions too.
                </p>
                {userPack === 'free' && remainingMessages !== null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs text-blue-600 font-medium"
                  >
                    {remainingMessages} of {DAILY_FREE_LIMIT} free prompts available today
                    {!session?.user && remainingMessages > 0 && (
                      <span className="block mt-1 text-gray-500">
                        No account needed - ask your questions now!
                      </span>
                    )}
                  </motion.p>
                )}
              </motion.div>
            )}
            
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-800 border border-blue-100 shadow-sm'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {message.content}
                  {message.file && (
                    <div className="mt-2 text-xs opacity-75">
                      File: {message.file.name}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <motion.div
                  className="p-3 bg-white border border-blue-100 rounded-lg shadow-sm"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-5 h-5 animate-spin text-blue-600" />
                </motion.div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-blue-100 bg-white p-4 rounded-b-lg">
            {uploadedFile && (
              <div className="mb-3 p-3 bg-blue-50 rounded-lg flex items-center justify-between border border-blue-100">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-blue-900 truncate font-medium">
                    {uploadedFile.file.name}
                  </span>
                  <span className="text-xs text-blue-600 flex-shrink-0">
                    {(uploadedFile.file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="ml-2 text-blue-600 hover:text-blue-800 flex-shrink-0 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
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
                  className={`flex items-center justify-center p-2 rounded-lg transition-colors cursor-pointer border ${
                    !canSendMessage || isLoading
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                      : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-200'
                  }`}
                >
                  <Paperclip className="w-5 h-5" />
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
                  className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
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
                <p className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">{errorMessage}</p>
              )}

              {userPack === 'free' && remainingMessages !== null && remainingMessages > 0 && (
                <p className="text-xs text-blue-600 text-center font-medium">
                  {remainingMessages} of {DAILY_FREE_LIMIT} free prompts remaining today
                  {!session?.user && (
                    <span className="block mt-1">
                      <Link href="/auth/register" className="underline hover:text-blue-700">
                        Sign up for unlimited access
                      </Link>
                    </span>
                  )}
                </p>
              )}
              {userPack === 'free' && remainingMessages === 0 && !session?.user && (
                <p className="text-xs text-blue-600 text-center font-medium">
                  <Link href="/auth/register" className="underline hover:text-blue-700">
                    Sign up for unlimited access
                  </Link>
                </p>
              )}

              {uploadedFile && (
                <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded border border-blue-100">
                  💡 Upload CVs, documents, or images for personalized feedback on Swiss immigration applications.
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

