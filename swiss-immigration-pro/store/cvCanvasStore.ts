import { create } from 'zustand'
import { Canvas as FabricCanvas, Object as FabricObject } from 'fabric'

interface CVCanvasStore {
  // Fabric.js canvas instance
  canvas: FabricCanvas | null
  
  // Currently selected object on canvas
  selectedObject: FabricObject | null
  
  // Active sidebar tab
  activeTab: 'templates' | 'text' | 'shapes' | 'photos' | 'uploads'
  
  // Canvas dimensions (A4 aspect ratio: 595x842 at 72 DPI)
  canvasWidth: number
  canvasHeight: number
  scale: number
  
  // Zoom level (1.0 = 100%, 0.5 = 50%, 2.0 = 200%)
  zoomLevel: number
  
  // Undo/Redo History
  history: string[] // Array of canvas JSON strings
  historyIndex: number // Current position in history
  
  // Actions
  setCanvas: (canvas: FabricCanvas | null) => void
  setSelectedObject: (obj: FabricObject | null) => void
  setActiveTab: (tab: 'templates' | 'text' | 'shapes' | 'uploads') => void
  setCanvasDimensions: (width: number, height: number, scale: number) => void
  setZoomLevel: (level: number) => void
  zoomIn: () => void
  zoomOut: () => void
  resetZoom: () => void
  clearCanvas: () => void
  loadTemplate: (templateJson: string) => void
  saveHistory: () => void
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
  autoSave: () => void
  loadFromLocalStorage: () => void
}

export const useCVCanvasStore = create<CVCanvasStore>((set, get) => ({
  // Initial state
  canvas: null,
  selectedObject: null,
  activeTab: 'templates',
  canvasWidth: 595,
  canvasHeight: 842,
  scale: 1,
  zoomLevel: 1,
  history: [],
  historyIndex: -1,
  
  // Actions
  setCanvas: (canvas) => set({ canvas }),
  
  setSelectedObject: (obj) => set({ selectedObject: obj }),
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  setCanvasDimensions: (width, height, scale) => 
    set({ canvasWidth: width, canvasHeight: height, scale }),
  
  setZoomLevel: (level) => {
    const minZoom = 0.25 // 25% minimum
    const maxZoom = 3.0  // 300% maximum
    const clampedLevel = Math.max(minZoom, Math.min(maxZoom, level))
    set({ zoomLevel: clampedLevel })
  },
  
  zoomIn: () => {
    const { zoomLevel } = get()
    const newZoom = Math.min(zoomLevel + 0.25, 3.0) // Increase by 25%, max 300%
    set({ zoomLevel: newZoom })
  },
  
  zoomOut: () => {
    const { zoomLevel } = get()
    const newZoom = Math.max(zoomLevel - 0.25, 0.25) // Decrease by 25%, min 25%
    set({ zoomLevel: newZoom })
  },
  
  resetZoom: () => {
    set({ zoomLevel: 1 })
  },
  
  clearCanvas: () => {
    const { canvas } = get()
    if (canvas) {
      canvas.clear()
      canvas.backgroundColor = '#ffffff'
      set({ selectedObject: null })
    }
  },
  
  loadTemplate: (templateJson) => {
    const { canvas } = get()
    if (canvas) {
      canvas.loadFromJSON(templateJson, () => {
        canvas.renderAll()
        set({ selectedObject: null })
        // Save initial state after loading template
        get().saveHistory()
      })
    }
  },
  
  saveHistory: () => {
    const { canvas, history, historyIndex } = get()
    if (!canvas) return
    
    try {
      const canvasJson = JSON.stringify(canvas.toJSON())
      
      // Remove any history after current index (when user makes new change after undo)
      const newHistory = history.slice(0, historyIndex + 1)
      
      // Add new state
      newHistory.push(canvasJson)
      
      // Limit history to 50 states to prevent memory issues
      const maxHistory = 50
      if (newHistory.length > maxHistory) {
        newHistory.shift()
      } else {
        set({ historyIndex: newHistory.length - 1 })
      }
      
      set({ history: newHistory })
    } catch (error) {
      console.error('Error saving history:', error)
    }
  },
  
  undo: () => {
    const { canvas, history, historyIndex } = get()
    if (!canvas || historyIndex <= 0) return
    
    try {
      const newIndex = historyIndex - 1
      const previousState = history[newIndex]
      
      if (previousState) {
        canvas.loadFromJSON(previousState, () => {
          canvas.renderAll()
          set({ selectedObject: null, historyIndex: newIndex })
        })
      }
    } catch (error) {
      console.error('Error undoing:', error)
    }
  },
  
  redo: () => {
    const { canvas, history, historyIndex } = get()
    if (!canvas || historyIndex >= history.length - 1) return
    
    try {
      const newIndex = historyIndex + 1
      const nextState = history[newIndex]
      
      if (nextState) {
        canvas.loadFromJSON(nextState, () => {
          canvas.renderAll()
          set({ selectedObject: null, historyIndex: newIndex })
        })
      }
    } catch (error) {
      console.error('Error redoing:', error)
    }
  },
  
  canUndo: () => {
    const { historyIndex } = get()
    return historyIndex > 0
  },
  
  canRedo: () => {
    const { history, historyIndex } = get()
    return historyIndex < history.length - 1
  },
  
  autoSave: () => {
    const { canvas } = get()
    if (!canvas) return
    
    try {
      const canvasJson = canvas.toJSON()
      const jsonString = JSON.stringify(canvasJson)
      localStorage.setItem('cv_draft', jsonString)
      localStorage.setItem('cv_draft_timestamp', new Date().toISOString())
    } catch (error) {
      console.error('Error auto-saving to localStorage:', error)
    }
  },
  
  loadFromLocalStorage: () => {
    const { canvas } = get()
    if (!canvas) return false
    
    try {
      const savedDraft = localStorage.getItem('cv_draft')
      if (savedDraft) {
        const canvasData = JSON.parse(savedDraft)
        canvas.loadFromJSON(canvasData, () => {
          canvas.renderAll()
          set({ selectedObject: null })
          // Save to history after loading
          get().saveHistory()
        })
        return true
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
    return false
  },
}))

