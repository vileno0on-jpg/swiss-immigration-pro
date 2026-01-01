'use client'

import { useState, useEffect } from 'react'
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TourStep {
  id: string
  title: string
  description: string
  target: string // CSS selector
  position: 'top' | 'bottom' | 'left' | 'right'
  action?: () => void
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to CV Editor! 👋',
    description: 'Create a professional, ATS-optimized CV in minutes. Let\'s take a quick tour to get you started.',
    target: 'body',
    position: 'top'
  },
  {
    id: 'template',
    title: 'Choose Your Template',
    description: 'Start by selecting a professional template. You can change it anytime and customize colors, fonts, and layout.',
    target: '[data-tour="template-selector"]',
    position: 'right'
  },
  {
    id: 'personal-info',
    title: 'Add Your Personal Information',
    description: 'Fill in your name, email, phone, and location. Add LinkedIn, website, or GitHub links to stand out.',
    target: '[data-tour="personal-info"]',
    position: 'right'
  },
  {
    id: 'summary',
    title: 'Write Your Professional Summary',
    description: 'A compelling 2-3 sentence summary highlighting your key qualifications. This is often the first thing recruiters read.',
    target: '[data-tour="summary"]',
    position: 'right'
  },
  {
    id: 'experience',
    title: 'Add Your Work Experience',
    description: 'List your work history with achievements. Use action verbs and include quantifiable results (e.g., "Increased sales by 25%").',
    target: '[data-tour="experience"]',
    position: 'right'
  },
  {
    id: 'skills',
    title: 'Highlight Your Skills',
    description: 'Add relevant technical and soft skills. The system will suggest industry keywords to improve your ATS score.',
    target: '[data-tour="skills"]',
    position: 'right'
  },
  {
    id: 'preview',
    title: 'Live Preview',
    description: 'See your CV update in real-time as you edit. The preview shows exactly how your CV will look when exported.',
    target: '[data-tour="preview"]',
    position: 'left'
  },
  {
    id: 'customize',
    title: 'Customize Design',
    description: 'Change colors, fonts, spacing, and layout to match your style. All changes are instantly reflected in the preview.',
    target: '[data-tour="customize"]',
    position: 'left'
  },
  {
    id: 'ats-score',
    title: 'ATS Optimization',
    description: 'Your ATS score shows how well your CV will pass through applicant tracking systems. Aim for 80%+ for best results.',
    target: '[data-tour="ats-score"]',
    position: 'bottom'
  },
  {
    id: 'export',
    title: 'Export Your CV',
    description: 'Download your CV as PDF, Word, Text, or JSON. All formats are ATS-optimized and ready to submit.',
    target: '[data-tour="export"]',
    position: 'bottom'
  }
]

interface OnboardingTourProps {
  onComplete: () => void
}

