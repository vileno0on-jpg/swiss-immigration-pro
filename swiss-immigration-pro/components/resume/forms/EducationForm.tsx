// Education Form - Modern High-End Swiss Style
'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Plus, Trash2, GraduationCap, Calendar, MapPin, Award, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore()
  const [expandedId, setExpandedId] = useState<string | null>(resumeData.education[0]?.id || null)

  const handleAdd = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: [],
    }
    addEducation(newEdu)
    setExpandedId(newEdu.id)
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

  const handleRemoveHonor = (id: string, index: number) => {
    const edu = resumeData.education.find(e => e.id === id)
    if (edu) {
      const newHonors = (edu.honors || []).filter((_, i) => i !== index)
      updateEducation(id, { honors: newHonors })
    }
  }

  return (
    <div className="space-y-10 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Academic Background</h2>
            <p className="text-sm text-slate-500 font-medium">Verified degrees are the foundation of a Swiss permit application.</p>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {resumeData.education.map((edu, idx) => (
            <motion.div 
              key={edu.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white rounded-[32px] border transition-all overflow-hidden ${expandedId === edu.id ? 'border-indigo-200 shadow-2xl shadow-indigo-900/5' : 'border-slate-100 hover:border-slate-200 shadow-sm'}`}
            >
              {/* Card Header */}
              <div 
                onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                className="p-6 md:p-8 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-all ${expandedId === edu.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">
                      {edu.degree || 'New Degree'}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                      {edu.institution || 'Enter Institution'} • {edu.startDate || 'Start Date'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }}
                    className="p-3 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className={`p-2 rounded-lg bg-slate-50 text-slate-400 transition-transform ${expandedId === edu.id ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <AnimatePresence>
                {expandedId === edu.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-10 pt-4 space-y-8 border-t border-slate-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Degree / Qualification</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                            placeholder="e.g., MSc in Data Science"
                            className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl font-bold text-slate-900"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Institution</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                            placeholder="e.g., ETH Zurich / EPFL"
                            className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl font-bold text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Location</label>
                          <div className="relative">
                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <input
                              type="text"
                              value={edu.location}
                              onChange={(e) => handleUpdate(edu.id, 'location', e.target.value)}
                              placeholder="City, Country"
                              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl font-bold text-slate-900"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Start Date</label>
                          <input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => handleUpdate(edu.id, 'startDate', e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl font-bold text-slate-900"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">End Date</label>
                          <input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => handleUpdate(edu.id, 'endDate', e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl font-bold text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 max-w-xs">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">GPA (e.g., 5.5/6.0)</label>
                        <input
                          type="text"
                          value={edu.gpa || ''}
                          onChange={(e) => handleUpdate(edu.id, 'gpa', e.target.value)}
                          placeholder="Grade Average"
                          className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl font-bold text-slate-900"
                        />
                      </div>

                      {/* Honors */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                          Honors, Awards & Research
                        </label>
                        <div className="space-y-3">
                          {(edu.honors || []).map((honor, hIdx) => (
                            <motion.div 
                              key={hIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex gap-3"
                            >
                              <div className="mt-5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                              <input
                                type="text"
                                value={honor}
                                onChange={(e) => handleUpdateHonor(edu.id, hIdx, e.target.value)}
                                placeholder="e.g., 'Graduated with Summa Cum Laude'..."
                                className="flex-1 px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl font-medium text-slate-700 placeholder:text-slate-300"
                              />
                              <button
                                onClick={() => handleRemoveHonor(edu.id, hIdx)}
                                className="p-4 text-slate-200 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                          <button
                            onClick={() => handleAddHonor(edu.id)}
                            className="ml-4 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-indigo-600 hover:bg-indigo-50 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add Honor
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {resumeData.education.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <GraduationCap className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Academic Record.</h3>
            <p className="text-slate-500 font-medium max-w-sm mx-auto mb-8">
              Add your education history to show landlords and employers you're a qualified professional.
            </p>
            <button
              onClick={handleAdd}
              className="px-8 py-4 bg-indigo-600 text-white rounded-[20px] font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Your Education
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
