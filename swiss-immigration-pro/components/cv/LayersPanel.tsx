'use client'

import { useState, useEffect } from 'react'
import { useCVCanvasStore } from '@/store/cvCanvasStore'
import { Eye, EyeOff, Lock, Unlock, MoveUp, MoveDown, Trash2 } from 'lucide-react'
import { Object as FabricObject, Group } from 'fabric'
import ResizablePanel from './ResizablePanel'

interface LayerItem {
  id: string
  name: string
  type: string
  visible: boolean
  locked: boolean
  object: FabricObject
}

export default function LayersPanel() {
  const { canvas, selectedObject, setSelectedObject } = useCVCanvasStore()
  const [layers, setLayers] = useState<LayerItem[]>([])
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  // Update layers when canvas changes
  useEffect(() => {
    if (!canvas) {
      setLayers([])
      return
    }

    const updateLayers = () => {
      const objects = canvas.getObjects()
      const layerItems: LayerItem[] = []

      objects.forEach((obj, index) => {
        // Skip if object is part of a group (we'll show groups separately)
        // Groups have a 'group' property when they're inside another group
        if ((obj as any).group && !(obj as any).group.type) return

        let name = ''
        let type = obj.type || 'object'

        // Generate name based on object type
        if (obj.type === 'i-text' || obj.type === 'textbox' || obj.type === 'text') {
          const text = (obj as any).text || ''
          name = text.length > 30 ? text.substring(0, 30) + '...' : text || 'Text'
          type = 'text'
        } else if (obj.type === 'rect') {
          name = 'Rectangle'
        } else if (obj.type === 'circle') {
          name = 'Circle'
        } else if (obj.type === 'triangle') {
          name = 'Triangle'
        } else if (obj.type === 'image') {
          name = 'Image'
        } else if (obj.type === 'group') {
          name = `Group (${(obj as Group).getObjects().length} items)`
        } else {
          name = obj.type ? obj.type.charAt(0).toUpperCase() + obj.type.slice(1) : 'Object'
        }

        // Generate unique ID if not present
        if (!(obj as any).id) {
          ;(obj as any).id = `obj-${Date.now()}-${index}`
        }

        layerItems.push({
          id: (obj as any).id,
          name,
          type,
          visible: obj.visible !== false,
          locked: obj.lockMovementX || obj.lockMovementY || false,
          object: obj,
        })
      })

      // Reverse to show top objects first (like Photoshop/Figma)
      setLayers(layerItems.reverse())
    }

    // Initial update
    updateLayers()

    // Listen to canvas events
    const events = [
      'object:added',
      'object:removed',
      'object:modified',
      'selection:created',
      'selection:updated',
      'selection:cleared',
    ]

    events.forEach((event) => {
      canvas.on(event as any, updateLayers)
    })

    return () => {
      events.forEach((event) => {
        canvas.off(event as any, updateLayers)
      })
    }
  }, [canvas])

  const handleSelectLayer = (obj: FabricObject) => {
    if (!canvas) return
    canvas.setActiveObject(obj)
    canvas.renderAll()
    setSelectedObject(obj)
  }

  const handleToggleVisibility = (obj: FabricObject, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!canvas) return

    obj.set('visible', !obj.visible)
    canvas.renderAll()
  }

  const handleToggleLock = (obj: FabricObject, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!canvas) return

    const isLocked = obj.lockMovementX || obj.lockMovementY
    obj.set({
      lockMovementX: !isLocked,
      lockMovementY: !isLocked,
      lockRotation: !isLocked,
      lockScalingX: !isLocked,
      lockScalingY: !isLocked,
    })
    canvas.renderAll()
  }

  const handleBringToFront = (obj: FabricObject, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!canvas) return

    canvas.bringToFront(obj)
    canvas.renderAll()
  }

  const handleSendToBack = (obj: FabricObject, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!canvas) return

    canvas.sendToBack(obj)
    canvas.renderAll()
  }

  const handleDelete = (obj: FabricObject, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!canvas) return

    if (confirm('Delete this object?')) {
      canvas.remove(obj)
      canvas.renderAll()
    }
  }

  if (!canvas) {
    return (
      <ResizablePanel
        position="right"
        defaultWidth={256}
        minWidth={200}
        maxWidth={400}
        title="Layers"
      >
        <div className="p-4">
          <p className="text-sm text-gray-500">Canvas not initialized</p>
        </div>
      </ResizablePanel>
    )
  }

  return (
    <ResizablePanel
      position="right"
      defaultWidth={256}
      minWidth={200}
      maxWidth={400}
      title="Layers"
      headerContent={
        <p className="text-xs text-gray-500 ml-2">{layers.length} objects</p>
      }
    >
      <div className="flex flex-col h-full">
        {/* Layers List */}
        <div className="flex-1 overflow-y-auto p-2">
        {layers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-gray-500">No objects on canvas</p>
          </div>
        ) : (
          <div className="space-y-1">
            {layers.map((layer) => {
              const isSelected = selectedObject === layer.object
              const isGroup = layer.object.type === 'group'

              return (
                <div
                  key={layer.id}
                  onClick={() => handleSelectLayer(layer.object)}
                  className={`p-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      {/* Type Icon */}
                      <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-gray-600">
                          {layer.type === 'text' ? 'T' : layer.type === 'rect' ? 'R' : layer.type === 'circle' ? 'C' : 'O'}
                        </span>
                      </div>

                      {/* Name */}
                      <span className="text-xs font-medium text-gray-900 truncate flex-1">
                        {layer.name}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      {/* Visibility Toggle */}
                      <button
                        onClick={(e) => handleToggleVisibility(layer.object, e)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title={layer.visible ? 'Hide' : 'Show'}
                      >
                        {layer.visible ? (
                          <Eye className="w-3.5 h-3.5 text-gray-600" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>

                      {/* Lock Toggle */}
                      <button
                        onClick={(e) => handleToggleLock(layer.object, e)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title={layer.locked ? 'Unlock' : 'Lock'}
                      >
                        {layer.locked ? (
                          <Lock className="w-3.5 h-3.5 text-gray-600" />
                        ) : (
                          <Unlock className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>

                      {/* Layer Order */}
                      <button
                        onClick={(e) => handleBringToFront(layer.object, e)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title="Bring to Front"
                      >
                        <MoveUp className="w-3.5 h-3.5 text-gray-600" />
                      </button>

                      <button
                        onClick={(e) => handleSendToBack(layer.object, e)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title="Send to Back"
                      >
                        <MoveDown className="w-3.5 h-3.5 text-gray-600" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={(e) => handleDelete(layer.object, e)}
                        className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        </div>
      </div>
    </ResizablePanel>
  )
}

