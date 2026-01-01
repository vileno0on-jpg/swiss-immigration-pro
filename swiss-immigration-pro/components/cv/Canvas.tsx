'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas as FabricCanvas, Line, Circle } from 'fabric'
import { useCVCanvasStore } from '@/store/cvCanvasStore'

// A4 dimensions at 72 DPI (standard web resolution)
const A4_WIDTH = 595
const A4_HEIGHT = 842

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { 
    canvas,
    setCanvas, 
    setSelectedObject, 
    setCanvasDimensions, 
    zoomLevel,
    saveHistory,
    autoSave,
    loadFromLocalStorage,
    undo,
    redo
  } = useCVCanvasStore()
  
  // Debounce timers
  const historySaveTimer = useRef<NodeJS.Timeout | null>(null)
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null)

  // Calculate base scale to fit canvas in viewport while maintaining A4 aspect ratio
  const calculateBaseScale = () => {
    const container = containerRef.current
    if (!container) return 1

    const parent = container.parentElement
    if (!parent) return 1

    const containerWidth = parent.clientWidth - 40 // padding
    const containerHeight = parent.clientHeight - 40 // padding

    const scaleX = containerWidth / A4_WIDTH
    const scaleY = containerHeight / A4_HEIGHT
    const scale = Math.min(scaleX, scaleY, 1) // Don't scale up beyond 1:1

    return scale
  }

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    // Initialize Fabric.js canvas
    const fabricCanvas = new FabricCanvas(canvasRef.current, {
      width: A4_WIDTH,
      height: A4_HEIGHT,
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true,
    })

    // Set canvas in store
    setCanvas(fabricCanvas)

    // Handle object selection
    fabricCanvas.on('selection:created', (e) => {
      setSelectedObject(e.selected?.[0] || null)
    })

    fabricCanvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected?.[0] || null)
    })

    fabricCanvas.on('selection:cleared', () => {
      setSelectedObject(null)
    })

    // Save history on object modification
    const debouncedSaveHistory = () => {
      if (historySaveTimer.current) {
        clearTimeout(historySaveTimer.current)
      }
      historySaveTimer.current = setTimeout(() => {
        saveHistory()
      }, 500) // Debounce: save 500ms after last change
    }

    // Auto-save to localStorage
    const debouncedAutoSave = () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current)
      }
      autoSaveTimer.current = setTimeout(() => {
        autoSave()
        // Dispatch custom event for indicator
        window.dispatchEvent(new Event('autosave'))
      }, 2000) // Auto-save 2 seconds after last change
    }

    // Handle object modification - save to history and auto-save
    fabricCanvas.on('object:modified', () => {
      fabricCanvas.renderAll()
      debouncedSaveHistory()
      debouncedAutoSave()
    })

    // Handle object added - save to history and auto-save
    fabricCanvas.on('object:added', () => {
      debouncedSaveHistory()
      debouncedAutoSave()
    })

    // Handle object removed - save to history and auto-save
    fabricCanvas.on('object:removed', () => {
      debouncedSaveHistory()
      debouncedAutoSave()
    })

    // Smart Guides & Snap-to-Grid: Handle object moving
    const guideLines: Line[] = []
    
    const clearGuideLines = () => {
      guideLines.forEach(line => {
        try {
          fabricCanvas.remove(line)
        } catch (e) {
          // Line might already be removed
        }
      })
      guideLines.length = 0
    }
    
    fabricCanvas.on('object:moving', (e) => {
      const obj = e.target
      if (!obj) return
      
      const gridSize = 10
      const canvasWidth = A4_WIDTH
      const canvasHeight = A4_HEIGHT
      const centerX = canvasWidth / 2
      const centerY = canvasHeight / 2
      const threshold = 5 // pixels
      
      // Clear previous guide lines
      clearGuideLines()
      
      let snappedX = obj.left || 0
      let snappedY = obj.top || 0
      let showVerticalGuide = false
      let showHorizontalGuide = false
      
      // Check vertical center alignment
      if (Math.abs(snappedX - centerX) < threshold) {
        snappedX = centerX
        showVerticalGuide = true
        
        // Draw vertical guide line
        const guideLine = new Line([centerX, 0, centerX, canvasHeight], {
          stroke: '#FF00FF',
          strokeWidth: 1,
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false,
          excludeFromExport: true,
        })
        fabricCanvas.add(guideLine)
        fabricCanvas.sendToBack(guideLine)
        guideLines.push(guideLine)
      }
      
      // Check horizontal center alignment
      if (Math.abs(snappedY - centerY) < threshold) {
        snappedY = centerY
        showHorizontalGuide = true
        
        // Draw horizontal guide line
        const guideLine = new Line([0, centerY, canvasWidth, centerY], {
          stroke: '#FF00FF',
          strokeWidth: 1,
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false,
          excludeFromExport: true,
        })
        fabricCanvas.add(guideLine)
        fabricCanvas.sendToBack(guideLine)
        guideLines.push(guideLine)
      }
      
      // Snap to grid if not aligned to center
      if (!showVerticalGuide) {
        snappedX = Math.round(snappedX / gridSize) * gridSize
      }
      if (!showHorizontalGuide) {
        snappedY = Math.round(snappedY / gridSize) * gridSize
      }
      
      // Apply snapping
      obj.set({
        left: snappedX,
        top: snappedY,
      })
      
      // Update coordinates for proper rendering
      obj.setCoords()
      fabricCanvas.renderAll()
    })
    
    // Clear guide lines when object stops moving
    fabricCanvas.on('object:modified', () => {
      clearGuideLines()
      fabricCanvas.renderAll()
    })
    
    fabricCanvas.on('selection:cleared', () => {
      clearGuideLines()
      fabricCanvas.renderAll()
    })

    // Calculate initial scale and update dimensions
    const initialScale = calculateBaseScale()
    setCanvasDimensions(A4_WIDTH, A4_HEIGHT, initialScale)

    // Handle window resize
    const handleResize = () => {
      const baseScale = calculateBaseScale()
      setCanvasDimensions(A4_WIDTH, A4_HEIGHT, baseScale)
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial resize

    // Try to load from localStorage first, otherwise save initial state
    const loaded = loadFromLocalStorage()
    if (!loaded) {
      // Save initial empty state to history
      setTimeout(() => {
        saveHistory()
      }, 100)
    }

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Check if user is editing text on canvas (Fabric.js IText)
      const activeObject = fabricCanvas.getActiveObject()
      if (activeObject && (activeObject.type === 'i-text' || activeObject.type === 'textbox')) {
        const textObj = activeObject as any
        // If text object is in editing mode, don't handle shortcuts
        if (textObj.isEditing) {
          return
        }
      }

      // Delete/Backspace - Remove selected object
      if ((e.key === 'Delete' || e.key === 'Backspace') && activeObject) {
        e.preventDefault()
        fabricCanvas.remove(activeObject)
        fabricCanvas.renderAll()
        setSelectedObject(null)
        debouncedSaveHistory()
        debouncedAutoSave()
      }

      // Ctrl/Cmd + C - Copy (store in clipboard state)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && activeObject) {
        e.preventDefault()
        try {
          // Store object JSON in localStorage as clipboard
          const objectJson = activeObject.toObject()
          localStorage.setItem('cv_clipboard', JSON.stringify(objectJson))
        } catch (error) {
          console.error('Error copying object:', error)
        }
      }

      // Ctrl/Cmd + V - Paste (clone from clipboard)
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault()
        try {
          const clipboardData = localStorage.getItem('cv_clipboard')
          if (clipboardData) {
            const objectData = JSON.parse(clipboardData)
            
            // Create a temporary canvas to load the object
            const tempCanvas = new FabricCanvas(document.createElement('canvas'))
            tempCanvas.loadFromJSON({ 
              version: '5.3.0',
              objects: [objectData] 
            }, () => {
              const tempObjects = tempCanvas.getObjects()
              if (tempObjects.length > 0) {
                const clonedObj = tempObjects[0]
                clonedObj.set({
                  left: (clonedObj.left || 100) + 20,
                  top: (clonedObj.top || 100) + 20,
                })
                fabricCanvas.add(clonedObj)
                fabricCanvas.setActiveObject(clonedObj)
                fabricCanvas.renderAll()
                setSelectedObject(clonedObj)
                debouncedSaveHistory()
                debouncedAutoSave()
              }
              tempCanvas.dispose()
            })
          }
        } catch (error) {
          console.error('Error pasting object:', error)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyDown)
      if (historySaveTimer.current) {
        clearTimeout(historySaveTimer.current)
      }
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current)
      }
      fabricCanvas.dispose()
      setCanvas(null)
    }
  }, [setCanvas, setSelectedObject, setCanvasDimensions, saveHistory, autoSave, loadFromLocalStorage])

  // Apply zoom level to canvas container only (the white rounded div)
  useEffect(() => {
    if (containerRef.current) {
      // Only apply CSS transform to the canvas container div
      // This zooms only the canvas container, not the entire page
      containerRef.current.style.transform = `scale(${zoomLevel})`
      containerRef.current.style.transformOrigin = 'center center'
      containerRef.current.style.transition = 'transform 0.2s ease'
    }
  }, [zoomLevel])

  // Handle mouse wheel zoom
  useEffect(() => {
    const container = containerRef.current
    const parentContainer = container?.parentElement
    if (!container || !parentContainer) return

    const handleWheel = (e: WheelEvent) => {
      // Zoom with Ctrl/Cmd + wheel (standard behavior)
      // Or zoom with just wheel when hovering over the canvas area
      const shouldZoom = e.ctrlKey || e.metaKey || true

      if (shouldZoom) {
        e.preventDefault()
        e.stopPropagation()

        const { setZoomLevel, zoomLevel } = useCVCanvasStore.getState()
        
        // Calculate zoom delta
        // deltaY < 0 means scrolling up (zoom in)
        // deltaY > 0 means scrolling down (zoom out)
        const zoomSensitivity = 0.001 // Adjust this to change zoom speed
        const zoomDelta = -e.deltaY * zoomSensitivity
        const newZoom = Math.max(0.25, Math.min(3.0, zoomLevel + zoomDelta))
        
        setZoomLevel(newZoom)
      }
    }

    // Attach to parent container so zoom works anywhere in the canvas area
    parentContainer.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      parentContainer.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50/30 to-white p-6 overflow-auto relative">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />
      
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-gray-200/60"
        style={{
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
          transition: 'transform 0.2s ease',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <canvas ref={canvasRef} />
      </motion.div>
    </div>
  )
}

