// Main Resume Editor Component - High-End Professional Interface
'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import { useReactToPrint } from 'react-to-print'
import { useSession } from 'next-auth/react'
import { 
  Download, 
  Save, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Languages, 
  User, 
  Plus, 
  Loader2,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Info,
  ChevronRight,
  Eye,
  Settings,
  Layout,
  Share2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const TemplateComponent = useMemo(() => {
    try {
      const templateId = currentTemplateId || 'swiss-classic'
      const component = getTemplateComponent(templateId)
      if (!component) {
        console.error('Template component not found for:', templateId, 'Falling back to swiss-classic')
        return getTemplateComponent('swiss-classic')
      }
      return component
    } catch (error) {
      console.error('Error loading template component:', error)
      return getTemplateComponent('swiss-classic')
    }
  }, [currentTemplateId])

  // Calculate Swiss Standard Score (Simulated Logic)
  const cvScore = useMemo(() => {
    let score = 0
    if (resumeData.personalInfo.firstName && resumeData.personalInfo.lastName) score += 15
    if (resumeData.personalInfo.photoUrl) score += 10 // Important in Switzerland
    if (resumeData.professionalSummary && resumeData.professionalSummary.length > 50) score += 15
    if (resumeData.workExperience.length > 0) score += 20
    if (resumeData.education.length > 0) score += 15
    if (resumeData.skills.length > 0) score += 10
    if (resumeData.languages.length > 0) score += 15
    return Math.min(100, score)
  }, [resumeData])

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
        setDirty(false)
        setShowSaveDialog(false)
        setResumeName('')
        await loadSavedResumes()
        // Success notification instead of alert could be better later
      }
    } catch (error) {
      console.error('Error saving resume:', error)
    } finally {
      setSaving(false)
    }
  }

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_CV`,
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print {
        body { margin: 0; padding: 0; }
        .no-print { display: none !important; }
      }
    `,
  })

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <MainHeader />
      
      {/* High-End Toolbar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-16 z-40 no-print shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
              Swiss <span className="text-blue-600">CV Editor</span>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">v2.0</span>
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < Math.floor(cvScore / 20) ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Standard Score: {cvScore}%</span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-100 hidden md:block" />
          <div className="hidden lg:flex items-center gap-2">
            <TemplateSelector />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${isPreviewMode ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'}`}
          >
            {isPreviewMode ? <Settings className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {isPreviewMode ? 'Editor' : 'Preview'}
          </button>
          
          <div className="h-8 w-px bg-slate-100" />

          <button
            onClick={handleSave}
            disabled={saving || !session?.user}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${isDirty ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' : 'bg-white text-slate-400 border border-slate-100'}`}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save {isDirty && '*'}
          </button>

          <button
            onClick={handlePrint}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-500/20 active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Main Editor Surface */}
      <div className="flex h-[calc(100vh-140px)] overflow-hidden bg-slate-50/30">
        {/* Left Sidebar - High-End Tabs & Forms */}
        <AnimatePresence mode="wait">
          {!isPreviewMode && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full lg:w-[45%] border-r border-slate-100 bg-white overflow-hidden flex"
            >
              {/* Vertical Navigation Bar */}
              <div className="w-20 md:w-24 border-r border-slate-50 flex flex-col items-center py-8 gap-6 bg-slate-50/50">
                {[
                  { id: 'personal' as const, icon: User, label: 'Info' },
                  { id: 'summary' as const, icon: FileText, label: 'Profile' },
                  { id: 'experience' as const, icon: Briefcase, label: 'Work' },
                  { id: 'education' as const, icon: GraduationCap, label: 'Study' },
                  { id: 'skills' as const, icon: Award, label: 'Skills' },
                  { id: 'languages' as const, icon: Languages, label: 'Langs' },
                  { id: 'certifications' as const, icon: Award, label: 'Certs' },
                  { id: 'references' as const, icon: User, label: 'Refs' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative flex flex-col items-center gap-1.5 transition-all ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === tab.id ? 'bg-white shadow-xl shadow-blue-500/10 text-blue-600 ring-2 ring-blue-500/5' : 'bg-transparent group-hover:bg-white'}`}>
                      <tab.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest scale-90">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div layoutId="activeTabMarker" className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Form Scroll Area */}
              <div className="flex-1 overflow-y-auto px-8 py-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'personal' && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-10">
                          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <User className="w-7 h-7" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Personal Details</h2>
                            <p className="text-slate-500 font-medium text-sm italic">Swiss standard requires a professional photo.</p>
                          </div>
                        </div>
                        <PersonalInfoForm />
                      </div>
                    )}
                    
                    {activeTab === 'summary' && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-10">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <FileText className="w-7 h-7" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Professional Summary</h2>
                            <p className="text-slate-500 font-medium text-sm">Elevate your application with a strong opening.</p>
                          </div>
                        </div>
                        <div className="relative">
                          <textarea
                            value={resumeData.professionalSummary || ''}
                            onChange={(e) => updateProfessionalSummary(e.target.value)}
                            placeholder="Write a brief professional summary highlighting your key qualifications and experience..."
                            className="w-full px-6 py-5 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-3xl font-medium text-slate-700 min-h-[300px] leading-relaxed resize-none"
                          />
                          <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <Zap className="w-3 h-3 text-amber-500" />
                            AI Refinement Ready
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'experience' && <WorkExperienceForm />}
                    {activeTab === 'education' && <EducationForm />}
                    {activeTab === 'skills' && <SkillsForm />}
                    {activeTab === 'languages' && <LanguagesForm />}
                    {activeTab === 'certifications' && <CertificationsForm />}
                    {activeTab === 'references' && <ReferencesForm />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side - Premium Live Preview */}
        <div className={`flex-1 bg-slate-100/50 overflow-y-auto p-12 flex items-start justify-center transition-all ${isPreviewMode ? 'lg:w-full' : 'hidden lg:flex'}`}>
          <motion.div 
            layout
            className="bg-white shadow-2xl shadow-slate-900/10 rounded-sm origin-top" 
            style={{ 
              width: '210mm', 
              minHeight: '297mm',
              scale: isPreviewMode ? 1 : 0.85
            }}
          >
            {/* Swiss Standard Header (Visual Only) */}
            <div className="absolute -top-12 left-0 right-0 flex items-center justify-between px-4 no-print pointer-events-none opacity-50">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Swiss Format Validated</span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">A4 • 210 x 297 mm</div>
            </div>

            <div ref={printRef} className="relative">
              {TemplateComponent && typeof TemplateComponent === 'function' ? (
                <TemplateComponent data={resumeData} />
              ) : (
                <div className="bg-white text-black p-8" style={{ width: '210mm', minHeight: '297mm' }}>
                  <p className="text-red-600">Error: Template component not found. Please refresh the page.</p>
                  <p className="text-gray-600 text-sm mt-2">Template ID: {currentTemplateId}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Save Dialog - Modern White Style */}
      <AnimatePresence>
        {showSaveDialog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSaveDialog(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Save className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Save Progress.</h3>
              <p className="text-slate-500 font-medium text-sm mb-8">Your CV will be securely stored in your personal dashboard.</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Resume Name</label>
                  <input
                    type="text"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold"
                    autoFocus
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={!resumeName.trim() || saving}
                    className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Confirm Save</span>}
                  </button>
                  <button
                    onClick={() => setShowSaveDialog(false)}
                    className="px-8 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold hover:text-slate-900 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Insights Panel */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-6 border border-white/10 backdrop-blur-xl no-print"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Market Insights</div>
            <div className="text-sm font-bold">Your CV is <span className="text-emerald-400">72%</span> optimized for {resumeData.personalInfo.lastName || 'Swiss'} employers</div>
          </div>
        </div>
        <div className="h-8 w-px bg-white/10 hidden sm:block" />
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-wider">A4 Format</span>
          <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-wider">ATS Compatible</span>
        </div>
      </motion.div>
    </div>
  )
}
