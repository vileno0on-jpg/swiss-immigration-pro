'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import ChatbotRight from './ChatbotRight'

interface ChatbotContextType {
  openChatbot: () => void
  closeChatbot: () => void
  isOpen: boolean
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function useChatbot() {
  const context = useContext(ChatbotContext)
  if (!context) {
    throw new Error('useChatbot must be used within ChatbotProvider')
  }
  return context
}

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openChatbot = () => setIsOpen(true)
  const closeChatbot = () => setIsOpen(false)

  return (
    <ChatbotContext.Provider value={{ openChatbot, closeChatbot, isOpen }}>
      {children}
      <ChatbotRight isOpen={isOpen} onClose={closeChatbot} />
    </ChatbotContext.Provider>
  )
}
