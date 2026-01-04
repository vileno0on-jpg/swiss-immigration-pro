import React from 'react'

interface ChatbotIconProps {
  className?: string
  size?: number
  animated?: boolean
}

/**
 * Custom AI Chatbot Icon - Modern Swiss Legal Assistant
 * Premium design combining chat bubble, technology elements, and intelligence indicators
 * Perfect for law/immigration focused chatbot
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
      <defs>
        <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Main chat bubble container - primary shape */}
      <path
        d="M2.5 10.5C2.5 5.8056 6.35 2 11 2C15.65 2 19.5 5.8056 19.5 10.5C19.5 15.1944 15.65 19 11 19C10.3 19 9.62 18.9277 9 18.7832L5.5 21L6.5 17.3438C4.25 15.5625 2.5 12.9844 2.5 10.5Z"
        fill="url(#chatGradient)"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center intelligence dot - represents AI brain */}
      <circle
        cx="10"
        cy="11"
        r="0.8"
        fill="currentColor"
        opacity="0.6"
      />

      {/* Upper right accent dot - represents spark/idea */}
      <circle
        cx="15"
        cy="8"
        r="0.9"
        fill="currentColor"
        opacity="0.7"
      />

      {/* Lower accent dot - represents connection */}
      <circle
        cx="7"
        cy="14.5"
        r="0.6"
        fill="currentColor"
        opacity="0.5"
      />

      {/* Three horizontal lines - text/communication indicator */}
      <line
        x1="6"
        y1="9.5"
        x2="13"
        y2="9.5"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="6"
        y1="12"
        x2="11"
        y2="12"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="6"
        y1="14.5"
        x2="9"
        y2="14.5"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Small corner bracket - suggests precision/accuracy */}
      <path
        d="M17.5 4.5L17.5 6M17.5 4.5L19 4.5"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
    </svg>
  )
}

export default ChatbotIcon
