// Main Resume Editor Component - Split Screen Layout
'use client'

import { useState, useRef, useEffect } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import { useReactToPrint } from 'react-to-print'
import { useSession } from 'next-auth/react'
import { Download, Save, FileText, Briefcase, GraduationCap, Award, Languages, User, Plus, Loader2 } from 'lucide-react'
import TemplateSelector from './TemplateSelector'
import PersonalInfoForm from './forms/PersonalInfoForm'
import WorkExperienceForm from './forms/WorkExperienceForm'
import EducationForm from './forms/EducationForm'
import SkillsForm from './forms/SkillsForm'
import LanguagesForm from './forms/LanguagesForm'
import CertificationsForm from './forms/CertificationsForm'
import ReferencesForm from './forms/ReferencesForm'
import { getTemplateComponent } from './TemplateSelector'
import MainHeader from '@/components/layout/MainHeader'

export default function ResumeEditor() {
  const { resumeData, currentTemplateId, updateProfessionalSummary, loadResume, setDirty, isDirty } = useResumeStore()
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState<'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'languages' | 'certifications' | 'references'>('personal')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [savedResumes, setSavedResumes] = useState<any[]>([])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [resumeName, setResumeName] = useState('')
  const printRef = useRef<HTMLDivElement>(null)

  const TemplateComponent = getTemplateComponent(currentTemplateId)

  // Load saved resumes on mount
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      loadSavedResumes()
    }
  }, [status, session])

  const loadSavedResumes = async () => {
    try {
      const response = await fetch('/api/resume/list')
      if (response.ok) {
        const data = await response.json()
        setSavedResumes(data.resumes || [])
      }
    } catch (error) {
      console.error('Error loading resumes:', error)
    }
  }

  const handleSave = async () => {
    if (!session?.user?.id) {
      alert('Please log in to save your resume')
      return
    }

    if (!resumeName.trim()) {
      setShowSaveDialog(true)
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/resume/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData,
          name: resumeName || `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_CV`,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setDirty(false)
        setShowSaveDialog(false)
        setResumeName('')
        await loadSavedResumes()
        alert('Resume saved successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to save: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving resume:', error)
      alert('Failed to save resume. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleLoadResume = async (resumeId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/resume/${resumeId}`)
      if (response.ok) {
        const data = await response.json()
        loadResume(data.resume.cv_data)
        setDirty(false)
      } else {
        alert('Failed to load resume')
      }
    } catch (error) {
      console.error('Error loading resume:', error)
      alert('Failed to load resume')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_CV`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-900">Swiss CV Editor</h1>
          <TemplateSelector />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !session?.user}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save {isDirty && '*'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="flex h-[calc(100vh-140px)] overflow-hidden">
        {/* Left Sidebar - Form */}
        <div className="w-1/2 border-r border-gray-200 bg-white overflow-y-auto">
          {/* Tabs */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="flex overflow-x-auto">
              {[
                { id: 'personal' as const, label: 'Personal', icon: User },
                { id: 'summary' as const, label: 'Summary', icon: FileText },
                { id: 'experience' as const, label: 'Experience', icon: Briefcase },
                { id: 'education' as const, label: 'Education', icon: GraduationCap },
                { id: 'skills' as const, label: 'Skills', icon: Award },
                { id: 'languages' as const, label: 'Languages', icon: Languages },
                { id: 'certifications' as const, label: 'Certifications', icon: Award },
                { id: 'references' as const, label: 'References', icon: User },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {activeTab === 'personal' && <PersonalInfoForm />}
            {activeTab === 'summary' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-4">Professional Summary</h2>
                <textarea
                  value={resumeData.professionalSummary || ''}
                  onChange={(e) => updateProfessionalSummary(e.target.value)}
                  placeholder="Write a brief professional summary highlighting your key qualifications and experience..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
                />
              </div>
            )}
            {activeTab === 'experience' && <WorkExperienceForm />}
            {activeTab === 'education' && <EducationForm />}
            {activeTab === 'skills' && <SkillsForm />}
            {activeTab === 'languages' && <LanguagesForm />}
            {activeTab === 'certifications' && <CertificationsForm />}
            {activeTab === 'references' && <ReferencesForm />}
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="w-1/2 bg-gray-100 overflow-y-auto p-8 flex items-start justify-center">
          <div className="bg-white shadow-2xl" style={{ width: '210mm', minHeight: '297mm' }}>
            <div ref={printRef}>
              <TemplateComponent data={resumeData} />
            </div>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Save Resume</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Resume Name</label>
              <input
                type="text"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                placeholder="e.g., Software Engineer CV"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && resumeName.trim()) {
                    handleSave()
                  }
                  if (e.key === 'Escape') {
                    setShowSaveDialog(false)
                  }
                }}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!resumeName.trim() || saving}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowSaveDialog(false)
                  setResumeName('')
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Resumes Sidebar (Optional - can be added later) */}
    </div>
  )
}

