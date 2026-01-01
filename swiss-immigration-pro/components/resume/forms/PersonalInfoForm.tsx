// Personal Information Form - Swiss Specific Fields
'use client'

import { useResumeStore } from '@/store/resumeStore'
import type { SwissPermitType, MaritalStatus } from '@/types/resume'
import { Upload, X } from 'lucide-react'
import { useState } from 'react'

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
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2">Personal Information</h2>

      {/* Name & Title */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">First Name *</label>
          <input
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name *</label>
          <input
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Professional Title</label>
        <input
          type="text"
          value={personalInfo.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., Software Engineer, Marketing Manager"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+41 XX XXX XX XX"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Address */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
          <input
            type="text"
            value={personalInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Postal Code *</label>
          <input
            type="text"
            value={personalInfo.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">City *</label>
          <input
            type="text"
            value={personalInfo.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Country *</label>
          <input
            type="text"
            value={personalInfo.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Swiss-Specific Fields */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Swiss Immigration Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth *</label>
            <input
              type="date"
              value={personalInfo.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nationality *</label>
            <input
              type="text"
              value={personalInfo.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              placeholder="e.g., Swiss, German, American"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Marital Status</label>
            <select
              value={personalInfo.maritalStatus || ''}
              onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select...</option>
              {MARITAL_STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Permit Type *</label>
            <select
              value={personalInfo.permitType}
              onChange={(e) => handleInputChange('permitType', e.target.value as SwissPermitType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {PERMIT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Professional Photo */}
      <div className="border-t border-gray-200 pt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Photo (Required in Switzerland)</label>
        <div className="flex items-center gap-4">
          {photoPreview ? (
            <div className="relative">
              <img
                src={photoPreview}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 text-center px-2">No Photo</span>
            </div>
          )}
          <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">Professional headshot recommended (square or portrait orientation)</p>
      </div>

      {/* Additional Links */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Additional Links</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={personalInfo.linkedinUrl || ''}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/in/yourname"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Website URL</label>
            <input
              type="url"
              value={personalInfo.websiteUrl || ''}
              onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">GitHub URL</label>
            <input
              type="url"
              value={personalInfo.githubUrl || ''}
              onChange={(e) => handleInputChange('githubUrl', e.target.value)}
              placeholder="https://github.com/yourname"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}



