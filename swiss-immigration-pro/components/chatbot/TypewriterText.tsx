'use client'

import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number // milliseconds per character
  onComplete?: () => void
  className?: string
}

export default function TypewriterText({ 
  text, 
  speed = 30, 
  onComplete,
  className = '' 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else {
      // Animation complete
      if (onComplete) {
        onComplete()
      }
      // Blink cursor after completion
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 530)
      
      return () => clearInterval(cursorTimer)
    }
  }, [currentIndex, text, speed, onComplete])

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
    setShowCursor(true)
  }, [text])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse">|</span>}
    </span>
  )
}
