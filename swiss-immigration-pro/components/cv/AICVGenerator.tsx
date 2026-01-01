'use client'

import { useState } from 'react'
import { useCVCanvasStore } from '@/store/cvCanvasStore'
import { Sparkles, Loader2, Wand2, X } from 'lucide-react'
import { IText, Rect } from 'fabric'
import { getTemplateJSON } from '@/lib/cv/templates'

// Mock AI service to generate CV from prompt
async function generateCVFromPrompt(prompt: string): Promise<{
  template: string
  personalInfo: any
  experience: any[]
  education: any[]
  skills: string[]
}> {
  // Simulate AI processing
  return new Promise((resolve) => {
    setTimeout(() => {
      // Parse prompt to extract information
      const lowerPrompt = prompt.toLowerCase()
      
      // Determine template based on keywords
      let template = 'modern'
      if (lowerPrompt.includes('creative') || lowerPrompt.includes('design')) {
        template = 'creative'
      } else if (lowerPrompt.includes('executive') || lowerPrompt.includes('ceo')) {
        template = 'executive'
      } else if (lowerPrompt.includes('tech') || lowerPrompt.includes('developer')) {
        template = 'tech'
      } else if (lowerPrompt.includes('minimal') || lowerPrompt.includes('clean')) {
        template = 'minimalist'
      }
      
      // Extract name (simple extraction)
      const nameMatch = prompt.match(/(?:name|i am|my name is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i)
      const firstName = nameMatch ? nameMatch[1].split(' ')[0] : 'John'
      const lastName = nameMatch && nameMatch[1].split(' ').length > 1 ? nameMatch[1].split(' ')[1] : 'Doe'
      
      // Extract job title
      const titleMatch = prompt.match(/(?:position|role|job|title|as a|i am a)\s+([a-z\s]+?)(?:\.|,|with|and|$)/i)
      const jobTitle = titleMatch ? titleMatch[1].trim() : 'Professional'
      
      // Extract years of experience
      const expMatch = prompt.match(/(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s*)?(?:experience|exp)/i)
      const yearsExp = expMatch ? expMatch[1] : '5'
      
      // Generate experience
      const experience = [
        {
          title: `Senior ${jobTitle}`,
          company: 'Leading Company Inc.',
          period: `${2024 - parseInt(yearsExp)} - Present`,
          description: `• Led key initiatives and delivered exceptional results\n• Collaborated with cross-functional teams\n• Achieved significant business impact`,
        },
        {
          title: jobTitle,
          company: 'Previous Company Ltd.',
          period: `${2024 - parseInt(yearsExp) - 3} - ${2024 - parseInt(yearsExp)}`,
          description: `• Developed and implemented strategic solutions\n• Managed projects and teams effectively\n• Exceeded performance targets`,
        },
      ]
      
      // Generate education
      const education = [
        {
          degree: `Bachelor's Degree in ${jobTitle.includes('Engineer') ? 'Computer Science' : jobTitle.includes('Design') ? 'Design' : 'Business'}`,
          institution: 'University Name',
          period: '2015 - 2019',
        },
      ]
      
      // Extract skills or generate based on job title
      let skills = ['Leadership', 'Communication', 'Problem Solving']
      if (lowerPrompt.includes('tech') || lowerPrompt.includes('developer')) {
        skills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL']
      } else if (lowerPrompt.includes('design')) {
        skills = ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping']
      } else if (lowerPrompt.includes('marketing')) {
        skills = ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics']
      }
      
      resolve({
        template,
        personalInfo: {
          firstName,
          lastName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
          phone: '+1 234 567 8900',
          location: 'City, Country',
          jobTitle,
        },
        experience,
        education,
        skills,
      })
    }, 2000) // 2 second delay to simulate AI processing
  })
}

export default function AICVGenerator() {
  const { canvas, loadTemplate } = useCVCanvasStore()
  const [isOpen, setIsOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim() || !canvas) {
      setError('Please enter a prompt and ensure canvas is loaded')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Generate CV data from prompt
      const cvData = await generateCVFromPrompt(prompt)

      // Load template
      const templateJson = getTemplateJSON(cvData.template)
      canvas.loadFromJSON(templateJson, () => {
        // Get all text objects and update them
        const objects = canvas.getObjects()
        
        // Update name
        const nameObjects = objects.filter((obj: any) => 
          obj.type === 'i-text' && 
          (obj.text?.includes('JOHN') || obj.text?.includes('DOE') || obj.text?.includes('JANE') || obj.text?.includes('SMITH'))
        )
        
        if (nameObjects.length > 0) {
          const firstNameObj = nameObjects[0] as IText
          const lastNameObj = nameObjects[1] as IText
          if (firstNameObj) firstNameObj.set('text', cvData.personalInfo.firstName.toUpperCase())
          if (lastNameObj) lastNameObj.set('text', cvData.personalInfo.lastName.toUpperCase())
        }

        // Update job title
        const titleObjects = objects.filter((obj: any) => 
          obj.type === 'i-text' && 
          (obj.text?.includes('Engineer') || obj.text?.includes('Designer') || obj.text?.includes('Manager'))
        )
        if (titleObjects.length > 0) {
          (titleObjects[0] as IText).set('text', cvData.personalInfo.jobTitle)
        }

        // Update contact info
        const contactObjects = objects.filter((obj: any) => 
          obj.type === 'i-text' && 
          (obj.text?.includes('@') || obj.text?.includes('+1'))
        )
        if (contactObjects.length > 0) {
          (contactObjects[0] as IText).set('text', 
            `${cvData.personalInfo.email} | ${cvData.personalInfo.phone}`
          )
        }

        // Add experience sections
        let currentY = 300
        cvData.experience.forEach((exp, idx) => {
          // Title
          const titleText = new IText(exp.title, {
            left: 50,
            top: currentY,
            fontSize: 14,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fill: '#333333',
          })
          canvas.add(titleText)

          // Company and period
          const companyText = new IText(`${exp.company} | ${exp.period}`, {
            left: 50,
            top: currentY + 25,
            fontSize: 11,
            fontFamily: 'Arial',
            fill: '#666666',
          })
          canvas.add(companyText)

          // Description
          const descText = new IText(exp.description, {
            left: 70,
            top: currentY + 50,
            fontSize: 10,
            fontFamily: 'Arial',
            fill: '#333333',
            width: 475,
            lineHeight: 1.5,
          })
          canvas.add(descText)

          currentY += 120
        })

        // Add skills
        const skillsText = new IText(
          `SKILLS\n${cvData.skills.join(' • ')}`,
          {
            left: 50,
            top: currentY + 40,
            fontSize: 12,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fill: '#333333',
            lineHeight: 1.8,
          }
        )
        canvas.add(skillsText)

        canvas.renderAll()
        
        // Save to history
        setTimeout(() => {
          const { saveHistory } = useCVCanvasStore.getState()
          saveHistory()
        }, 100)
        
        setIsOpen(false)
        setPrompt('')
      })
    } catch (err: any) {
      console.error('Error generating CV:', err)
      setError(err.message || 'Failed to generate CV. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl shadow-xl px-6 py-4 flex items-center space-x-3 z-50 transition-all"
      >
        <Sparkles className="w-6 h-6" />
        <div className="text-left">
          <div className="font-semibold text-sm">AI CV Generator</div>
          <div className="text-xs opacity-90">Generate entire CV from prompt</div>
        </div>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI CV Generator</h2>
              <p className="text-sm text-gray-500">Describe your CV and we'll create it for you</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsOpen(false)
              setPrompt('')
              setError(null)
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe Your CV
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: I am John Doe, a software engineer with 5 years of experience in React and Node.js. I worked at Tech Company as a Senior Developer..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={6}
            />
            <p className="text-xs text-gray-500 mt-2">
              Include: Your name, job title, years of experience, skills, and any other relevant information
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Examples */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Example Prompts:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• "I'm Sarah Chen, a UX designer with 7 years of experience..."</li>
              <li>• "Create a CV for a marketing director with 10 years experience..."</li>
              <li>• "I am a software engineer specializing in full-stack development..."</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
          <button
            onClick={() => {
              setIsOpen(false)
              setPrompt('')
              setError(null)
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate CV</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

