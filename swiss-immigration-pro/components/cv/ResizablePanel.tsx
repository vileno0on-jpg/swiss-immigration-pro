'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ResizablePanelProps {
  children: React.ReactNode
  title?: string
  defaultWidth?: number
  minWidth?: number
  maxWidth?: number
  position: 'left' | 'right'
  defaultHidden?: boolean
  isVisible?: boolean // External control for visibility
  onVisibilityChange?: (visible: boolean) => void
  className?: string
  headerContent?: React.ReactNode
}

export default function ResizablePanel({
  children,
  title,
  defaultWidth = 320,
  minWidth = 200,
  maxWidth = 600,
  position,
  defaultHidden = false,
  isVisible: externalIsVisible,
  onVisibilityChange,
  className = '',
  headerContent,
}: ResizablePanelProps) {
  const [isHidden, setIsHidden] = useState(defaultHidden)
  const [isMobile, setIsMobile] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Sync with external visibility control
  useEffect(() => {
    if (externalIsVisible !== undefined) {
      setIsHidden(!externalIsVisible)
    }
  }, [externalIsVisible])

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // On mobile, visibility is controlled by parent
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleHide = () => {
    const newHidden = !isHidden
    setIsHidden(newHidden)
    if (onVisibilityChange) {
      onVisibilityChange(!newHidden)
    }
  }

  // On mobile, when component is rendered and parent is visible, show panel
  useEffect(() => {
    if (!isMobile) return
    
    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      if (panelRef.current) {
        const parent = panelRef.current.parentElement
        if (parent) {
          const isVisible = window.getComputedStyle(parent).display !== 'none'
          if (isVisible && isHidden) {
            setIsHidden(false)
            if (onVisibilityChange) {
              onVisibilityChange(true)
            }
          }
        }
      }
    }, 50)
    
    return () => clearTimeout(timer)
  }, [isMobile, isHidden, onVisibilityChange])

  // Mobile: use drawer style (overlay) - but only if not hidden
  if (isMobile && !isHidden) {
    return (
      <>
        {/* Mobile Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleHide}
        />
        {/* Mobile Drawer */}
        <motion.div
          ref={panelRef}
          initial={{ x: position === 'left' ? '-100%' : '100%' }}
          animate={{ x: 0 }}
          exit={{ x: position === 'left' ? '-100%' : '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed top-16 bottom-0 ${
            position === 'left' ? 'left-0' : 'right-0'
          } w-[85vw] max-w-sm bg-white ${
            position === 'left' ? 'border-r' : 'border-l'
          } border-gray-200 flex flex-col h-[calc(100vh-4rem)] overflow-hidden z-50 shadow-2xl ${className}`}
        >
          {/* Mobile Header */}
          {(title || headerContent) && (
            <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                {title && (
                  <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                )}
                {headerContent}
                <button
                  onClick={toggleHide}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-500 hover:text-gray-700 ml-2"
                  title="Hide"
                >
                  {position === 'left' ? (
                    <ChevronLeft className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          )}
          {/* Mobile Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </motion.div>
      </>
    )
  }

  // Mobile hidden state - show nothing
  if (isMobile && isHidden) {
    return null
  }

  // If hidden on desktop, show a button to reopen
  if (isHidden && !isMobile) {
    return (
      <motion.div
        initial={{ width: defaultWidth }}
        animate={{ width: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative hidden md:block"
        style={{ width: 0 }}
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleHide}
          className={`fixed top-20 ${
            position === 'left' ? 'left-0' : 'right-0'
          } z-30 p-2 bg-white border border-gray-200 ${
            position === 'left' ? 'rounded-r-lg' : 'rounded-l-lg'
          } shadow-lg hover:bg-blue-50 hover:border-blue-300 transition-all hover:scale-110 flex items-center`}
          title="Show Panel"
        >
          {position === 'left' ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={panelRef}
      initial={{ width: defaultWidth }}
      animate={{ width: isHidden ? 0 : defaultWidth }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`relative bg-white ${position === 'left' ? 'border-r' : 'border-l'} border-gray-200 flex flex-col h-full overflow-hidden ${className} hidden md:flex`}
      style={{ width: isHidden ? 0 : defaultWidth }}
    >

      {/* Header - Only show when not hidden */}
      {!isHidden && (title || headerContent) && (
        <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            {title && (
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            )}
            {headerContent}
            <button
              onClick={toggleHide}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-500 hover:text-gray-700 ml-2"
              title="Hide Panel"
            >
              {position === 'left' ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <AnimatePresence>
        {!isHidden && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

