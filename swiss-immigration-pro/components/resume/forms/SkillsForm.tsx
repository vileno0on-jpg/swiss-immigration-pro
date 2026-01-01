// Skills Form
'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Plus, Trash2 } from 'lucide-react'

export default function SkillsForm() {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResumeStore()

  const handleAdd = () => {
    addSkill({
      id: `skill-${Date.now()}`,
      name: '',
      category: 'technical',
    })
  }

  const handleUpdate = (id: string, field: string, value: any) => {
    updateSkill(id, { [field]: value })
  }

  const skillsByCategory = {
    technical: resumeData.skills.filter(s => s.category === 'technical'),
    soft: resumeData.skills.filter(s => s.category === 'soft'),
    other: resumeData.skills.filter(s => s.category === 'other'),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2">Skills</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {['technical', 'soft', 'other'].map((category) => (
        <div key={category} className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3 capitalize">{category} Skills</h3>
          <div className="space-y-2">
            {skillsByCategory[category as keyof typeof skillsByCategory].map((skill) => (
              <div key={skill.id} className="flex gap-2">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleUpdate(skill.id, 'name', e.target.value)}
                  placeholder="Skill name..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {skillsByCategory[category as keyof typeof skillsByCategory].length === 0 && (
              <p className="text-sm text-gray-500">No {category} skills added</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}



