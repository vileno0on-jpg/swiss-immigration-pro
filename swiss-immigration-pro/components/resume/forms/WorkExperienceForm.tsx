// Work Experience Form
'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function WorkExperienceForm() {
  const { resumeData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResumeStore()
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: [],
    }
    addWorkExperience(newExp)
    setEditingId(newExp.id)
  }

  const handleUpdate = (id: string, field: string, value: any) => {
    updateWorkExperience(id, { [field]: value })
  }

  const handleAddBullet = (id: string) => {
    const exp = resumeData.workExperience.find(e => e.id === id)
    if (exp) {
      updateWorkExperience(id, { description: [...exp.description, ''] })
    }
  }

  const handleUpdateBullet = (id: string, index: number, value: string) => {
    const exp = resumeData.workExperience.find(e => e.id === id)
    if (exp) {
      const newDescription = [...exp.description]
      newDescription[index] = value
      updateWorkExperience(id, { description: newDescription })
    }
  }

  const handleRemoveBullet = (id: string, index: number) => {
    const exp = resumeData.workExperience.find(e => e.id === id)
    if (exp) {
      const newDescription = exp.description.filter((_, i) => i !== index)
      updateWorkExperience(id, { description: newDescription })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2">Work Experience</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.workExperience.map((exp) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  value={exp.jobTitle}
                  onChange={(e) => handleUpdate(exp.id, 'jobTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Company *</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                  placeholder="City, Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
                  <input
                    type="month"
                    value={exp.endDate || ''}
                    onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                    disabled={exp.isCurrent}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.isCurrent}
                  onChange={(e) => handleUpdate(exp.id, 'isCurrent', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-semibold text-gray-700">Current Position</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <div className="space-y-2">
                {exp.description.map((desc, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => handleUpdateBullet(exp.id, idx, e.target.value)}
                      placeholder="Achievement or responsibility..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleRemoveBullet(exp.id, idx)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddBullet(exp.id)}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Bullet Point
                </button>
              </div>
            </div>

            <button
              onClick={() => removeWorkExperience(exp.id)}
              className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove Experience
            </button>
          </div>
        ))}

        {resumeData.workExperience.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">No work experience added yet</p>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Experience
            </button>
          </div>
        )}
      </div>
    </div>
  )
}



