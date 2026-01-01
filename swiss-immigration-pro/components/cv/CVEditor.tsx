'use client'

import { useEffect, useState } from 'react'
import { useCVCanvasStore } from '@/store/cvCanvasStore'
import Canvas from './Canvas'
import Toolbar from './Toolbar'
import Sidebar from './Sidebar'
import SavedCVsPanel from './SavedCVsPanel'
import LoginPrompt from './LoginPrompt'
import AIAssistant from './AIAssistant'
import LayersPanel from './LayersPanel'
import AutoSaveIndicator from './AutoSaveIndicator'
import ZoomControls from './ZoomControls'
import AICVGenerator from './AICVGenerator'
import OnboardingTour from './OnboardingTour'
import AdvancedPropertiesPanel from './AdvancedPropertiesPanel'

export default function CVEditor() {
  const { canvas, setCanvas } = useCVCanvasStore()
  const [tourCompleted, setTourCompleted] = useState(false)
  const [mobilePanelOpen, setMobilePanelOpen] = useState<'left' | 'right' | 'layers' | null>(null)
  const [panelVisibility, setPanelVisibility] = useState({
    left: true,
    right: true,
    layers: true,
  })

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (canvas) {
        canvas.dispose()
        setCanvas(null)
      }
    }
  }, [canvas, setCanvas])

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/40 to-white overflow-hidden">
      {/* Top Toolbar */}
      <Toolbar />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Panel Toggle Buttons */}
        <div className="md:hidden fixed top-16 left-0 right-0 z-30 flex items-center justify-between px-4 py-2.5 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
          <button
            onClick={() => setMobilePanelOpen(mobilePanelOpen === 'left' ? null : 'left')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              mobilePanelOpen === 'left'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tools
          </button>
          <button
            onClick={() => setMobilePanelOpen(mobilePanelOpen === 'right' ? null : 'right')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              mobilePanelOpen === 'right'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Saved
          </button>
          <button
            onClick={() => setMobilePanelOpen(mobilePanelOpen === 'layers' ? null : 'layers')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              mobilePanelOpen === 'layers'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Layers
          </button>
        </div>

        {/* Left Sidebar */}
        <div className={mobilePanelOpen === 'left' ? 'block md:block' : 'hidden md:block'}>
        <Sidebar />
        </div>

        {/* Center Canvas */}
        <div className="flex-1 overflow-hidden pt-14 md:pt-0">
        <Canvas />
        </div>

        {/* Right Sidebar - Saved CVs */}
        <div className={mobilePanelOpen === 'right' ? 'block md:block' : 'hidden md:block'}>
        <SavedCVsPanel />
        </div>

        {/* Layers Panel - Far Right */}
        <div className={mobilePanelOpen === 'layers' ? 'block md:block' : 'hidden md:block'}>
        <LayersPanel />
        </div>
      </div>

      {/* Login Prompt (floating) */}
      <LoginPrompt />

      {/* AI Assistant (floating, appears when text is selected) */}
      <AIAssistant />

      {/* Auto-Save Indicator */}
      <AutoSaveIndicator />

      {/* Zoom Controls (floating) */}
      <ZoomControls />

      {/* AI CV Generator (floating) */}
      <AICVGenerator />

      {/* Onboarding Tour */}
      {!tourCompleted && (
        <OnboardingTour onComplete={() => setTourCompleted(true)} />
      )}

      {/* Advanced Properties Panel */}
      <AdvancedPropertiesPanel />
    </div>
  )
}

