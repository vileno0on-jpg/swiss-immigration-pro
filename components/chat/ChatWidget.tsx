'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles, Crown, Paperclip, FileText, XCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { CONFIG } from '@/lib/config'

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

export default function ChatWidget() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userPack, setUserPack] = useState<'free' | 'immigration' | 'masterclass' | 'citizenship'>('free')
  const [dailyMessages, setDailyMessages] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const canSendMessage = !!session && userPack !== 'free' && dailyMessages < CONFIG.MAX_DAILY_MESSAGES

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Open Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-md h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col">
          <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">AI Chat</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
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

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-3">
            {/* File Preview */}
            {uploadedFile && (
              <div className="mb-2 p-2 bg-blue-50 dark:bg-blue-900 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-blue-900 dark:text-blue-100 truncate">{uploadedFile.file.name}</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 flex-shrink-0">
                    ({(uploadedFile.file.size / 1024).toFixed(1)} KB)
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

            <div className="flex space-x-2">
              {/* File Upload Button */}
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
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={canSendMessage ? (uploadedFile ? "Add a message (optional)..." : "Type your question or upload a CV/document...") : "Upgrade to continue"}
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
            {uploadedFile && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                💡 Upload CVs, documents, or images for personalized feedback on Swiss immigration applications
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

