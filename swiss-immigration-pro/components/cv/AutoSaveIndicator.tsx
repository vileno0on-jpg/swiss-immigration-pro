'use client'

import { useState, useEffect } from 'react'
import { useCVCanvasStore } from '@/store/cvCanvasStore'
import { CheckCircle, Clock } from 'lucide-react'

export default function AutoSaveIndicator() {
  const { canvas } = useCVCanvasStore()
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!canvas) return

    const checkAutoSave = () => {
      const timestamp = localStorage.getItem('cv_draft_timestamp')
      if (timestamp) {
        setLastSaved(new Date(timestamp))
      }
    }

    // Check on mount
    checkAutoSave()

    // Listen for storage events (when auto-save happens)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cv_draft_timestamp') {
        setLastSaved(new Date(e.newValue || ''))
        setIsSaving(false)
      }
    }

    // Listen for custom auto-save event
    const handleAutoSave = () => {
      setIsSaving(true)
      setTimeout(() => {
        setIsSaving(false)
        checkAutoSave()
      }, 500)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('autosave', handleAutoSave as EventListener)

    // Check periodically
    const interval = setInterval(checkAutoSave, 3000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('autosave', handleAutoSave as EventListener)
      clearInterval(interval)
    }
  }, [canvas])

  if (!lastSaved && !isSaving) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 flex items-center space-x-2 z-40">
      {isSaving ? (
        <>
          <Clock className="w-4 h-4 text-blue-600 animate-spin" />
          <span className="text-xs text-gray-700 font-medium">Saving...</span>
        </>
      ) : (
        <>
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-xs text-gray-700">
            Saved {lastSaved ? lastSaved.toLocaleTimeString() : 'just now'}
          </span>
        </>
      )}
    </div>
  )
}





