'use client'

import { useState, useEffect } from 'react'
import { useCVCanvasStore } from '@/store/cvCanvasStore'
import { FileText, Loader2, Trash2, Plus, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import ResizablePanel from './ResizablePanel'

interface SavedCV {
  id: string
  name: string
  cv_data: any
  template_id: string | null
  created_at: string
  updated_at: string
}

export default function SavedCVsPanel() {
  const { canvas, loadTemplate } = useCVCanvasStore()
  const { data: session } = useSession()
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [cvName, setCvName] = useState('')
  const [currentCvId, setCurrentCvId] = useState<string | null>(null)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Listen for save button click from toolbar
  useEffect(() => {
    const handleOpenSaveDialog = () => {
      setShowSaveDialog(true)
    }
    window.addEventListener('openSaveDialog' as any, handleOpenSaveDialog)
    return () => window.removeEventListener('openSaveDialog' as any, handleOpenSaveDialog)
  }, [])

  // Auto-save functionality (only when logged in)
  useEffect(() => {
    if (!canvas || !autoSaveEnabled || !currentCvId || !session?.user?.id) {
      return
    }

    const autoSaveInterval = setInterval(async () => {
      if (canvas && currentCvId) {
        try {
          const canvasData = canvas.toJSON()
          const backgroundColor = canvas.backgroundColor || '#ffffff'
          
          const cvData = {
            canvasData,
            backgroundColor,
            version: '1.0',
            name: cvName || 'My CV',
          }

          const response = await fetch('/api/cv/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cvData,
              name: cvName || 'My CV',
              cvId: currentCvId,
            }),
          })

          if (response.ok) {
            setLastSaved(new Date())
            loadSavedCVs()
          }
        } catch (error) {
          console.error('Auto-save error:', error)
        }
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval)
  }, [canvas, autoSaveEnabled, currentCvId, session, cvName])


  // Load saved CVs
  const loadSavedCVs = async () => {
    if (!session?.user?.id) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/cv/list')
      if (response.ok) {
        const data = await response.json()
        setSavedCVs(data.cvs || [])
      }
    } catch (error) {
      console.error('Error loading CVs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSavedCVs()
  }, [session])

  // Save current CV
  const handleSave = async () => {
    if (!session?.user?.id) {
      const shouldLogin = confirm('You need to log in to save your CV. Would you like to log in now?')
      if (shouldLogin) {
        window.location.href = '/auth/login?redirect=/tools/cv-editor'
      }
      return
    }

    if (!canvas) {
      alert('No canvas to save')
      return
    }

    setSaving(true)
    try {
      // Get canvas data as JSON (include all properties for full restoration)
      const canvasData = canvas.toJSON()
      
      // Also get canvas background color
      const backgroundColor = canvas.backgroundColor || '#ffffff'
      
      const cvData = {
        canvasData,
        backgroundColor,
        version: '1.0',
        name: cvName || 'My CV',
      }

      const response = await fetch('/api/cv/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvData,
          name: cvName || 'My CV',
          cvId: currentCvId,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        alert(data.message || 'CV saved successfully!')
        setShowSaveDialog(false)
        setCvName('')
        setCurrentCvId(null)
        loadSavedCVs()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save CV')
      }
    } catch (error) {
      console.error('Error saving CV:', error)
      alert('Failed to save CV. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Load a saved CV
  const handleLoadCV = async (cv: SavedCV) => {
    if (!canvas) return

    try {
      // Load canvas from saved data
      if (cv.cv_data?.canvasData) {
        canvas.loadFromJSON(cv.cv_data.canvasData, () => {
          // Restore background color if saved
          if (cv.cv_data?.backgroundColor) {
            canvas.setBackgroundColor(cv.cv_data.backgroundColor, canvas.renderAll.bind(canvas))
          }
          canvas.renderAll()
        })
        setCurrentCvId(cv.id)
        setCvName(cv.name)
      } else {
        alert('Invalid CV data format')
      }
    } catch (error) {
      console.error('Error loading CV:', error)
      alert('Failed to load CV. Please try again.')
    }
  }

  // Delete a CV
  const handleDelete = async (cvId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (!confirm('Are you sure you want to delete this CV?')) {
      return
    }

    try {
      const response = await fetch(`/api/cv/${cvId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        loadSavedCVs()
        if (currentCvId === cvId) {
          setCurrentCvId(null)
          setCvName('')
        }
      } else {
        alert('Failed to delete CV')
      }
    } catch (error) {
      console.error('Error deleting CV:', error)
      alert('Failed to delete CV')
    }
  }

  if (!session?.user?.id) {
    return (
      <ResizablePanel
        position="right"
        defaultWidth={320}
        minWidth={200}
        maxWidth={500}
        title="My CVs"
      >
        <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Your CV</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-xs">
            Log in to save, sync, and access your CVs from anywhere
          </p>
          <a
            href={`/auth/login?redirect=${encodeURIComponent('/tools/cv-editor')}`}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors inline-block shadow-md hover:shadow-lg"
          >
            Log In to Save
          </a>
          <p className="text-xs text-gray-500 mt-4">
            Your work is safe - you can continue editing without logging in
          </p>
        </div>
      </ResizablePanel>
    )
  }

  return (
    <ResizablePanel
      position="right"
      defaultWidth={320}
      minWidth={200}
      maxWidth={500}
      title="My CVs"
      headerContent={
        <>
          <button
            onClick={() => setShowSaveDialog(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Save Current CV"
          >
            <Plus className="w-5 h-5 text-blue-600" />
          </button>
        </>
      }
    >
      <div className="flex flex-col h-full">
        {/* Header Info */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          {lastSaved && (
          <p className="text-xs text-gray-500">
            Last saved: {lastSaved.toLocaleTimeString()}
          </p>
        )}
        {currentCvId && autoSaveEnabled && (
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Auto-saving...</span>
          </div>
          )}
        </div>

        {/* Save Dialog */}
      {showSaveDialog && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentCvId ? 'Update CV' : 'Save CV'}
              </h3>
              <button
                onClick={() => {
                  setShowSaveDialog(false)
                  setCvName('')
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              value={cvName}
              onChange={(e) => setCvName(e.target.value)}
              placeholder="CV Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={saving || !cvName.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
              <button
                onClick={() => {
                  setShowSaveDialog(false)
                  setCvName('')
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CV List */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : savedCVs.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-600">No saved CVs yet</p>
            <p className="text-xs text-gray-500 mt-1">Click + to save your current CV</p>
          </div>
        ) : (
          <div className="space-y-2">
            {savedCVs.map((cv) => (
              <div
                key={cv.id}
                onClick={() => handleLoadCV(cv)}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  currentCvId === cv.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{cv.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(cv.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(cv.id, e)}
                    className="p-1 hover:bg-red-100 text-red-600 rounded ml-2 transition-colors"
                    title="Delete CV"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </ResizablePanel>
  )
}

