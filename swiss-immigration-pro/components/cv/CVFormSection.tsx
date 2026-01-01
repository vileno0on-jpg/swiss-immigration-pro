'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, X } from 'lucide-react'
import { CVData, PersonalInfo, WorkExperience, Education, Skill, Language } from '@/types/cv'
import { CV_TEMPLATES } from '@/lib/cv/templates'

interface CVFormSectionProps {
  cvData: CVData
  activeSection: string
  onUpdatePersonalInfo: (info: Partial<PersonalInfo>) => void
  onUpdateSummary: (summary: string) => void
  onAddExperience: () => void
  onUpdateExperience: (id: string, updates: Partial<WorkExperience>) => void
  onRemoveExperience: (id: string) => void
  onAddEducation: () => void
  onUpdateEducation: (id: string, updates: Partial<Education>) => void
  onRemoveEducation: (id: string) => void
  onAddSkill: () => void
  onUpdateSkill: (id: string, updates: Partial<Skill>) => void
  onRemoveSkill: (id: string) => void
  onAddLanguage: () => void
  onUpdateLanguage: (id: string, updates: Partial<Language>) => void
  onRemoveLanguage: (id: string) => void
  onUpdateTemplate: (templateId: string) => void
}

export default function CVFormSection({
  cvData,
  activeSection,
  onUpdatePersonalInfo,
  onUpdateSummary,
  onAddExperience,
  onUpdateExperience,
  onRemoveExperience,
  onAddEducation,
  onUpdateEducation,
  onRemoveEducation,
  onAddSkill,
  onUpdateSkill,
  onRemoveSkill,
  onAddLanguage,
  onUpdateLanguage,
  onRemoveLanguage,
  onUpdateTemplate
}: CVFormSectionProps) {
  const [editingBullet, setEditingBullet] = useState<{ id: string; index: number } | null>(null)
  const [newBullet, setNewBullet] = useState('')

  const addBullet = (expId: string) => {
    if (newBullet.trim()) {
      const exp = cvData.experience.find(e => e.id === expId)
      if (exp) {
        onUpdateExperience(expId, {
          description: [...exp.description, newBullet.trim()]
        })
        setNewBullet('')
      }
    }
  }

  const removeBullet = (expId: string, index: number) => {
    const exp = cvData.experience.find(e => e.id === expId)
    if (exp) {
      onUpdateExperience(expId, {
        description: exp.description.filter((_, i) => i !== index)
      })
    }
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 p-6 space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo.firstName}
                  onChange={(e) => onUpdatePersonalInfo({ firstName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo.lastName}
                  onChange={(e) => onUpdatePersonalInfo({ lastName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={cvData.personalInfo.email}
                  onChange={(e) => onUpdatePersonalInfo({ email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={cvData.personalInfo.phone}
                  onChange={(e) => onUpdatePersonalInfo({ phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo.location}
                  onChange={(e) => onUpdatePersonalInfo({ location: e.target.value })}
                  className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={cvData.personalInfo.linkedin || ''}
                  onChange={(e) => onUpdatePersonalInfo({ linkedin: e.target.value })}
                  className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={cvData.personalInfo.website || ''}
                  onChange={(e) => onUpdatePersonalInfo({ website: e.target.value })}
                  className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub
                </label>
                <input
                  type="url"
                  value={cvData.personalInfo.github || ''}
                  onChange={(e) => onUpdatePersonalInfo({ github: e.target.value })}
                  className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )

      case 'summary':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500 mb-4">Professional Summary</h2>
            <textarea
              value={cvData.summary}
              onChange={(e) => onUpdateSummary(e.target.value)}
              placeholder="Write a compelling 2-3 sentence professional summary highlighting your key qualifications, experience, and career goals..."
              rows={6}
              className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {cvData.summary.length} characters
            </p>
          </div>
        )

      case 'experience':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500">Work Experience</h2>
              <button
                onClick={onAddExperience}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            </div>

            {cvData.experience.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No work experience added yet. Click "Add Experience" to get started.
              </div>
            ) : (
              <div className="space-y-6">
                {cvData.experience.map((exp) => (
                  <div key={exp.id} className="border border-blue-200 dark:border-gray-700 rounded-lg p-6 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Job Title *
                            </label>
                            <input
                              type="text"
                              value={exp.jobTitle}
                              onChange={(e) => onUpdateExperience(exp.id, { jobTitle: e.target.value })}
                              className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Company *
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => onUpdateExperience(exp.id, { company: e.target.value })}
                              className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => onUpdateExperience(exp.id, { location: e.target.value })}
                              className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Start Date *
                              </label>
                              <input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => onUpdateExperience(exp.id, { startDate: e.target.value })}
                                className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                            </div>
                            {!exp.current && (
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  End Date
                                </label>
                                <input
                                  type="month"
                                  value={exp.endDate || ''}
                                  onChange={(e) => onUpdateExperience(exp.id, { endDate: e.target.value })}
                                  className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => onUpdateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? null : exp.endDate })}
                            className="mr-2"
                          />
                          <label className="text-sm text-gray-700 dark:text-gray-300">Current Position</label>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description & Achievements
                          </label>
                          <div className="space-y-2">
                            {exp.description.map((bullet, idx) => (
                              <div key={idx} className="flex items-start space-x-2">
                                <span className="mt-2">•</span>
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={(e) => {
                                    const newDesc = [...exp.description]
                                    newDesc[idx] = e.target.value
                                    onUpdateExperience(exp.id, { description: newDesc })
                                  }}
                                  className="flex-1 px-3 py-2 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                  placeholder="Achieved X by doing Y, resulting in Z% improvement"
                                />
                                <button
                                  onClick={() => removeBullet(exp.id, idx)}
                                  className="p-2 text-red-600 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={newBullet}
                                onChange={(e) => setNewBullet(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addBullet(exp.id)}
                                placeholder="Add bullet point (press Enter)"
                                className="flex-1 px-3 py-2 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              />
                              <button
                                onClick={() => addBullet(exp.id)}
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveExperience(exp.id)}
                        className="ml-4 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'education':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500">Education</h2>
              <button
                onClick={onAddEducation}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add Education</span>
              </button>
            </div>

            {cvData.education.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No education entries added yet.
              </div>
            ) : (
              <div className="space-y-4">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="border border-blue-200 dark:border-gray-700 rounded-lg p-6 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Degree *
                          </label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => onUpdateEducation(edu.id, { degree: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Institution *
                          </label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => onUpdateEducation(edu.id, { institution: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            value={edu.location}
                            onChange={(e) => onUpdateEducation(edu.id, { location: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Start Date
                            </label>
                            <input
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => onUpdateEducation(edu.id, { startDate: e.target.value })}
                              className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              End Date
                            </label>
                            <input
                              type="month"
                              value={edu.endDate || ''}
                              onChange={(e) => onUpdateEducation(edu.id, { endDate: e.target.value })}
                              className="w-full px-4 py-2.5 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveEducation(edu.id)}
                        className="ml-4 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'skills':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500">Skills</h2>
              <button
                onClick={onAddSkill}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            {cvData.skills.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No skills added yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cvData.skills.map((skill) => (
                  <div key={skill.id} className="border border-blue-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => onUpdateSkill(skill.id, { name: e.target.value })}
                        placeholder="Skill name"
                        className="w-full px-3 py-2 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <select
                        value={skill.category}
                        onChange={(e) => onUpdateSkill(skill.id, { category: e.target.value as any })}
                        className="w-full px-3 py-2 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="technical">Technical</option>
                        <option value="soft">Soft Skills</option>
                        <option value="language">Language</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <button
                      onClick={() => onRemoveSkill(skill.id)}
                      className="ml-4 p-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'languages':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500">Languages</h2>
              <button
                onClick={onAddLanguage}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add Language</span>
              </button>
            </div>

            {cvData.languages.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No languages added yet.
              </div>
            ) : (
              <div className="space-y-4">
                {cvData.languages.map((lang) => (
                  <div key={lang.id} className="border border-blue-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={lang.name}
                        onChange={(e) => onUpdateLanguage(lang.id, { name: e.target.value })}
                        placeholder="Language name"
                        className="px-3 py-2 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <select
                        value={lang.proficiency}
                        onChange={(e) => onUpdateLanguage(lang.id, { proficiency: e.target.value as any })}
                        className="px-3 py-2 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="A1">A1 - Beginner</option>
                        <option value="A2">A2 - Elementary</option>
                        <option value="B1">B1 - Intermediate</option>
                        <option value="B2">B2 - Upper Intermediate</option>
                        <option value="C1">C1 - Advanced</option>
                        <option value="C2">C2 - Proficient</option>
                        <option value="native">Native</option>
                      </select>
                    </div>
                    <button
                      onClick={() => onRemoveLanguage(lang.id)}
                      className="ml-4 p-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'template':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500 mb-6">Choose Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CV_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onUpdateTemplate(template.id)}
                  className={`border-2 rounded-lg p-4 text-left transition-all duration-200 ${
                    cvData.templateId === template.id
                      ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/20 shadow-md'
                      : 'border-blue-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-sm bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {template.category}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {template.description}
                  </div>
                  {template.isPremium && (
                    <div className="mt-2 text-xs font-semibold text-green-600 dark:text-green-400">
                      Premium
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 p-6">
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">Select a section to edit</p>
          </div>
        )
    }
  }

  return <div>{renderSection()}</div>
}

