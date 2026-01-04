import React from 'react'

interface ChatbotIconProps {
  className?: string
  size?: number
  animated?: boolean
}

/**
 * Modern AI Chat Assistant Icon
 * Clean, recognizable design that works great at small sizes
 * Features a friendly robot face in a chat bubble
 */
export const ChatbotIcon: React.FC<ChatbotIconProps> = ({ 
  className = '', 
  size = 24,
  animated = false 
}) => {
  const animatedClass = animated ? 'animate-pulse' : ''
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animatedClass}`}
      aria-label="AI Assistant Icon"
    >
      {/* Chat bubble background */}
      <path
        d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C11.1 20 10.23 19.8687 9.41 19.625L6 21L6.875 17.875C5.10938 16.375 4 14.3125 4 12Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C11.1 20 10.23 19.8687 9.41 19.625L6 21L6.875 17.875C5.10938 16.375 4 14.3125 4 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Robot face - eyes */}
      <circle
        cx="9.5"
        cy="11"
        r="1.25"
        fill="currentColor"
      />
      <circle
        cx="14.5"
        cy="11"
        r="1.25"
        fill="currentColor"
      />

      {/* Robot face - friendly smile */}
      <path
        d="M9.5 14.5C9.5 14.5 10.5 15.5 12 15.5C13.5 15.5 14.5 14.5 14.5 14.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* AI antenna/signal indicator */}
      <circle
        cx="12"
        cy="6.5"
        r="1"
        fill="currentColor"
      />
      <line
        x1="12"
        y1="7.5"
        x2="12"
        y2="8.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default ChatbotIcon
