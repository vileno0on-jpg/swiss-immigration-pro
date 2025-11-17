'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle, Minimize2, Maximize2, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface EmbeddedChatProps {
  moduleTitle?: string
  moduleId?: string
}

export default function EmbeddedChat({ moduleTitle, moduleId }: EmbeddedChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [isDark, setIsDark] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Detect desktop screen size
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768) // md breakpoint
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Listen for dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    // Initial check
    checkDarkMode()

    // Observe changes to the dark class
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Also listen for localStorage changes (if dark mode is toggled elsewhere)
    const handleStorageChange = () => {
      checkDarkMode()
    }
    window.addEventListener('storage', handleStorageChange)

    // Poll for changes (fallback for same-tab changes)
    const interval = setInterval(checkDarkMode, 100)

    return () => {
      observer.disconnect()
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // Mutual exclusivity: When EmbeddedChat opens, close ChatWidget
  useEffect(() => {
    if (isOpen && !isMinimized) {
      // Dispatch event to close ChatWidget
      window.dispatchEvent(new CustomEvent('closeChatWidget'))
      // Also set localStorage flag
      localStorage.setItem('embeddedChatOpen', 'true')
    } else {
      localStorage.removeItem('embeddedChatOpen')
    }
  }, [isOpen, isMinimized])

  // Listen for events from ChatWidget
  useEffect(() => {
    const handleChatWidgetOpen = () => {
      // If ChatWidget opens, minimize EmbeddedChat
      setIsOpen(false)
      setIsMinimized(true)
    }
    window.addEventListener('chatWidgetOpened', handleChatWidgetOpen)
    return () => window.removeEventListener('chatWidgetOpened', handleChatWidgetOpen)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call AI API with context about the module
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input.trim(),
          moduleContext: moduleTitle || moduleId,
          chatType: 'learning' // Different from immigration chat
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response || data.message || 'Sorry, I could not process your request.',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error: any) {
      console.error('Chat error:', error)
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `Sorry, an error occurred: ${error?.message || 'Unknown error'}. Please try again.`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // On desktop, always show (static), on mobile show as floating widget
  if (isMinimized && !isDesktop) {
    return (
      <button
        onClick={() => {
          setIsMinimized(false)
          setIsOpen(true)
        }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40"
        aria-label="Open Learning Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  // On desktop, render static layout without animation
  if (isDesktop) {
    return (
      <div
        className={`w-full max-w-md lg:max-w-lg h-[700px] ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-lg border ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        } flex flex-col`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${
          isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center space-x-2">
            <MessageCircle className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              AI Learning Assistant
            </h3>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              Ask me questions about this module! I'm here to help you learn.
            </p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user'
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-100'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`rounded-lg p-3 ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <Loader2 className={`w-5 h-5 animate-spin ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className={`p-4 border-t ${
          isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about this module..."
              className={`flex-1 px-4 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`px-4 py-2 rounded-lg transition-colors ${
                input.trim() && !isLoading
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
      )
  }

  // On mobile, render with floating animation
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          className={`fixed right-6 bottom-6 w-[calc(100vw-3rem)] max-w-96 h-[600px] ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow-2xl border ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          } flex flex-col z-40`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${
            isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2">
              <MessageCircle className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                AI Learning Assistant
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(true)}
                className={`p-1 rounded hover:bg-opacity-20 ${
                  isDark ? 'hover:bg-white' : 'hover:bg-gray-200'
                } transition-colors`}
                aria-label="Minimize"
              >
                <Minimize2 className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded hover:bg-opacity-20 ${
                  isDark ? 'hover:bg-white' : 'hover:bg-gray-200'
                } transition-colors`}
                aria-label="Close"
              >
                <X className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  Ask me questions about this module! I'm here to help you learn.
                </p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user'
                      ? isDark
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-600 text-white'
                      : isDark
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`rounded-lg p-3 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Loader2 className={`w-5 h-5 animate-spin ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className={`p-4 border-t ${
            isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about this module..."
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  input.trim() && !isLoading
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : isDark
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 
