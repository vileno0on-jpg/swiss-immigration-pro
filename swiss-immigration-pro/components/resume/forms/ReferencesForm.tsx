// References Form
'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Plus, Trash2 } from 'lucide-react'

export default function ReferencesForm() {
  const { resumeData, addReference, updateReference, removeReference } = useResumeStore()

  const handleAdd = () => {
    addReference({
      id: `ref-${Date.now()}`,
      name: '',
      title: '',
      company: '',
      relationship: '',
    })
  }

  const handleUpdate = (id: string, field: string, value: any) => {
    updateReference(id, { [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2">References</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Reference
        </button>
      </div>

      <div className="space-y-4">
        {(resumeData.references || []).map((ref) => (
          <div key={ref.id} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={ref.name}
                  onChange={(e) => handleUpdate(ref.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={ref.title}
                  onChange={(e) => handleUpdate(ref.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Company *</label>
                <input
                  type="text"
                  value={ref.company}
                  onChange={(e) => handleUpdate(ref.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  value={ref.relationship}
                  onChange={(e) => handleUpdate(ref.id, 'relationship', e.target.value)}
                  placeholder="e.g., Former Manager, Colleague"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={ref.email || ''}
                  onChange={(e) => handleUpdate(ref.id, 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={ref.phone || ''}
                  onChange={(e) => handleUpdate(ref.id, 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={() => removeReference(ref.id)}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove Reference
            </button>
          </div>
        ))}

        {(!resumeData.references || resumeData.references.length === 0) && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">No references added yet</p>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Reference
            </button>
          </div>
        )}
      </div>
    </div>
  )
}



