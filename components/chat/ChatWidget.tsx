'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { MessageCircle, X, Send, Sparkles, Paperclip, FileText, XCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { CONFIG } from '@/lib/config'

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

  useEffect(() => {
    if (!sessionMetadata) {
      setUserPack('free')
      setDailyMessages(0)
      return
    }

    setUserPack(sessionMetadata.pack ?? 'free')
    setDailyMessages(sessionMetadata.dailyMessages ?? 0)
  }, [sessionMetadata])

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
    if (!session?.user) return false
    if (userPack !== 'free') return true
    return dailyMessages < DAILY_FREE_LIMIT
  }, [dailyMessages, session, userPack])

  const createMessageId = useCallback(() => {
    try {
      return crypto.randomUUID()
    } catch {
      return `${Date.now()}-${Math.random().toString(16).slice(2)}`
    }
  }, [])

  const handleSend = useCallback(async () => {
    if (!canSendMessage) {
      setErrorMessage('Upgrade your plan to continue chatting.')
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

    const payload = {
      message: trimmedInput || uploadedFile?.file.name || '',
      packId: userPack,
      layer: sessionMetadata?.layer,
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
        setDailyMessages((count) => count + 1)
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

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Open Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-md h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col">
          <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">AI Chat</h2>
            <button
              onClick={handleToggle}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {message.content}
                  {message.file && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      File: {message.file.name}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Sparkles className="w-5 h-5 animate-spin text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 p-3">
            {uploadedFile && (
              <div className="mb-2 p-2 bg-blue-50 dark:bg-blue-900 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-blue-900 dark:text-blue-100 truncate">
                    {uploadedFile.file.name}
                  </span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 flex-shrink-0">
                    {(uploadedFile.file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 flex-shrink-0"
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
                  className={`flex items-center justify-center p-2 rounded-lg transition-colors cursor-pointer ${
                    !canSendMessage || isLoading
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
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
                        : 'Type your question or upload a CV/document...'
                      : 'Upgrade to continue'
                  }
                  disabled={!canSendMessage || isLoading}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={!canSendMessage || isLoading || (!input.trim() && !uploadedFile)}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {errorMessage && (
                <p className="text-xs text-red-600 dark:text-red-400">{errorMessage}</p>
              )}

              {uploadedFile && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  💡 Upload CVs, documents, or images for personalized feedback on Swiss immigration
                  applications.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

