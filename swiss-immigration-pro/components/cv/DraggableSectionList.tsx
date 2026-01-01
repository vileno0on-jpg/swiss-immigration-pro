'use client'

import { useState } from 'react'
import { GripVertical, Eye, EyeOff, Trash2 } from 'lucide-react'
import { motion, Reorder } from 'framer-motion'

interface Section {
  id: string
  label: string
  icon: string
  visible: boolean
}

interface DraggableSectionListProps {
  sections: Section[]
  onReorder: (sections: Section[]) => void
  onToggleVisibility: (id: string) => void
  onRemove?: (id: string) => void
  activeSection?: string
  onSelectSection: (id: string) => void
}

export default function DraggableSectionList({
  sections,
  onReorder,
  onToggleVisibility,
  onRemove,
  activeSection,
  onSelectSection
}: DraggableSectionListProps) {
  const [items, setItems] = useState(sections)

  const handleReorder = (newOrder: Section[]) => {
    setItems(newOrder)
    onReorder(newOrder)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Section Order
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Drag to reorder sections on your CV
      </p>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="space-y-2"
      >
        {items.map((section) => (
          <Reorder.Item
            key={section.id}
            value={section}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-grab active:cursor-grabbing" />
              <span className="mr-2">{section.icon}</span>
              <button
                onClick={() => onSelectSection(section.id)}
                className={`flex-1 text-left font-medium ${
                  activeSection === section.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                {section.label}
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleVisibility(section.id)}
                className={`p-2 rounded-lg transition-colors ${
                  section.visible
                    ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                title={section.visible ? 'Hide section' : 'Show section'}
              >
                {section.visible ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
              {onRemove && (
                <button
                  onClick={() => onRemove(section.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Remove section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          💡 Tip: Sections at the top appear first on your CV. Hidden sections won't be included in exports.
        </p>
      </div>
    </div>
  )
}





