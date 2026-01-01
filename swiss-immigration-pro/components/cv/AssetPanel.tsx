'use client'

import { useState, useEffect } from 'react'
import { useCVCanvasStore } from '@/store/cvCanvasStore'
import { Search, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Image as FabricImage } from 'fabric'

// Mock Unsplash API function (replace with real API key if available)
async function searchUnsplashImages(query: string): Promise<Array<{ id: string; url: string; thumb: string; description: string }>> {
  // Mock implementation - returns placeholder images
  // In production, replace with actual Unsplash API call
  
  const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || ''
  
  if (!UNSPLASH_ACCESS_KEY) {
    // Return placeholder images from placeholder services
    return new Promise((resolve) => {
      setTimeout(() => {
        const placeholders = [
          {
            id: '1',
            url: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop`,
            thumb: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop`,
            description: 'Professional portrait'
          },
          {
            id: '2',
            url: `https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=600&fit=crop`,
            thumb: `https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop`,
            description: 'Business professional'
          },
          {
            id: '3',
            url: `https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop`,
            thumb: `https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop`,
            description: 'Office environment'
          },
          {
            id: '4',
            url: `https://images.unsplash.com/photo-1556155092-4903d8e4c3b0?w=800&h=600&fit=crop`,
            thumb: `https://images.unsplash.com/photo-1556155092-4903d8e4c3b0?w=200&h=200&fit=crop`,
            description: 'Professional woman'
          },
          {
            id: '5',
            url: `https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop`,
            thumb: `https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop`,
            description: 'Business meeting'
          },
          {
            id: '6',
            url: `https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop`,
            thumb: `https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=200&fit=crop`,
            description: 'Team collaboration'
          },
        ]
        resolve(placeholders)
      }, 500)
    })
  }

  // Real Unsplash API call (if key is provided)
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&client_id=${UNSPLASH_ACCESS_KEY}`
    )
    const data = await response.json()
    
    return data.results.map((photo: any) => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      description: photo.description || photo.alt_description || '',
    }))
  } catch (error) {
    console.error('Unsplash API error:', error)
    // Fallback to placeholders
    return searchUnsplashImages('') // Recursive call with empty query for placeholders
  }
}

export default function AssetPanel() {
  const { canvas } = useCVCanvasStore()
  const [searchQuery, setSearchQuery] = useState('professional')
  const [images, setImages] = useState<Array<{ id: string; url: string; thumb: string; description: string }>>([])
  const [loading, setLoading] = useState(false)
  const [draggedImage, setDraggedImage] = useState<string | null>(null)

  // Load initial images
  useEffect(() => {
    handleSearch('professional')
  }, [])

  const handleSearch = async (query: string = searchQuery) => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const results = await searchUnsplashImages(query)
      setImages(results)
    } catch (error) {
      console.error('Error searching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageDragStart = (e: React.DragEvent, imageUrl: string) => {
    setDraggedImage(imageUrl)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleImageDragEnd = () => {
    setDraggedImage(null)
  }

  const addImageToCanvas = async (imageUrl: string, x?: number, y?: number) => {
    if (!canvas) return

    try {
      // Load image with CORS handling
      FabricImage.fromURL(
        imageUrl,
        {
          crossOrigin: 'anonymous',
          left: x || 100,
          top: y || 100,
          scaleX: 0.5,
          scaleY: 0.5,
        },
        (img) => {
          canvas.add(img)
          canvas.setActiveObject(img)
          canvas.renderAll()
        }
      )
    } catch (error) {
      console.error('Error adding image to canvas:', error)
      alert('Failed to load image. Please try another image.')
    }
  }

  const handleImageClick = (imageUrl: string) => {
    addImageToCanvas(imageUrl)
  }

  // Handle drop on canvas
  useEffect(() => {
    if (!canvas) return

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      const imageUrl = draggedImage
      if (!imageUrl) return

      // Get drop coordinates relative to canvas
      const canvasElement = canvas.getElement()
      const rect = canvasElement.getBoundingClientRect()
      
      // Convert to canvas coordinates (accounting for zoom/scale)
      const pointer = canvas.getPointer({ x: e.clientX, y: e.clientY } as any)
      
      addImageToCanvas(imageUrl, pointer.x, pointer.y)
      setDraggedImage(null)
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.dataTransfer!.dropEffect = 'copy'
    }

    const canvasElement = canvas.getElement()
    canvasElement.addEventListener('drop', handleDrop)
    canvasElement.addEventListener('dragover', handleDragOver)

    return () => {
      canvasElement.removeEventListener('drop', handleDrop)
      canvasElement.removeEventListener('dragover', handleDragOver)
    }
  }, [canvas, draggedImage])

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
          <ImageIcon className="w-5 h-5 mr-2 text-blue-600" />
          Photos
        </h3>
        
        {/* Search Bar */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
            placeholder="Search images..."
            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && images.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No images found</p>
            <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {images.map((image) => (
              <div
                key={image.id}
                draggable
                onDragStart={(e) => handleImageDragStart(e, image.url)}
                onDragEnd={handleImageDragEnd}
                onClick={() => handleImageClick(image.url)}
                className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-move hover:ring-2 hover:ring-blue-500 transition-all"
              >
                <img
                  src={image.thumb}
                  alt={image.description}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-lg px-2 py-1 text-xs font-medium text-gray-900">
                      Drag to canvas
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          Drag images to canvas or click to add
        </p>
      </div>
    </div>
  )
}

