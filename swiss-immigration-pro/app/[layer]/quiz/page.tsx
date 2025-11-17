'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, FileText, Download } from 'lucide-react'
import Link from 'next/link'
import { LAYER_CONTENT } from '@/lib/layerContent'
import type { LayerType } from '@/lib/layerLogic'

export default function LayerQuizPage() {
  const params = useParams()
  const layerParam = params?.layer as string
  const layer = (['europeans', 'americans', 'others'].includes(layerParam) 
    ? layerParam 
    : 'others') as LayerType
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [completed, setCompleted] = useState(false)

  // Layer-specific follow-up questions
  const getQuestions = () => {
    if (layer === 'europeans') {
      return [
        {
          id: 'eu-blue-card',
          question: 'Are you an EU Blue Card holder?',
          type: 'boolean',
          options: ['Yes', 'No'],
        },
        {
          id: 'border-resident',
          question: 'Do you live near the Swiss border (within commuting distance)?',
          type: 'boolean',
          options: ['Yes', 'No'],
        },
        {
          id: 'self-employed',
          question: 'Are you planning to be self-employed or work for an employer?',
          type: 'select',
          options: ['Self-employed', 'Employed', 'Both'],
        },
        {
          id: 'family-members',
          question: 'Do you have family members who will join you?',
          type: 'boolean',
          options: ['Yes', 'No'],
        },
      ]
    }
    
    if (layer === 'americans') {
      return [
        {
          id: 'current-visa',
          question: 'What is your current US work visa status?',
          type: 'select',
          options: ['H-1B', 'L-1', 'E-2', 'Green Card', 'Citizen', 'Other/None'],
        },
        {
          id: 'salary-range',
          question: 'What is your expected salary range in Switzerland?',
          type: 'select',
          options: ['Under CHF 80k', 'CHF 80k-100k', 'CHF 100k-120k', 'CHF 120k+'],
        },
        {
          id: 'industry',
          question: 'What industry are you in?',
          type: 'select',
          options: ['Technology', 'Finance', 'Healthcare', 'Consulting', 'Other'],
        },
        {
          id: 'timeline',
          question: 'When do you plan to move?',
          type: 'select',
          options: ['Within 3 months', '3-6 months', '6-12 months', '1+ years'],
        },
      ]
    }
    
    // Others
    return [
      {
        id: 'country-specific',
        question: 'Which region are you from?',
        type: 'select',
        options: ['Asia', 'Africa', 'Latin America', 'Middle East', 'Other'],
      },
      {
        id: 'education-level',
        question: 'What is your highest education level?',
        type: 'select',
        options: ['Bachelor\'s', 'Master\'s', 'PhD', 'Professional Certification', 'Other'],
      },
      {
        id: 'salary-range',
        question: 'What is your expected salary range in Switzerland?',
        type: 'select',
        options: ['Under CHF 80k', 'CHF 80k-100k', 'CHF 100k-120k', 'CHF 120k+'],
      },
      {
        id: 'quota-strategy',
        question: 'What is your quota strategy?',
        type: 'select',
        options: ['Apply early (Jan-Mar)', 'Target specific canton', 'Education pathway', 'Family reunification'],
      },
    ]
  }

  const questions = getQuestions()
  const currentQ = questions[currentQuestion]

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
      // Save results
      localStorage.setItem(`layerQuiz_${layer}`, JSON.stringify(answers))
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (completed) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Completed!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your personalized recommendations have been generated based on your answers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  // Generate PDF (placeholder)
                  alert('PDF generation coming soon! Your results are saved.')
                }}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Summary</span>
              </button>
              <Link href={`/${layer}`} className="btn-secondary">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href={`/${layer}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {layer.charAt(0).toUpperCase() + layer.slice(1)} Home
        </Link>

        <div className="card p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                className="bg-blue-600 h-2 rounded-full"
              />
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    answers[currentQ.id] === option
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  <span className="text-gray-900 dark:text-white font-medium">{option}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion < questions.length - 1 ? 'Next →' : 'Complete →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

