'use client'

import { useState, useEffect } from 'react'
import { useCVCanvasStore } from '@/store/cvCanvasStore'
import { Sparkles, Loader2, Wand2, Scissors, CheckCircle } from 'lucide-react'
import { IText } from 'fabric'

// Mock AI service function
const generateContent = async (text: string, type: 'rewrite' | 'grammar' | 'shorten'): Promise<string> => {
  // Simulate API call with setTimeout
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = text
      
      switch (type) {
        case 'rewrite':
          result = `Professional: ${text.charAt(0).toUpperCase() + text.slice(1)} with enhanced clarity and impact.`
          break
        case 'grammar':
          result = text
            .replace(/\bi\b/gi, 'I')
            .replace(/\b(its|it's)\b/gi, (match) => match.toLowerCase() === 'its' ? "it's" : match)
            .replace(/\.\s*([a-z])/g, (match, letter) => `. ${letter.toUpperCase()}`)
          break
        case 'shorten':
          // Simple shortening - remove filler words
          result = text
            .replace(/\b(very|really|quite|rather|pretty|somewhat)\s+/gi, '')
            .replace(/\s+/g, ' ')
            .trim()
          if (result.length > text.length * 0.7) {
            result = text.split(' ').slice(0, Math.ceil(text.split(' ').length * 0.7)).join(' ') + '...'
          }
          break
      }
      
      resolve(result)
    }, 1500) // 1.5 second delay to simulate API call
  })
}

export default function AIAssistant() {
  const { canvas, selectedObject, setSelectedObject } = useCVCanvasStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastAction, setLastAction] = useState<'rewrite' | 'grammar' | 'shorten' | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  // Only show when a text object is selected
  const isTextObject = selectedObject && 
    (selectedObject.type === 'i-text' || selectedObject.type === 'textbox' || selectedObject.type === 'text')

  useEffect(() => {
    // Reset success message when selection changes
    setShowSuccess(false)
    setLastAction(null)
  }, [selectedObject])

  if (!isTextObject) {
    return null
  }

  const handleAIAction = async (type: 'rewrite' | 'grammar' | 'shorten') => {
    if (!canvas || !selectedObject || isProcessing) return

    const textObj = selectedObject as IText
    const currentText = textObj.text || ''

    if (!currentText.trim()) {
      alert('Please select a text object with content')
      return
    }

    setIsProcessing(true)
    setLastAction(type)
    setShowSuccess(false)

    try {
      const newText = await generateContent(currentText, type)
      
      // Update the selected object's text
      textObj.set('text', newText)
      textObj.setCoords()
      canvas.renderAll()
      
      // Update selection to trigger re-render
      setSelectedObject(textObj)
      
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (error) {
      console.error('AI action error:', error)
      alert('Failed to process text. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white border-2 border-blue-500 rounded-xl shadow-2xl p-4 min-w-[320px]">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">AI Assistant</h3>
            <p className="text-xs text-gray-500">Enhance your text</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => handleAIAction('rewrite')}
            disabled={isProcessing}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-lg text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
          >
            {isProcessing && lastAction === 'rewrite' ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3 h-3" />
                <span>Professional</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleAIAction('grammar')}
            disabled={isProcessing}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
          >
            {isProcessing && lastAction === 'grammar' ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3" />
                <span>Fix Grammar</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleAIAction('shorten')}
            disabled={isProcessing}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
          >
            {isProcessing && lastAction === 'shorten' ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Scissors className="w-3 h-3" />
                <span>Shorten</span>
              </>
            )}
          </button>
        </div>

        {showSuccess && (
          <div className="mt-2 text-xs text-green-600 font-medium text-center animate-pulse">
            ✓ Text updated successfully!
          </div>
        )}
      </div>
    </div>
  )
}



