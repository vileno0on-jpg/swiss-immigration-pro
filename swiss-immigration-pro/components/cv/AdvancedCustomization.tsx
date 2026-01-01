'use client'

import { useState } from 'react'
import { 
  Palette, Type, Layout, Spacing, Image, Eye, EyeOff, 
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline,
  Minus, Plus, RotateCw, Grid, Columns, Rows
} from 'lucide-react'
import { CVData } from '@/types/cv'
import { getTemplateById } from '@/lib/cv/templates'

interface AdvancedCustomizationProps {
  cvData: CVData
  onUpdate: (updates: Partial<CVData>) => void
}

export default function AdvancedCustomization({ cvData, onUpdate }: AdvancedCustomizationProps) {
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'layout' | 'spacing' | 'advanced'>('colors')
  const template = getTemplateById(cvData.templateId)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-blue-500 rounded-full mr-3"></div>
          Advanced Customization
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b-2 border-blue-100 overflow-x-auto">
        {[
          { id: 'colors', label: 'Colors', icon: Palette },
          { id: 'fonts', label: 'Typography', icon: Type },
          { id: 'layout', label: 'Layout', icon: Layout },
          { id: 'spacing', label: 'Spacing', icon: Spacing },
          { id: 'advanced', label: 'Advanced', icon: Grid }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-300 font-medium whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 bg-blue-50 rounded-t-lg'
                : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-t-lg'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Advanced Options */}
      {activeTab === 'advanced' && (
        <div className="space-y-6">
          {/* Text Alignment */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">Text Alignment</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'left', icon: AlignLeft, label: 'Left' },
                { id: 'center', icon: AlignCenter, label: 'Center' },
                { id: 'right', icon: AlignRight, label: 'Right' }
              ].map(align => (
                <button
                  key={align.id}
                  className="p-4 rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 flex flex-col items-center space-y-2"
                >
                  <align.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">{align.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column Layout */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">Column Layout</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'single', icon: Columns, label: 'Single Column' },
                { id: 'two', icon: Grid, label: 'Two Columns' }
              ].map(layout => (
                <button
                  key={layout.id}
                  className="p-4 rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 flex flex-col items-center space-y-2"
                >
                  <layout.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">{layout.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Border Options */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">Section Borders</label>
            <div className="space-y-3">
              {[
                { id: 'none', label: 'No Borders' },
                { id: 'thin', label: 'Thin Borders' },
                { id: 'medium', label: 'Medium Borders' },
                { id: 'thick', label: 'Thick Borders' }
              ].map(border => (
                <button
                  key={border.id}
                  className="w-full p-3 rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-left transition-all duration-300"
                >
                  <span className="text-sm font-medium text-gray-700">{border.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Shadow Options */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">Shadow Style</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'none', label: 'None' },
                { id: 'soft', label: 'Soft' },
                { id: 'medium', label: 'Medium' },
                { id: 'strong', label: 'Strong' }
              ].map(shadow => (
                <button
                  key={shadow.id}
                  className="p-3 rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 text-sm font-medium text-gray-700"
                >
                  {shadow.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button className="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 rounded-xl font-semibold transition-all duration-300 border-2 border-gray-200 flex items-center justify-center space-x-2">
            <RotateCw className="w-4 h-4" />
            <span>Reset to Default</span>
          </button>
        </div>
      )}

      {/* Spacing Options */}
      {activeTab === 'spacing' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">Section Spacing</label>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Between Sections</span>
                  <span className="text-xs font-semibold text-blue-600">24px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="48"
                  step="4"
                  defaultValue="24"
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Within Sections</span>
                  <span className="text-xs font-semibold text-blue-600">16px</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="32"
                  step="4"
                  defaultValue="16"
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Padding</span>
                  <span className="text-xs font-semibold text-blue-600">32px</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="64"
                  step="8"
                  defaultValue="32"
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Quick Spacing Presets */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">Quick Presets</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'compact', label: 'Compact', icon: Minus },
                { id: 'normal', label: 'Normal', icon: Spacing },
                { id: 'spacious', label: 'Spacious', icon: Plus }
              ].map(preset => (
                <button
                  key={preset.id}
                  className="p-3 rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 flex flex-col items-center space-y-1"
                >
                  <preset.icon className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}





