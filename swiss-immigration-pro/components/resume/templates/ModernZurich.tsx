// Modern Zurich Template - Cleaner, header-focused layout
'use client'

import type { ResumeData } from '@/types/resume'
import { Calendar, MapPin, Phone, Mail, Globe, Briefcase, GraduationCap, Award, Languages, FileText } from 'lucide-react'

interface ModernZurichProps {
  data: ResumeData
}

export default function ModernZurich({ data }: ModernZurichProps) {
  const { personalInfo, professionalSummary, workExperience, education, skills, languages, certifications, references } = data

  return (
    <div className="bg-white text-black" style={{ width: '210mm', minHeight: '297mm', padding: '12mm', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10pt', lineHeight: '1.5' }}>
      {/* Header with Blue Accent */}
      <div className="bg-blue-900 text-white p-6 mb-6 rounded-t-lg">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '1px' }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.title && (
              <p className="text-xl text-blue-100 mb-4">{personalInfo.title}</p>
            )}
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.city}, {personalInfo.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email}</span>
              </div>
              {personalInfo.linkedinUrl && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs">{personalInfo.linkedinUrl}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Photo Placeholder */}
          <div className="ml-6">
            {personalInfo.photoUrl ? (
              <img
                src={personalInfo.photoUrl}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="w-28 h-28 object-cover rounded-full"
                style={{ border: '3px solid white' }}
              />
            ) : (
              <div className="w-28 h-28 bg-blue-700 rounded-full flex items-center justify-center border-3 border-white">
                <span className="text-xs text-white text-center px-2">Photo</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Personal Information (Swiss Specific) - Compact */}
      <div className="mb-6 pb-3 border-b-2 border-blue-900">
        <div className="flex flex-wrap gap-4 text-xs">
          <span><strong>DOB:</strong> {personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth).toLocaleDateString('en-GB') : ''}</span>
          <span><strong>Nationality:</strong> {personalInfo.nationality || ''}</span>
          {personalInfo.maritalStatus && <span><strong>Status:</strong> {personalInfo.maritalStatus}</span>}
          <span><strong>Permit:</strong> {personalInfo.permitType}</span>
        </div>
      </div>

      {/* Professional Summary */}
      {professionalSummary && (
        <div className="mb-6 pb-4 border-b border-gray-300">
          <h2 className="text-base font-bold mb-2 text-blue-900 uppercase tracking-wide">Summary</h2>
          <p className="text-sm leading-relaxed">{professionalSummary}</p>
        </div>
      )}

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Experience & Education */}
        <div className="col-span-2 space-y-6">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3 text-blue-900 uppercase tracking-wide border-b-2 border-blue-900 pb-1 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Experience
              </h2>
              <div className="space-y-4">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-blue-200 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-sm">{exp.jobTitle}</h3>
                        <p className="text-xs text-gray-700">{exp.company} • {exp.location}</p>
                      </div>
                      <div className="text-xs text-gray-600 whitespace-nowrap">
                        {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate || ''}
                      </div>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="list-disc list-inside text-xs ml-2 space-y-1 mt-2">
                        {exp.description.map((desc, idx) => (
                          <li key={idx}>{desc}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3 text-blue-900 uppercase tracking-wide border-b-2 border-blue-900 pb-1 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-blue-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm">{edu.degree}</h3>
                        <p className="text-xs text-gray-700">{edu.institution} • {edu.location}</p>
                        {edu.gpa && (
                          <p className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 whitespace-nowrap">
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Skills, Languages, Certifications */}
        <div className="col-span-1 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3 text-blue-900 uppercase tracking-wide border-b-2 border-blue-900 pb-1">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-xs">
                    <strong>{skill.name}</strong>
                    {skill.proficiency && <span className="text-gray-600 ml-1">({skill.proficiency})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3 text-blue-900 uppercase tracking-wide border-b-2 border-blue-900 pb-1 flex items-center gap-2">
                <Languages className="w-4 h-4" />
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="text-xs">
                    <strong>{lang.name}:</strong>
                    <div className="text-gray-700 ml-2">{lang.proficiency}</div>
                    {lang.certificate && (
                      <div className="text-xs text-gray-600 ml-2">({lang.certificate})</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3 text-blue-900 uppercase tracking-wide border-b-2 border-blue-900 pb-1 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <strong>{cert.name}</strong>
                    <div className="text-gray-700">{cert.issuer}</div>
                    <div className="text-gray-600">{cert.issueDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* References - Full Width */}
      {references && references.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-300">
          <h2 className="text-base font-bold mb-3 text-blue-900 uppercase tracking-wide border-b-2 border-blue-900 pb-1 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            References
          </h2>
          <div className="grid grid-cols-3 gap-4 text-xs">
            {references.map((ref) => (
              <div key={ref.id}>
                <strong>{ref.name}</strong>
                <p className="text-gray-700">{ref.title}</p>
                <p className="text-gray-600">{ref.company}</p>
                {ref.email && <p className="text-gray-500">{ref.email}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}



