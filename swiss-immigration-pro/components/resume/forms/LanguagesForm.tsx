// Languages Form - Critical for Swiss CVs
'use client'

import { useResumeStore } from '@/store/resumeStore'
import type { LanguageProficiency } from '@/types/resume'
import { Plus, Trash2 } from 'lucide-react'

const PROFICIENCY_LEVELS: LanguageProficiency[] = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic']
const COMMON_LANGUAGES = ['German', 'French', 'Italian', 'English', 'Spanish', 'Portuguese', 'Chinese', 'Arabic', 'Russian', 'Japanese']

export default function LanguagesForm() {
  const { resumeData, addLanguage, updateLanguage, removeLanguage } = useResumeStore()

  const handleAdd = () => {
    addLanguage({
      id: `lang-${Date.now()}`,
      name: '',
      proficiency: 'Intermediate',
    })
  }

  const handleUpdate = (id: string, field: string, value: any) => {
    updateLanguage(id, { [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2">Languages</h2>
          <p className="text-sm text-gray-600 mt-2">Language proficiency is heavily scrutinized in Switzerland</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Language
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.languages.map((lang) => (
          <div key={lang.id} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Language *</label>
                <select
                  value={lang.name}
                  onChange={(e) => handleUpdate(lang.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select language...</option>
                  {COMMON_LANGUAGES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                {!COMMON_LANGUAGES.includes(lang.name) && lang.name && (
                  <input
                    type="text"
                    value={lang.name}
                    onChange={(e) => handleUpdate(lang.id, 'name', e.target.value)}
                    placeholder="Or enter custom language"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Proficiency Level *</label>
                <select
                  value={lang.proficiency}
                  onChange={(e) => handleUpdate(lang.id, 'proficiency', e.target.value as LanguageProficiency)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {PROFICIENCY_LEVELS.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Certificate (Optional)</label>
              <input
                type="text"
                value={lang.certificate || ''}
                onChange={(e) => handleUpdate(lang.id, 'certificate', e.target.value)}
                placeholder="e.g., Goethe-Zertifikat C1, DELF B2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => removeLanguage(lang.id)}
              className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove Language
            </button>
          </div>
        ))}

        {resumeData.languages.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">No languages added yet</p>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Language
            </button>
          </div>
        )}
      </div>
    </div>
  )
}



