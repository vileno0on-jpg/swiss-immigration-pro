'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Circle, Download, FileText } from 'lucide-react'
import Link from 'next/link'
import { LAYER_CONTENT } from '@/lib/layerContent'
import type { LayerType } from '@/lib/layerLogic'

export default function RequirementsPage() {
  const params = useParams()
  const layerParam = params?.layer as string
  const layer = (['europeans', 'americans', 'others'].includes(layerParam) 
    ? layerParam 
    : 'others') as LayerType
  
  const content = LAYER_CONTENT[layer]
  
  // Dynamic requirements based on layer
  const getRequirements = () => {
    const base = [
      { id: 'passport', label: 'Valid passport (minimum 6 months validity)', required: true },
      { id: 'health', label: 'Health insurance coverage', required: true },
      { id: 'contract', label: 'Employment contract or job offer', required: true },
    ]
    
    if (layer === 'europeans') {
      return [
        ...base,
        { id: 'eu-id', label: 'EU/EFTA identity card or passport', required: true },
        { id: 'registration', label: 'Commune registration form', required: true },
        { id: 'accommodation', label: 'Proof of accommodation', required: true },
        { id: 'financial', label: 'Proof of financial means (if self-employed)', required: false },
      ]
    }
    
    if (layer === 'americans') {
      return [
        ...base,
        { id: 'education', label: 'Educational certificates (apostilled)', required: true },
        { id: 'cv', label: 'Swiss-style CV/resume', required: true },
        { id: 'references', label: 'Professional reference letters', required: true },
        { id: 'criminal', label: 'Criminal background check (if required)', required: false },
        { id: 'salary', label: 'Salary justification (meeting thresholds)', required: true },
      ]
    }
    
    // Others
    return [
      ...base,
      { id: 'education', label: 'Educational certificates (apostilled and translated)', required: true },
      { id: 'cv', label: 'Swiss-style CV/resume', required: true },
      { id: 'references', label: 'Professional reference letters', required: true },
      { id: 'criminal', label: 'Criminal background check', required: true },
      { id: 'salary', label: 'Salary justification (CHF 100k+ recommended)', required: true },
      { id: 'language', label: 'Language certificates (German/French B1+)', required: false },
      { id: 'quota', label: 'Quota availability confirmation', required: true },
    ]
  }
  
  const requirements = getRequirements()
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  
  const handleToggle = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  }
  
  const completedCount = Object.values(checked).filter(Boolean).length
  const progress = (completedCount / requirements.length) * 100

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/${layer}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {layer.charAt(0).toUpperCase() + layer.slice(1)} Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Requirements Checklist
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Track your progress preparing for your Swiss immigration application
          </p>
          
          {/* Progress Bar */}
          <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-4 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-blue-600 h-4 rounded-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{completedCount} of {requirements.length} completed</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-4 mb-8">
          {requirements.map((req, idx) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="card p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleToggle(req.id)}
            >
              <div className="flex-shrink-0 mt-1">
                {checked[req.id] ? (
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <label className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer">
                    {req.label}
                  </label>
                  {req.required && (
                    <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                      Required
                    </span>
                  )}
                </div>
                {layer === 'americans' && req.id === 'education' && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    💡 US documents need apostille from the Secretary of State. Allow 4-6 weeks for processing.
                  </p>
                )}
                {layer === 'others' && req.id === 'education' && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    💡 Documents must be apostilled in your home country, then translated if needed. Check embassy requirements.
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Export */}
        <div className="card p-6 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Export Your Checklist
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Save your progress and share with your immigration lawyer
              </p>
            </div>
            <button className="btn-primary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 card p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Next Steps
          </h3>
          <ol className="space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-300">
            <li>Complete all required documents</li>
            <li>Review the <Link href={`/${layer}/process`} className="text-blue-600 dark:text-blue-400 hover:underline">application process</Link></li>
            <li>Take the <Link href={`/${layer}/quiz`} className="text-blue-600 dark:text-blue-400 hover:underline">follow-up quiz</Link> for personalized recommendations</li>
            <li>Consult with a Swiss immigration lawyer for your specific case</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

