// Zustand Store for Resume Data Management
import { create } from 'zustand'
import type { ResumeData } from '@/types/resume'

interface ResumeStore {
  // State
  resumeData: ResumeData
  currentTemplateId: string
  isDirty: boolean // Track if there are unsaved changes
  
  // Actions
  updatePersonalInfo: (personalInfo: Partial<ResumeData['personalInfo']>) => void
  updateProfessionalSummary: (summary: string) => void
  addWorkExperience: (experience: ResumeData['workExperience'][0]) => void
  updateWorkExperience: (id: string, experience: Partial<ResumeData['workExperience'][0]>) => void
  removeWorkExperience: (id: string) => void
  addEducation: (education: ResumeData['education'][0]) => void
  updateEducation: (id: string, education: Partial<ResumeData['education'][0]>) => void
  removeEducation: (id: string) => void
  addSkill: (skill: ResumeData['skills'][0]) => void
  updateSkill: (id: string, skill: Partial<ResumeData['skills'][0]>) => void
  removeSkill: (id: string) => void
  addLanguage: (language: ResumeData['languages'][0]) => void
  updateLanguage: (id: string, language: Partial<ResumeData['languages'][0]>) => void
  removeLanguage: (id: string) => void
  addCertification: (certification: ResumeData['certifications'][0]) => void
  updateCertification: (id: string, certification: Partial<ResumeData['certifications'][0]>) => void
  removeCertification: (id: string) => void
  addReference: (reference: ResumeData['references'][0]) => void
  updateReference: (id: string, reference: Partial<ResumeData['references'][0]>) => void
  removeReference: (id: string) => void
  setTemplate: (templateId: string) => void
  loadResume: (data: ResumeData) => void
  resetResume: () => void
  setDirty: (dirty: boolean) => void
}

import { createEmptyResume } from '@/types/resume'

export const useResumeStore = create<ResumeStore>()(
  (set) => ({
      // Initial State
      resumeData: createEmptyResume(),
      currentTemplateId: 'swiss-classic',
      isDirty: false,

      // Update Personal Info
      updatePersonalInfo: (personalInfo) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...personalInfo },
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      // Update Professional Summary
      updateProfessionalSummary: (summary) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            professionalSummary: summary,
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      // Work Experience Actions
      addWorkExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: [...state.resumeData.workExperience, experience],
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      updateWorkExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: state.resumeData.workExperience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      removeWorkExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: state.resumeData.workExperience.filter((exp) => exp.id !== id),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      // Education Actions
      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, education],
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      // Skills Actions
      addSkill: (skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [...state.resumeData.skills, skill],
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      updateSkill: (id, skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((s) =>
              s.id === id ? { ...s, ...skill } : s
            ),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      removeSkill: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((s) => s.id !== id),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      // Languages Actions
      addLanguage: (language) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: [...state.resumeData.languages, language],
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      updateLanguage: (id, language) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: state.resumeData.languages.map((lang) =>
              lang.id === id ? { ...lang, ...language } : lang
            ),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      removeLanguage: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: state.resumeData.languages.filter((lang) => lang.id !== id),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      // Certifications Actions
      addCertification: (certification) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: [...state.resumeData.certifications, certification],
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      updateCertification: (id, certification) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.map((cert) =>
              cert.id === id ? { ...cert, ...certification } : cert
            ),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      removeCertification: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.filter((cert) => cert.id !== id),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      // References Actions
      addReference: (reference) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            references: [...(state.resumeData.references || []), reference],
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      updateReference: (id, reference) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            references: (state.resumeData.references || []).map((ref) =>
              ref.id === id ? { ...ref, ...reference } : ref
            ),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      removeReference: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            references: (state.resumeData.references || []).filter((ref) => ref.id !== id),
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      // Template Actions
      setTemplate: (templateId) =>
        set((state) => ({
          currentTemplateId: templateId,
          resumeData: {
            ...state.resumeData,
            templateId,
            updatedAt: new Date().toISOString(),
          },
          isDirty: true,
        })),

      // Load/Reset Actions
      loadResume: (data) =>
        set({
          resumeData: data,
          currentTemplateId: data.templateId,
          isDirty: false,
        }),

      resetResume: () =>
        set({
          resumeData: createEmptyResume(),
          currentTemplateId: 'swiss-classic',
          isDirty: false,
        }),

      setDirty: (dirty) => set({ isDirty: dirty }),
    })
)

