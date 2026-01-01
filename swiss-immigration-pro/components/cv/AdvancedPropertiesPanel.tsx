'use client'

import { useState, useEffect } from 'react'
import { useCVCanvasStore } from '@/store/cvCanvasStore'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, Layers, Cloud, Eye, Square, 
  RotateCw, FlipHorizontal, FlipVertical,
  CornerDownRight, Settings2
} from 'lucide-react'

export default function AdvancedPropertiesPanel() {
  const { canvas, selectedObject, setSelectedObject } = useCVCanvasStore()
  const [isOpen, setIsOpen] = useState(false)
  const [properties, setProperties] = useState({
    opacity: 1,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: '#000000',
    strokeWidth: 0,
    strokeColor: '#000000',
    cornerRadius: 0,
    angle: 0,
    scaleX: 1,
    scaleY: 1,
    padding: 0,
    margin: 0,
  })

  useEffect(() => {
    if (selectedObject) {
      setProperties({
        opacity: (selectedObject.opacity ?? 1) * 100,
        shadowBlur: (selectedObject.shadow as any)?.blur || 0,
        shadowOffsetX: (selectedObject.shadow as any)?.offsetX || 0,
        shadowOffsetY: (selectedObject.shadow as any)?.offsetY || 0,
        shadowColor: (selectedObject.shadow as any)?.color || '#000000',
        strokeWidth: selectedObject.strokeWidth || 0,
        strokeColor: (selectedObject.stroke as string) || '#000000',
        cornerRadius: (selectedObject as any).rx || 0,
        angle: selectedObject.angle || 0,
        scaleX: selectedObject.scaleX || 1,
        scaleY: selectedObject.scaleY || 1,
        padding: 0,
        margin: 0,
      })
    }
  }, [selectedObject])

  const updateProperty = (property: string, value: any) => {
    if (!canvas || !selectedObject) return

    const activeObjects = canvas.getActiveObjects()
    activeObjects.forEach((obj) => {
      if (property === 'opacity') {
        obj.set({ opacity: value / 100 })
      } else if (property === 'shadowBlur') {
        obj.set({
          shadow: {
            ...((obj.shadow as any) || {}),
            blur: value,
            offsetX: properties.shadowOffsetX,
            offsetY: properties.shadowOffsetY,
            color: properties.shadowColor,
          },
        })
      } else if (property === 'shadowOffsetX') {
        obj.set({
          shadow: {
            ...((obj.shadow as any) || {}),
            blur: properties.shadowBlur,
            offsetX: value,
            offsetY: properties.shadowOffsetY,
            color: properties.shadowColor,
          },
        })
      } else if (property === 'shadowOffsetY') {
        obj.set({
          shadow: {
            ...((obj.shadow as any) || {}),
            blur: properties.shadowBlur,
            offsetX: properties.shadowOffsetX,
            offsetY: value,
            color: properties.shadowColor,
          },
        })
      } else if (property === 'shadowColor') {
        obj.set({
          shadow: {
            ...((obj.shadow as any) || {}),
            blur: properties.shadowBlur,
            offsetX: properties.shadowOffsetX,
            offsetY: properties.shadowOffsetY,
            color: value,
          },
        })
      } else if (property === 'cornerRadius' && (obj.type === 'rect' || obj.type === 'group')) {
        obj.set({ rx: value, ry: value })
      } else {
        ;(obj as any)[property] = value
      }
      obj.setCoords()
    })
    canvas.renderAll()
    setSelectedObject(activeObjects[0] || null)
    setProperties((prev) => ({ ...prev, [property]: value }))
  }

  if (!selectedObject) return null

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-gradient-to-br from-blue-600 to-green-600 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all"
      >
        <Settings2 className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <h3 className="font-bold text-lg flex items-center space-x-2">
                <Settings2 className="w-5 h-5" />
                <span>Advanced Properties</span>
              </h3>
            </div>

            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
              {/* Opacity */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Eye className="w-4 h-4" />
                  <span>Opacity</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={properties.opacity}
                    onChange={(e) => updateProperty('opacity', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium text-gray-600 w-12 text-right">
                    {Math.round(properties.opacity)}%
                  </span>
                </div>
              </div>

              {/* Shadow */}
              <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Cloud className="w-4 h-4" />
                  <span>Shadow</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-600 w-20">Blur</span>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={properties.shadowBlur}
                      onChange={(e) => updateProperty('shadowBlur', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-600 w-8">{properties.shadowBlur}px</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-600 w-20">X</span>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      value={properties.shadowOffsetX}
                      onChange={(e) => updateProperty('shadowOffsetX', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-600 w-8">{properties.shadowOffsetX}px</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-600 w-20">Y</span>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      value={properties.shadowOffsetY}
                      onChange={(e) => updateProperty('shadowOffsetY', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-600 w-8">{properties.shadowOffsetY}px</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600 w-20">Color</span>
                    <input
                      type="color"
                      value={properties.shadowColor}
                      onChange={(e) => updateProperty('shadowColor', e.target.value)}
                      className="w-10 h-8 rounded border border-gray-300 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Border/Stroke */}
              <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Square className="w-4 h-4" />
                  <span>Border</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-600 w-20">Width</span>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={properties.strokeWidth}
                      onChange={(e) => updateProperty('strokeWidth', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-600 w-8">{properties.strokeWidth}px</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600 w-20">Color</span>
                    <input
                      type="color"
                      value={properties.strokeColor}
                      onChange={(e) => updateProperty('strokeColor', e.target.value)}
                      className="w-10 h-8 rounded border border-gray-300 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Corner Radius */}
              {(selectedObject.type === 'rect' || selectedObject.type === 'group') && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <CornerDownRight className="w-4 h-4" />
                    <span>Corner Radius</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={properties.cornerRadius}
                      onChange={(e) => updateProperty('cornerRadius', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-gray-600 w-12 text-right">
                      {properties.cornerRadius}px
                    </span>
                  </div>
                </div>
              )}

              {/* Transform */}
              <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <RotateCw className="w-4 h-4" />
                  <span>Transform</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-600 w-20">Rotation</span>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={properties.angle}
                      onChange={(e) => updateProperty('angle', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-600 w-12">{properties.angle}°</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-600 w-20">Scale X</span>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={properties.scaleX}
                      onChange={(e) => updateProperty('scaleX', parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-600 w-12">{properties.scaleX.toFixed(1)}x</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-600 w-20">Scale Y</span>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={properties.scaleY}
                      onChange={(e) => updateProperty('scaleY', parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-600 w-12">{properties.scaleY.toFixed(1)}x</span>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      onClick={() => {
                        updateProperty('scaleX', -properties.scaleX)
                        updateProperty('scaleY', properties.scaleY)
                      }}
                      className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <FlipHorizontal className="w-3 h-3" />
                      <span>Flip H</span>
                    </button>
                    <button
                      onClick={() => {
                        updateProperty('scaleX', properties.scaleX)
                        updateProperty('scaleY', -properties.scaleY)
                      }}
                      className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <FlipVertical className="w-3 h-3" />
                      <span>Flip V</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

