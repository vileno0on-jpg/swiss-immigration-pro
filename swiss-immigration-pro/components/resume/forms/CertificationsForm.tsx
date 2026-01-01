// Certifications Form
'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Plus, Trash2 } from 'lucide-react'

export default function CertificationsForm() {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResumeStore()

  const handleAdd = () => {
    addCertification({
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
    })
  }

  const handleUpdate = (id: string, field: string, value: any) => {
    updateCertification(id, { [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2">Certifications</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.certifications.map((cert) => (
          <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Certification Name *</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Issuer *</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleUpdate(cert.id, 'issuer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Issue Date *</label>
                <input
                  type="month"
                  value={cert.issueDate}
                  onChange={(e) => handleUpdate(cert.id, 'issueDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="month"
                  value={cert.expiryDate || ''}
                  onChange={(e) => handleUpdate(cert.id, 'expiryDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Credential ID</label>
                <input
                  type="text"
                  value={cert.credentialId || ''}
                  onChange={(e) => handleUpdate(cert.id, 'credentialId', e.target.value)}
                  placeholder="Optional"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={() => removeCertification(cert.id)}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove Certification
            </button>
          </div>
        ))}

        {resumeData.certifications.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">No certifications added yet</p>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Certification
            </button>
          </div>
        )}
      </div>
    </div>
  )
}



