'use client'

import { useCVCanvasStore } from '@/store/cvCanvasStore'
import { 
  Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Palette, MoveUp, MoveDown, Trash2, Download, Save, ZoomIn, ZoomOut, RotateCw,
  Undo, Redo, Group, Ungroup, Crop
} from 'lucide-react'
import { IText, Rect, Circle, Triangle, Image as FabricImage, Group as FabricGroup, ActiveSelection, Point } from 'fabric'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Loader2, X } from 'lucide-react'
import { exportCanvasToPDF } from '@/lib/cv/pdfExport'
import { AVAILABLE_FONTS, loadGoogleFont } from '@/lib/utils/fontLoader'

export default function Toolbar() {
  const router = useRouter()
  const { 
    canvas, 
    selectedObject, 
    setSelectedObject, 
    zoomLevel, 
    zoomIn, 
    zoomOut, 
    resetZoom,
    undo,
    redo,
    canUndo,
    canRedo
  } = useCVCanvasStore()
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState('Arial')
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left')
  const [fillColor, setFillColor] = useState('#000000')
  const [fontLoading, setFontLoading] = useState(false)

  const handleExit = () => {
    // Navigate back to tools page
    router.push('/tools')
  }

  // Update toolbar when selection changes
  useEffect(() => {
    if (selectedObject) {
      if (selectedObject.type === 'i-text' || selectedObject.type === 'textbox') {
        const textObj = selectedObject as IText
        setFontSize(textObj.fontSize || 16)
        setFontFamily(textObj.fontFamily || 'Arial')
        setTextAlign((textObj.textAlign as 'left' | 'center' | 'right') || 'left')
        setFillColor(textObj.fill as string || '#000000')
      } else if (selectedObject.type === 'rect' || selectedObject.type === 'circle') {
        setFillColor(selectedObject.fill as string || '#000000')
      }
    }
  }, [selectedObject])

  const updateTextProperty = (property: string, value: any) => {
    if (!canvas || !selectedObject) return

    const activeObjects = canvas.getActiveObjects()
    activeObjects.forEach((obj) => {
      if (obj.type === 'i-text' || obj.type === 'textbox') {
        const textObj = obj as IText
        ;(textObj as any)[property] = value
        textObj.setCoords()
      }
    })
    canvas.renderAll()
    setSelectedObject(activeObjects[0] || null)
  }

  const updateObjectProperty = (property: string, value: any) => {
    if (!canvas || !selectedObject) return

    const activeObjects = canvas.getActiveObjects()
    activeObjects.forEach((obj) => {
      ;(obj as any)[property] = value
      obj.setCoords()
    })
    canvas.renderAll()
    setSelectedObject(activeObjects[0] || null)
  }

  const handleLayerAction = (action: 'bringToFront' | 'sendToBack') => {
    if (!canvas || !selectedObject) return

    const activeObjects = canvas.getActiveObjects()
    activeObjects.forEach((obj) => {
      if (action === 'bringToFront') {
        canvas.bringToFront(obj)
      } else {
        canvas.sendToBack(obj)
      }
    })
    canvas.renderAll()
  }

  const handleDelete = () => {
    if (!canvas || !selectedObject) return
    canvas.remove(selectedObject)
    canvas.renderAll()
    setSelectedObject(null)
  }

  const handleGroup = () => {
    if (!canvas) return

    const activeObjects = canvas.getActiveObjects()
    if (activeObjects.length < 2) return

    // Create a group from active selection
    const group = new FabricGroup(activeObjects, {
      left: (activeObjects[0] as any).left,
      top: (activeObjects[0] as any).top,
    })

    // Remove individual objects
    activeObjects.forEach((obj) => canvas.remove(obj))

    // Add group
    canvas.add(group)
    canvas.setActiveObject(group)
    canvas.renderAll()
    setSelectedObject(group)
  }

  const handleUngroup = () => {
    if (!canvas || !selectedObject) return

    if (selectedObject.type === 'group') {
      const group = selectedObject as FabricGroup
      const objects = group.getObjects()

      // Remove group
      canvas.remove(group)

      // Add individual objects back
      objects.forEach((obj) => {
        obj.set({
          left: (obj.left || 0) + (group.left || 0),
          top: (obj.top || 0) + (group.top || 0),
        })
        canvas.add(obj)
      })

      canvas.renderAll()
      setSelectedObject(null)
    }
  }

  const handleCropToCircle = () => {
    if (!canvas || !selectedObject) return

    if (selectedObject.type === 'image') {
      const img = selectedObject as FabricImage
      const size = Math.min(img.width || 200, img.height || 200)
      
      // Create circular clipPath
      const circle = new Circle({
        radius: size / 2,
        originX: 'center',
        originY: 'center',
      })

      img.set({
        clipPath: circle,
      })
      
      img.setCoords()
      canvas.renderAll()
    }
  }

  const isImageSelected = selectedObject && selectedObject.type === 'image'

  // Check if multiple objects are selected
  const activeObjects = canvas ? canvas.getActiveObjects() : []
  const hasMultipleSelection = activeObjects.length > 1
  const isGroupSelected = selectedObject && selectedObject.type === 'group'

  // Render based on selection type
  const renderContent = () => {
    if (!selectedObject) {
      // No selection - show canvas background options
      return (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2.5">
            <Palette className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Canvas Background</span>
          </div>
          <input
            type="color"
            value={canvas?.backgroundColor as string || '#ffffff'}
            onChange={(e) => {
              if (canvas) {
                canvas.setBackgroundColor(e.target.value, canvas.renderAll.bind(canvas))
              }
            }}
            className="w-11 h-11 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors shadow-sm"
          />
        </div>
      )
    }

    if (selectedObject.type === 'i-text' || selectedObject.type === 'textbox') {
      // Text object selected - show text formatting options
      return (
        <div className="flex items-center space-x-6">
          {/* Font Family */}
          <select
            value={fontFamily}
            onChange={async (e) => {
              const newFont = e.target.value
              setFontFamily(newFont)
              
              // Check if it's a Google Font
              const isGoogleFont = AVAILABLE_FONTS.some(f => f.value === newFont)
              if (isGoogleFont) {
                setFontLoading(true)
                try {
                  await loadGoogleFont(newFont)
                  updateTextProperty('fontFamily', newFont)
                } catch (error) {
                  console.error('Error loading font:', error)
                } finally {
                  setFontLoading(false)
                }
              } else {
                updateTextProperty('fontFamily', newFont)
              }
            }}
            disabled={fontLoading}
            className="px-3.5 py-2 border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 bg-white shadow-sm hover:border-gray-300 transition-colors"
          >
            <optgroup label="System Fonts">
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </optgroup>
            <optgroup label="Google Fonts">
              {AVAILABLE_FONTS.map(font => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </optgroup>
          </select>
          {fontLoading && (
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          )}

          {/* Font Size */}
          <div className="flex items-center space-x-2.5">
            <Type className="w-4 h-4 text-gray-600" />
            <input
              type="number"
              value={fontSize}
              onChange={(e) => {
                const size = parseInt(e.target.value) || 16
                setFontSize(size)
                updateTextProperty('fontSize', size)
              }}
              className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm hover:border-gray-300 transition-colors"
              min="8"
              max="72"
            />
          </div>

          {/* Text Style */}
          <div className="flex items-center space-x-1.5 bg-gray-50 rounded-xl p-1">
            <button
              onClick={() => {
                const textObj = selectedObject as fabric.IText
                updateTextProperty('fontWeight', textObj.fontWeight === 'bold' ? 'normal' : 'bold')
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                (selectedObject as fabric.IText).fontWeight === 'bold'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'hover:bg-white/50 text-gray-700'
              }`}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const textObj = selectedObject as fabric.IText
                updateTextProperty('fontStyle', textObj.fontStyle === 'italic' ? 'normal' : 'italic')
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                (selectedObject as fabric.IText).fontStyle === 'italic'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'hover:bg-white/50 text-gray-700'
              }`}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const textObj = selectedObject as fabric.IText
                updateTextProperty('underline', !textObj.underline)
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                (selectedObject as fabric.IText).underline
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'hover:bg-white/50 text-gray-700'
              }`}
              title="Underline"
            >
              <Underline className="w-4 h-4" />
            </button>
          </div>

          {/* Text Alignment */}
          <div className="flex items-center space-x-1.5 border-l border-gray-200 pl-5 bg-gray-50 rounded-xl p-1">
            <button
              onClick={() => {
                setTextAlign('left')
                updateTextProperty('textAlign', 'left')
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                textAlign === 'left' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'hover:bg-white/50 text-gray-700'
              }`}
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setTextAlign('center')
                updateTextProperty('textAlign', 'center')
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                textAlign === 'center' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'hover:bg-white/50 text-gray-700'
              }`}
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setTextAlign('right')
                updateTextProperty('textAlign', 'right')
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                textAlign === 'right' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'hover:bg-white/50 text-gray-700'
              }`}
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>

          {/* Text Color */}
          <div className="flex items-center space-x-2.5 border-l border-gray-200 pl-5">
            <Palette className="w-4 h-4 text-gray-600" />
            <input
              type="color"
              value={fillColor}
              onChange={(e) => {
                setFillColor(e.target.value)
                updateTextProperty('fill', e.target.value)
              }}
              className="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors shadow-sm"
            />
          </div>
        </div>
      )
    }

    // Shape or other object selected - show shape options
    return (
      <div className="flex items-center space-x-6">
        {/* Fill Color */}
        <div className="flex items-center space-x-2.5">
          <Palette className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">Fill</span>
          <input
            type="color"
            value={fillColor}
            onChange={(e) => {
              setFillColor(e.target.value)
              updateObjectProperty('fill', e.target.value)
            }}
            className="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors shadow-sm"
          />
        </div>

        {/* Stroke Color */}
        <div className="flex items-center space-x-2.5">
          <span className="text-sm font-semibold text-gray-700">Stroke</span>
          <input
            type="color"
            value={(selectedObject.stroke as string) || '#000000'}
            onChange={(e) => {
              updateObjectProperty('stroke', e.target.value)
            }}
            className="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors shadow-sm"
          />
        </div>
      </div>
    )
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Ctrl/Cmd + Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }
      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if ((e.ctrlKey || e.metaKey) && ((e.shiftKey && e.key === 'z') || e.key === 'y')) {
        e.preventDefault()
        redo()
      }
      // Ctrl/Cmd + Plus for zoom in
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault()
        zoomIn()
      }
      // Ctrl/Cmd + Minus for zoom out
      if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault()
        zoomOut()
      }
      // Ctrl/Cmd + 0 for reset zoom
      if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault()
        resetZoom()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [zoomIn, zoomOut, resetZoom, undo, redo])

  return (
    <div className="h-16 bg-white/98 backdrop-blur-md border-b border-gray-200/60 px-6 flex items-center justify-between shadow-sm shadow-gray-900/5">
      <div className="flex items-center space-x-5">
        {/* Exit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExit}
          className="p-2.5 hover:bg-red-50 rounded-lg transition-all duration-200 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300"
          title="Exit CV Editor"
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Undo/Redo Controls */}
        <div className="flex items-center space-x-1.5 border-r border-gray-200/60 pr-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={undo}
            disabled={!canUndo()}
            className="p-2.5 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed group"
            title="Undo (Ctrl/Cmd + Z)"
          >
            <Undo className="w-4 h-4 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={redo}
            disabled={!canRedo()}
            className="p-2.5 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed group"
            title="Redo (Ctrl/Cmd + Shift + Z)"
          >
            <Redo className="w-4 h-4 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </motion.button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-2.5 border-r border-gray-200/60 pr-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={zoomOut}
            className="p-2.5 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all duration-200 group"
            title="Zoom Out (Ctrl/Cmd + -)"
          >
            <ZoomOut className="w-4 h-4 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </motion.button>
          <motion.div
            initial={false}
            animate={{ scale: zoomLevel !== 1 ? [1, 1.1, 1] : 1 }}
            className="px-4 py-1.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl min-w-[70px] text-center border border-blue-200/60 shadow-sm"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {Math.round(zoomLevel * 100)}%
            </span>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={zoomIn}
            className="p-2.5 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all duration-200 group"
            title="Zoom In (Ctrl/Cmd + +)"
          >
            <ZoomIn className="w-4 h-4 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetZoom}
            className="p-2.5 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all duration-200 ml-1 group"
            title="Reset Zoom (Ctrl/Cmd + 0)"
          >
            <RotateCw className="w-4 h-4 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </motion.button>
        </div>

        {renderContent()}
      </div>

      <div className="flex items-center space-x-2">
        {/* Grouping */}
        {hasMultipleSelection && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGroup}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-blue-500/30"
            title="Group Selected Objects"
          >
            <Group className="w-4 h-4" />
            <span>Group</span>
          </motion.button>
        )}

        {isGroupSelected && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUngroup}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-blue-500/30"
            title="Ungroup"
          >
            <Ungroup className="w-4 h-4" />
            <span>Ungroup</span>
          </motion.button>
        )}

        {/* Image Tools */}
        {isImageSelected && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCropToCircle}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-blue-500/30"
            title="Crop to Circle"
          >
            <Crop className="w-4 h-4" />
            <span>Crop to Circle</span>
          </motion.button>
        )}

        {/* Layer Management */}
        {selectedObject && !isGroupSelected && (
          <div className="flex items-center space-x-1.5 bg-gray-50 rounded-xl p-1">
            <button
              onClick={() => handleLayerAction('bringToFront')}
              className="p-2.5 hover:bg-white rounded-lg transition-all duration-200 group"
              title="Bring to Front"
            >
              <MoveUp className="w-4 h-4 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </button>
            <button
              onClick={() => handleLayerAction('sendToBack')}
              className="p-2.5 hover:bg-white rounded-lg transition-all duration-200 group"
              title="Send to Back"
            >
              <MoveDown className="w-4 h-4 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2.5 hover:bg-red-50 rounded-lg transition-all duration-200 group"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-gray-700 group-hover:text-red-600 transition-colors" />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="border-l border-gray-200 pl-5 ml-3 flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={async () => {
              // Check if user is logged in first
              const response = await fetch('/api/auth/session')
              const session = await response.json()
              
              if (!session?.user?.id) {
                const shouldLogin = confirm('You need to log in to save your CV. Would you like to log in now?')
                if (shouldLogin) {
                  window.location.href = '/auth/login?redirect=/tools/cv-editor'
                }
                return
              }
              
              // Trigger save dialog in SavedCVsPanel
              const event = new CustomEvent('openSaveDialog')
              window.dispatchEvent(event)
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-blue-500/30"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={async () => {
              if (canvas) {
                try {
                  await exportCanvasToPDF(canvas, 'my-cv.pdf')
                } catch (error) {
                  console.error('Error exporting PDF:', error)
                  alert('Failed to export PDF. Please try again.')
                }
              }
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-emerald-500/30"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

