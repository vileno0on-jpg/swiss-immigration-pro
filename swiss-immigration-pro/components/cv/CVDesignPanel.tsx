'use client'

import { useState } from 'react'
import { Palette, Type, Layout, List, Image, Eye, EyeOff } from 'lucide-react'
import { CVData, CVTemplate } from '@/types/cv'
import { getTemplateById } from '@/lib/cv/templates'

interface CVDesignPanelProps {
  cvData: CVData
  onUpdate: (updates: Partial<CVData>) => void
}

const FONTS = [
  { name: 'Inter', value: 'Inter', category: 'Sans-serif' },
  { name: 'Roboto', value: 'Roboto', category: 'Sans-serif' },
  { name: 'Open Sans', value: 'Open Sans', category: 'Sans-serif' },
  { name: 'Lato', value: 'Lato', category: 'Sans-serif' },
  { name: 'Montserrat', value: 'Montserrat', category: 'Sans-serif' },
  { name: 'Poppins', value: 'Poppins', category: 'Sans-serif' },
  { name: 'Nunito', value: 'Nunito', category: 'Sans-serif' },
  { name: 'Raleway', value: 'Raleway', category: 'Sans-serif' },
  { name: 'Playfair Display', value: 'Playfair Display', category: 'Serif' },
  { name: 'Merriweather', value: 'Merriweather', category: 'Serif' },
  { name: 'Georgia', value: 'Georgia', category: 'Serif' },
  { name: 'Crimson Text', value: 'Crimson Text', category: 'Serif' },
  { name: 'Lora', value: 'Lora', category: 'Serif' },
  { name: 'Roboto Mono', value: 'Roboto Mono', category: 'Monospace' },
  { name: 'Helvetica', value: 'Helvetica', category: 'Sans-serif' },
]

const FONT_SIZES = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
]

const PRESET_COLORS = [
  // Blue shades
  '#0056B3', '#007BFF', '#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD',
  // Green shades
  '#059669', '#10B981', '#22C55E', '#34D399', '#4ADE80', '#6EE7B7',
  // Black/Gray shades
  '#000000', '#1A1A1A', '#2C3E50', '#1F2937', '#374151', '#4B5563',
  // White
  '#FFFFFF', '#F9FAFB', '#F3F4F6'
]

export default function CVDesignPanel({ cvData, onUpdate }: CVDesignPanelProps) {
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'layout' | 'sections'>('colors')
  const template = getTemplateById(cvData.templateId)
  const [customColors, setCustomColors] = useState({
    primary: template?.config.colorScheme.primary || '#0056B3',
    secondary: template?.config.colorScheme.secondary || '#10B981',
    accent: template?.config.colorScheme.accent || '#059669',
    text: template?.config.colorScheme.text || '#1F2937',
    background: template?.config.colorScheme.background || '#FFFFFF',
  })

  const updateColor = (colorType: 'primary' | 'secondary' | 'accent' | 'text' | 'background', value: string) => {
    setCustomColors(prev => ({ ...prev, [colorType]: value }))
    // Update template config if needed
    if (template) {
      const updatedTemplate = {
        ...template,
        config: {
          ...template.config,
          colorScheme: {
            ...template.config.colorScheme,
            [colorType]: value
          }
        }
      }
      // This would update the template in the CV data
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-blue-500 rounded-full mr-3"></div>
          Design Customization
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b-2 border-blue-100">
        {[
          { id: 'colors', label: 'Colors', icon: Palette },
          { id: 'fonts', label: 'Typography', icon: Type },
          { id: 'layout', label: 'Layout', icon: Layout },
          { id: 'sections', label: 'Sections', icon: List }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-300 font-medium ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 bg-blue-50 rounded-t-lg'
                : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-t-lg'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Color Customization */}
      {activeTab === 'colors' && (
        <div className="space-y-6">
          {(['primary', 'secondary', 'accent', 'text', 'background'] as const).map(colorType => (
            <div key={colorType}>
              <label className="block text-xs font-semibold text-gray-700 mb-3 capitalize">
                {colorType} Color
              </label>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="color"
                    value={customColors[colorType]}
                    onChange={(e) => updateColor(colorType, e.target.value)}
                    className="w-16 h-12 rounded-xl border-2 border-blue-200 cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
                  />
                </div>
                <input
                  type="text"
                  value={customColors[colorType]}
                  onChange={(e) => updateColor(colorType, e.target.value)}
                  className="flex-1 px-4 py-2.5 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300 hover:border-blue-300"
                  placeholder="#000000"
                />
              </div>
              
              {/* Preset Colors */}
              <div className="mt-4">
                <div className="text-xs font-semibold text-gray-600 mb-3">Quick Select</div>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => updateColor(colorType, color)}
                      className={`w-10 h-10 rounded-xl border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                        customColors[colorType] === color
                          ? 'border-blue-600 ring-4 ring-blue-200 shadow-md scale-110'
                          : 'border-blue-200 hover:border-blue-300'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Typography Customization */}
      {activeTab === 'fonts' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">
              Heading Font
            </label>
            <select
              value={template?.config.typography.headingFont || 'Inter'}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300 hover:border-blue-300"
            >
              {FONTS.map(font => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.name} ({font.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">
              Body Font
            </label>
            <select
              value={template?.config.typography.bodyFont || 'Inter'}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300 hover:border-blue-300"
            >
              {FONTS.map(font => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.name} ({font.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">
              Font Size
            </label>
            <div className="grid grid-cols-3 gap-3">
              {FONT_SIZES.map(size => (
                <button
                  key={size.value}
                  className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 font-medium ${
                    template?.config.typography.fontSize === size.value
                      ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 shadow-md'
                      : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Layout Options */}
      {activeTab === 'layout' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">
              Layout Style
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'modern', label: 'Modern', desc: 'Clean lines', icon: '✨' },
                { id: 'classic', label: 'Classic', desc: 'Traditional', icon: '📜' },
                { id: 'creative', label: 'Creative', desc: 'Bold design', icon: '🎨' },
                { id: 'minimal', label: 'Minimal', desc: 'Simple', icon: '⚪' }
              ].map(layout => (
                <button
                  key={layout.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    template?.config.layout === layout.id
                      ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md'
                      : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{layout.icon}</div>
                  <div className="font-bold text-gray-900">{layout.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{layout.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">
              Spacing
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="0.8"
                max="1.5"
                step="0.1"
                defaultValue="1"
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs font-medium text-gray-600">
                <span>Compact</span>
                <span className="text-blue-600">Normal</span>
                <span>Spacious</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Visibility */}
      {activeTab === 'sections' && (
        <div className="space-y-4">
          {[
            { key: 'showPhoto', label: 'Profile Photo', icon: Image },
            { key: 'showSummary', label: 'Professional Summary', icon: Type },
            { key: 'showSkills', label: 'Skills Section', icon: List },
            { key: 'showLanguages', label: 'Languages', icon: Layout },
            { key: 'showCertifications', label: 'Certifications', icon: Eye },
            { key: 'showProjects', label: 'Projects', icon: Eye }
          ].map(section => (
            <div key={section.key} className="flex items-center justify-between p-4 rounded-xl border-2 border-blue-100 bg-white hover:border-blue-200 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-900">{section.label}</span>
              </div>
              <button
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${
                  template?.config.sections[section.key as keyof typeof template.config.sections]
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-md'
                    : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                    template?.config.sections[section.key as keyof typeof template.config.sections]
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

