// Swiss Classic Template - Conservative two-column layout with photo on top right
'use client'

import type { ResumeData } from '@/types/resume'
import { Calendar, MapPin, Phone, Mail, Globe, Briefcase, GraduationCap, Award, Languages, FileText } from 'lucide-react'

interface SwissClassicProps {
  data: ResumeData
}

export default function SwissClassic({ data }: SwissClassicProps) {
  const { personalInfo, professionalSummary, workExperience, education, skills, languages, certifications, references } = data

  return (
    <div className="bg-white text-black" style={{ width: '210mm', minHeight: '297mm', padding: '15mm', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11pt', lineHeight: '1.4' }}>
      {/* Header Section with Photo */}
      <div className="flex justify-between items-start mb-6 border-b-2 border-gray-800 pb-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.5px' }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-lg text-gray-700 mb-3">{personalInfo.title}</p>
          )}
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.address}, {personalInfo.postalCode} {personalInfo.city}</span>
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
                <span>{personalInfo.linkedinUrl}</span>
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
              className="w-32 h-32 object-cover rounded"
              style={{ border: '2px solid #000' }}
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center border-2 border-gray-400">
              <span className="text-xs text-gray-500 text-center px-2">Photo</span>
            </div>
          )}
        </div>
      </div>

      {/* Personal Information (Swiss Specific) */}
      <div className="mb-6 pb-4 border-b border-gray-300">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Date of Birth:</strong> {personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth).toLocaleDateString('en-GB') : ''}
          </div>
          <div>
            <strong>Nationality:</strong> {personalInfo.nationality || ''}
          </div>
          {personalInfo.maritalStatus && (
            <div>
              <strong>Marital Status:</strong> {personalInfo.maritalStatus}
            </div>
          )}
          <div>
            <strong>Permit Type:</strong> {personalInfo.permitType}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {professionalSummary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase border-b border-gray-800 pb-1">Professional Summary</h2>
          <p className="text-sm">{professionalSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase border-b border-gray-800 pb-1 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                    <p className="text-sm text-gray-700">{exp.company} • {exp.location}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate || ''}
                  </div>
                </div>
                {exp.description.length > 0 && (
                  <ul className="list-disc list-inside text-sm ml-4 space-y-1">
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
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase border-b border-gray-800 pb-1 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base">{edu.degree}</h3>
                  <p className="text-sm text-gray-700">{edu.institution} • {edu.location}</p>
                  {edu.gpa && (
                    <p className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</p>
                  )}
                  {edu.honors && edu.honors.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">Honors: {edu.honors.join(', ')}</p>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Layout for Skills, Languages, Certifications */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 uppercase border-b border-gray-800 pb-1">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  <strong>{skill.name}</strong>
                  {skill.proficiency && <span className="text-gray-600 ml-2">({skill.proficiency})</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 uppercase border-b border-gray-800 pb-1 flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Languages
            </h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="text-sm">
                  <strong>{lang.name}:</strong> <span className="text-gray-700">{lang.proficiency}</span>
                  {lang.certificate && (
                    <span className="text-xs text-gray-600 block ml-4">({lang.certificate})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase border-b border-gray-800 pb-1 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm">
                <strong>{cert.name}</strong> - {cert.issuer}
                <span className="text-gray-600 ml-2">({cert.issueDate})</span>
                {cert.credentialId && (
                  <span className="text-xs text-gray-500 block">ID: {cert.credentialId}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase border-b border-gray-800 pb-1 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            References
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {references.map((ref) => (
              <div key={ref.id}>
                <strong>{ref.name}</strong>
                <p className="text-gray-700">{ref.title} at {ref.company}</p>
                {ref.email && <p className="text-xs text-gray-600">{ref.email}</p>}
                {ref.phone && <p className="text-xs text-gray-600">{ref.phone}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      {data.additionalInfo && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase border-b border-gray-800 pb-1">Additional Information</h2>
          <p className="text-sm whitespace-pre-line">{data.additionalInfo}</p>
        </div>
      )}
    </div>
  )
}



