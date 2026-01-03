// Personal Information Form - Modern High-End Swiss Style
'use client'

import { useResumeStore } from '@/store/resumeStore'
import type { SwissPermitType, MaritalStatus } from '@/types/resume'
import { Upload, X, User, Camera, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PERMIT_TYPES: SwissPermitType[] = ['Citizen', 'Permit C', 'Permit B', 'Permit L', 'Permit G', 'Non-EU']
const MARITAL_STATUSES: MaritalStatus[] = ['Single', 'Married', 'Divorced', 'Widowed', 'Partnership']

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore()
  const { personalInfo } = resumeData
  const [photoPreview, setPhotoPreview] = useState<string | null>(personalInfo.photoUrl || null)

  const handleInputChange = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPhotoPreview(result)
        updatePersonalInfo({ photoUrl: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setPhotoPreview(null)
    updatePersonalInfo({ photoUrl: undefined })
  }

  return (
    <div className="space-y-12">
      {/* Photo Section - Visual Anchor */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-slate-50/50 rounded-[40px] border border-slate-100">
        <div className="relative group">
          {photoPreview ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-32 h-32 md:w-40 md:h-40"
            >
              <img
                src={photoPreview}
                alt="Profile"
                className="w-full h-full object-cover rounded-[32px] border-4 border-white shadow-2xl"
              />
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full p-2 hover:bg-red-500 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-2 group-hover:border-blue-400 transition-colors cursor-pointer relative overflow-hidden">
              <Camera className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition-colors" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4">Professional Photo Required</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-black text-slate-900 mb-2">Professional Portrait</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm mb-4">
            Swiss employers expect a clean, professional headshot. Use a neutral background and professional attire.
          </p>
          {!photoPreview && (
            <label className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer shadow-sm">
              <Upload className="w-4 h-4" />
              <span>Upload Photo</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          )}
        </div>
      </div>

      {/* Identity Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Basic Identity</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">First Name</label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Last Name</label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Professional Title</label>
          <input
            type="text"
            value={personalInfo.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="e.g., Senior Software Engineer"
            className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900 placeholder:text-slate-300"
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <Mail className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Contact Channels</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 relative group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
                required
              />
            </div>
          </div>
          <div className="space-y-2 relative group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+41 00 000 00 00"
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Location</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Street Address</label>
            <input
              type="text"
              value={personalInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Postal Code</label>
            <input
              type="text"
              value={personalInfo.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">City</label>
            <input
              type="text"
              value={personalInfo.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Country</label>
            <input
              type="text"
              value={personalInfo.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
              required
            />
          </div>
        </div>
      </div>

      {/* Swiss Context Section */}
      <div className="p-8 bg-blue-50/30 rounded-[40px] border border-blue-100/50 space-y-10">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-900/40">Swiss Residency Context</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-blue-700/50 ml-4">Date of Birth</label>
            <input
              type="date"
              value={personalInfo.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full px-6 py-4 bg-white border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-blue-700/50 ml-4">Nationality</label>
            <input
              type="text"
              value={personalInfo.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              placeholder="e.g., Swiss / German / EU"
              className="w-full px-6 py-4 bg-white border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900 placeholder:text-slate-300"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-blue-700/50 ml-4">Marital Status</label>
            <select
              value={personalInfo.maritalStatus || ''}
              onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              className="w-full px-6 py-4 bg-white border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900 appearance-none"
            >
              <option value="">Select Status...</option>
              {MARITAL_STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-blue-700/50 ml-4">Swiss Permit Type</label>
            <select
              value={personalInfo.permitType}
              onChange={(e) => handleInputChange('permitType', e.target.value as SwissPermitType)}
              className="w-full px-6 py-4 bg-white border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900 appearance-none"
              required
            >
              {PERMIT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Socials Section */}
      <div className="space-y-8 pb-10">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-5 h-5 text-slate-400" />
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Professional Links</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 relative group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">LinkedIn Profile</label>
            <div className="relative">
              <Linkedin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-[#0077B5] transition-colors" />
              <input
                type="url"
                value={personalInfo.linkedinUrl || ''}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                placeholder="linkedin.com/in/username"
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
              />
            </div>
          </div>
          <div className="space-y-2 relative group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">GitHub Profile</label>
            <div className="relative">
              <Github className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-black transition-colors" />
              <input
                type="url"
                value={personalInfo.githubUrl || ''}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                placeholder="github.com/username"
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl font-bold text-slate-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
