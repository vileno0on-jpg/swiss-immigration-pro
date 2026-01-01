'use client'

import { useState, useEffect } from 'react'
import { useCVCanvasStore } from '@/store/cvCanvasStore'
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react'

export default function ZoomControls() {
  const { canvas, zoomLevel, zoomIn, zoomOut, resetZoom } = useCVCanvasStore()
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  // Panning with Spacebar + Drag
  useEffect(() => {
    if (!canvas) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default spacebar scrolling
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault()
      }
      if (e.code === 'Space' && !isPanning) {
        setIsPanning(true)
        document.body.style.cursor = 'grab'
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsPanning(false)
        document.body.style.cursor = 'default'
        setPanStart({ x: 0, y: 0 })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      document.body.style.cursor = 'default'
    }
  }, [canvas, isPanning])

  // Handle panning on canvas
  useEffect(() => {
    if (!canvas) return

    const handleMouseDown = (e: MouseEvent) => {
      if (isPanning && e.button === 0) {
        e.preventDefault()
        setPanStart({ x: e.clientX, y: e.clientY })
        document.body.style.cursor = 'grabbing'
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isPanning && panStart.x !== 0 && panStart.y !== 0) {
        e.preventDefault()
        const deltaX = e.clientX - panStart.x
        const deltaY = e.clientY - panStart.y
        
        // Update canvas viewport transform
        const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0]
        vpt[4] += deltaX
        vpt[5] += deltaY
        canvas.setViewportTransform(vpt)
        canvas.renderAll()
        
        setPanStart({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseUp = () => {
      if (isPanning) {
        setPanStart({ x: 0, y: 0 })
        document.body.style.cursor = 'grab'
      }
    }

    if (isPanning) {
      window.addEventListener('mousedown', handleMouseDown, { passive: false })
      window.addEventListener('mousemove', handleMouseMove, { passive: false })
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [canvas, isPanning, panStart])

  return (
    <div className="fixed bottom-6 right-6 bg-white border-2 border-gray-200 rounded-xl shadow-xl p-3 z-50">
      <div className="flex items-center space-x-3">
        {/* Zoom Out */}
        <button
          onClick={zoomOut}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-gray-700" />
        </button>

        {/* Zoom Percentage */}
        <div className="px-4 py-2 bg-blue-50 rounded-lg min-w-[70px] text-center">
          <span className="text-sm font-semibold text-blue-700">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>

        {/* Zoom In */}
        <button
          onClick={zoomIn}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </button>

        {/* Reset Zoom */}
        <button
          onClick={resetZoom}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Reset Zoom (100%)"
        >
          <RotateCw className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Panning Hint */}
      {isPanning && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          Panning mode (Spacebar)
        </div>
      )}
    </div>
  )
}