export default function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Check if user has completed tour before
    const hasCompletedTour = localStorage.getItem('cv-editor-tour-completed')
    if (hasCompletedTour === 'true') {
      setIsVisible(false)
      onComplete()
      return
    }

    // Find target element for current step
    const step = TOUR_STEPS[currentStep]
    if (step && step.target !== 'body') {
      const element = document.querySelector(step.target) as HTMLElement
      setTargetElement(element)
      
      // Scroll to element
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    } else {
      setTargetElement(null)
    }
  }, [currentStep, onComplete])

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    localStorage.setItem('cv-editor-tour-completed', 'true')
    setIsVisible(false)
    onComplete()
  }

  if (!isVisible) return null

  const step = TOUR_STEPS[currentStep]
  const progress = ((currentStep + 1) / TOUR_STEPS.length) * 100

  // Calculate position for tooltip
  const getTooltipPosition = () => {
    if (!targetElement || step.target === 'body') {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    }

    const rect = targetElement.getBoundingClientRect()
    const scrollY = window.scrollY
    const scrollX = window.scrollX

    switch (step.position) {
      case 'top':
        return {
          top: `${rect.top + scrollY - 20}px`,
          left: `${rect.left + scrollX + rect.width / 2}px`,
          transform: 'translate(-50%, -100%)'
        }
      case 'bottom':
        return {
          top: `${rect.bottom + scrollY + 20}px`,
          left: `${rect.left + scrollX + rect.width / 2}px`,
          transform: 'translate(-50%, 0)'
        }
      case 'left':
        return {
          top: `${rect.top + scrollY + rect.height / 2}px`,
          left: `${rect.left + scrollX - 20}px`,
          transform: 'translate(-100%, -50%)'
        }
      case 'right':
        return {
          top: `${rect.top + scrollY + rect.height / 2}px`,
          left: `${rect.right + scrollX + 20}px`,
          transform: 'translate(0, -50%)'
        }
      default:
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    }
  }

  return (
    <>
      {/* Blurred Overlay with fluid animation */}
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="fixed inset-0 bg-black/60 z-[9998]"
              onClick={handleSkip}
            />
            
            {/* Highlight overlay for target element with fluid animation */}
            {targetElement && step.target !== 'body' && (
              <motion.div
                key={`highlight-${currentStep}`}
                initial={{ 
                  opacity: 0,
                  scale: 0.95,
                  x: targetElement.getBoundingClientRect().left + window.scrollX,
                  y: targetElement.getBoundingClientRect().top + window.scrollY,
                  width: targetElement.getBoundingClientRect().width,
                  height: targetElement.getBoundingClientRect().height,
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  x: targetElement.getBoundingClientRect().left + window.scrollX,
                  y: targetElement.getBoundingClientRect().top + window.scrollY,
                  width: targetElement.getBoundingClientRect().width,
                  height: targetElement.getBoundingClientRect().height,
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.95,
                }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                className="fixed z-[9999] pointer-events-none"
              >
                <motion.div
                  initial={{ borderRadius: '0.5rem' }}
                  animate={{ borderRadius: '0.75rem' }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 border-4 border-blue-500 rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]"
                  style={{
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 30px rgba(59, 130, 246, 0.5)',
                  }}
                />
                {/* Pulsing glow effect */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 border-4 border-blue-400 rounded-xl"
                />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Tooltip with fluid animations */}
      <AnimatePresence mode="wait">
        {isVisible && (
            <motion.div
              key={`tooltip-${currentStep}`}
              initial={{ 
                opacity: 0, 
                scale: 0.85,
                y: 20,
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0,
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.85,
                y: -20,
              }}
              transition={{ 
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              className="fixed z-[10000] w-80 max-w-[calc(100vw-2rem)] mx-4 md:mx-0"
              style={getTooltipPosition()}
            >
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ 
                delay: 0.2,
                duration: 0.4,
                ease: 'easeOut',
              }}
              className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-blue-500 backdrop-blur-sm"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
              }}
            >
              {/* Progress bar with fluid animation */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2 font-medium">
                  <motion.span
                    key={currentStep}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Step {currentStep + 1} of {TOUR_STEPS.length}
                  </motion.span>
                  <button
                    onClick={handleSkip}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    key={currentStep}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 h-2.5 rounded-full shadow-md relative overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Content with fade animation */}
              <motion.div
                key={`content-${currentStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 font-medium leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Actions with fluid animations */}
              <motion.div
                key={`actions-${currentStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center justify-between"
              >
                <motion.button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  whileHover={currentStep !== 0 ? { scale: 1.05, x: -2 } : {}}
                  whileTap={currentStep !== 0 ? { scale: 0.95 } : {}}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 inline mr-1" />
                  Previous
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 flex items-center shadow-lg shadow-blue-200"
                >
                  {currentStep === TOUR_STEPS.length - 1 ? (
                    <>
                      <Check className="w-4 h-4 inline mr-1" />
                      Get Started
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 inline ml-1" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Arrow pointing to target with fluid animation */}
            {targetElement && step.target !== 'body' && (
              <motion.div
                key={`arrow-${currentStep}`}
                initial={{ 
                  opacity: 0,
                  scale: 0.5,
                  x: step.position === 'left' ? -20 : step.position === 'right' ? 20 : 0,
                  y: step.position === 'top' ? -20 : step.position === 'bottom' ? 20 : 0,
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className={`absolute ${
                  step.position === 'top' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full' :
                  step.position === 'bottom' ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-full' :
                  step.position === 'left' ? 'right-0 top-1/2 -translate-y-1/2 translate-x-full' :
                  'left-0 top-1/2 -translate-y-1/2 -translate-x-full'
                }`}
              >
                <motion.div
                  animate={{
                    y: step.position === 'top' || step.position === 'bottom' 
                      ? [0, 5, 0] 
                      : [0, 0, 0],
                    x: step.position === 'left' || step.position === 'right'
                      ? [0, 5, 0]
                      : [0, 0, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={`w-0 h-0 border-8 ${
                    step.position === 'top' ? 'border-t-blue-500 border-l-transparent border-r-transparent border-b-transparent' :
                    step.position === 'bottom' ? 'border-b-blue-500 border-l-transparent border-r-transparent border-t-transparent' :
                    step.position === 'left' ? 'border-l-blue-500 border-t-transparent border-r-transparent border-b-transparent' :
                    'border-r-blue-500 border-t-transparent border-l-transparent border-b-transparent'
                  }`}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

