// Education Form
'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Plus, Trash2 } from 'lucide-react'

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore()

  const handleAdd = () => {
    addEducation({
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
    })
  }

  const handleUpdate = (id: string, field: string, value: any) => {
    updateEducation(id, { [field]: value })
  }

  const handleAddHonor = (id: string) => {
    const edu = resumeData.education.find(e => e.id === id)
    if (edu) {
      updateEducation(id, { honors: [...(edu.honors || []), ''] })
    }
  }

  const handleUpdateHonor = (id: string, index: number, value: string) => {
    const edu = resumeData.education.find(e => e.id === id)
    if (edu) {
      const newHonors = [...(edu.honors || [])]
      newHonors[index] = value
      updateEducation(id, { honors: newHonors })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2">Education</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Degree *</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Institution *</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => handleUpdate(edu.id, 'location', e.target.value)}
                  placeholder="City, Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleUpdate(edu.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
                <input
                  type="month"
                  value={edu.endDate || ''}
                  onChange={(e) => handleUpdate(edu.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">GPA (Swiss System)</label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => handleUpdate(edu.id, 'gpa', e.target.value)}
                  placeholder="e.g., 5.4/6.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {edu.honors && edu.honors.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Honors & Awards</label>
                <div className="space-y-2">
                  {edu.honors.map((honor, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={honor}
                      onChange={(e) => handleUpdateHonor(edu.id, idx, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => handleAddHonor(edu.id)}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mb-4"
            >
              <Plus className="w-4 h-4" />
              Add Honor/Award
            </button>

            <button
              onClick={() => removeEducation(edu.id)}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove Education
            </button>
          </div>
        ))}

        {resumeData.education.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">No education entries added yet</p>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Education
            </button>
          </div>
        )}
      </div>
    </div>
  )
}



