// Work Experience Form - Modern High-End Swiss Style
'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Plus, Trash2, Briefcase, Calendar, MapPin, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WorkExperienceForm() {
  const { resumeData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResumeStore()
  const [expandedId, setExpandedId] = useState<string | null>(resumeData.workExperience[0]?.id || null)

  const handleAdd = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: [''],
    }
    addWorkExperience(newExp)
    setExpandedId(newExp.id)
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
    <div className="space-y-10 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Professional Path</h2>
            <p className="text-sm text-slate-500 font-medium">Landlords value stable, continuous employment history.</p>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {resumeData.workExperience.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white rounded-[32px] border transition-all overflow-hidden ${expandedId === exp.id ? 'border-blue-200 shadow-2xl shadow-blue-900/5' : 'border-slate-100 hover:border-slate-200 shadow-sm'}`}
            >
              {/* Card Header */}
              <div 
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                className="p-6 md:p-8 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-all ${expandedId === exp.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">
                      {exp.jobTitle || 'New Position'}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                      {exp.company || 'Enter Company Name'} • {exp.startDate || 'Start Date'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); removeWorkExperience(exp.id); }}
                    className="p-3 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className={`p-2 rounded-lg bg-slate-50 text-slate-400 transition-transform ${expandedId === exp.id ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <AnimatePresence>
                {expandedId === exp.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-10 pt-4 space-y-8 border-t border-slate-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Job Title</label>
                          <input
                            type="text"
                            value={exp.jobTitle}
                            onChange={(e) => handleUpdate(exp.id, 'jobTitle', e.target.value)}
                            placeholder="e.g., Software Architect"
                            className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                            placeholder="e.g., Roche / Novartis"
                            className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Location</label>
                          <div className="relative">
                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                              placeholder="City, Country"
                              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Start Date</label>
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                              className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">End Date</label>
                            <input
                              type="month"
                              value={exp.endDate || ''}
                              onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                              disabled={exp.isCurrent}
                              className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900 disabled:opacity-30"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl w-fit">
                        <input
                          type="checkbox"
                          checked={exp.isCurrent}
                          onChange={(e) => handleUpdate(exp.id, 'isCurrent', e.target.checked)}
                          className="w-5 h-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-500/20"
                        />
                        <span className="text-sm font-bold text-slate-700">I currently work here</span>
                      </div>

                      {/* Responsibilities */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                          Key Achievements & Responsibilities
                          <span className="text-blue-600 lowercase font-bold tracking-normal">(Swiss standard prefers bullet points)</span>
                        </label>
                        <div className="space-y-3">
                          {exp.description.map((desc, bIdx) => (
                            <motion.div 
                              key={bIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex gap-3"
                            >
                              <div className="mt-5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                              <input
                                type="text"
                                value={desc}
                                onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                                placeholder="Described using action verbs (e.g., 'Developed', 'Managed')..."
                                className="flex-1 px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-medium text-slate-700 placeholder:text-slate-300"
                              />
                              <button
                                onClick={() => handleRemoveBullet(exp.id, bIdx)}
                                className="p-4 text-slate-200 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                          <button
                            onClick={() => handleAddBullet(exp.id)}
                            className="ml-4 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-blue-600 hover:bg-blue-50 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add Achievement
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

        {resumeData.workExperience.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Briefcase className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No Experience Added.</h3>
            <p className="text-slate-500 font-medium max-w-sm mx-auto mb-8">
              Start building your professional profile to increase your employer and landlord trust.
            </p>
            <button
              onClick={handleAdd}
              className="px-8 py-4 bg-blue-600 text-white rounded-[20px] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Your First Role
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
